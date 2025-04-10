// src/api/columns/[id].js
// Este archivo maneja las operaciones en columnas individuales: obtener, actualizar y eliminar

import { kanbanData } from '../tasks.js';

// Función auxiliar para encontrar una columna por su ID
const findColumn = (columnId) => {
  const columnIndex = kanbanData.columns.findIndex(col => col.id === columnId);
  if (columnIndex !== -1) {
    return {
      column: kanbanData.columns[columnIndex],
      columnIndex
    };
  }
  return null;
};

// Obtener una columna específica por su ID
export async function get({ params }) {
  const { id } = params;
  const result = findColumn(id);
  
  if (!result) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Columna no encontrada"
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
      data: result.column
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

// Actualizar una columna existente
export async function put({ request, params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const result = findColumn(id);
    
    if (!result) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Columna no encontrada"
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    // Actualizar el título de la columna
    if (data.title) result.column.title = data.title;
    
    return new Response(
      JSON.stringify({
        success: true,
        data: result.column
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

// Eliminar una columna
export async function del({ params }) {
  const { id } = params;
  const result = findColumn(id);
  
  if (!result) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Columna no encontrada"
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
  
  // Eliminar la columna
  kanbanData.columns.splice(result.columnIndex, 1);
  
  return new Response(
    JSON.stringify({
      success: true,
      message: "Columna eliminada correctamente"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
