// src/api/tasks/[id].js
// Este archivo maneja las operaciones en tareas individuales: obtener, actualizar y eliminar

import { kanbanData } from '../tasks.js';

// Función auxiliar para encontrar una tarea y su columna
const findTask = (taskId) => {
  for (const column of kanbanData.columns) {
    const taskIndex = column.cards.findIndex(card => card.id === taskId);
    if (taskIndex !== -1) {
      return {
        task: column.cards[taskIndex],
        column,
        taskIndex,
        columnIndex: kanbanData.columns.indexOf(column)
      };
    }
  }
  return null;
};

// Obtener una tarea específica por su ID
export async function get({ params }) {
  const { id } = params;
  const result = findTask(id);
  
  if (!result) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Tarea no encontrada"
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
  
  return new Response(
    JSON.stringify({
      success: true,
      data: {
        ...result.task,
        columnId: result.column.id
      }
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

// Actualizar una tarea existente
export async function put({ request, params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const result = findTask(id);
    
    if (!result) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Tarea no encontrada"
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    // Actualizar los campos de la tarea
    if (data.title) result.task.title = data.title;
    if (data.description !== undefined) result.task.description = data.description;
    if (data.tag !== undefined) result.task.tag = data.tag;
    
    // Mover la tarea a otra columna si se especifica
    if (data.columnId && data.columnId !== result.column.id) {
      const targetColumn = kanbanData.columns.find(col => col.id === data.columnId);
      
      if (!targetColumn) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Columna de destino no encontrada"
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      // Eliminar la tarea de la columna actual
      result.column.cards.splice(result.taskIndex, 1);
      
      // Añadir la tarea a la nueva columna
      targetColumn.cards.push(result.task);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ...result.task,
          columnId: data.columnId || result.column.id
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

// Eliminar una tarea
export async function del({ params }) {
  const { id } = params;
  const result = findTask(id);
  
  if (!result) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Tarea no encontrada"
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
  
  // Eliminar la tarea de la columna
  result.column.cards.splice(result.taskIndex, 1);
  
  return new Response(
    JSON.stringify({
      success: true,
      message: "Tarea eliminada correctamente"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
