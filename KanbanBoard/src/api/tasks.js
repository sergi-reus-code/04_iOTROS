// src/api/tasks.js
// Este archivo maneja todas las operaciones relacionadas con las tareas del Kanban Board

// Datos de ejemplo (en una aplicación real, esto estaría en una base de datos)
let kanbanData = {
  columns: [
    {
      id: "todo",
      title: "Por Hacer",
      cards: [
        { id: "task-1", title: "Diseñar UI", description: "Crear wireframes para la interfaz de usuario", tag: "diseño" },
        { id: "task-2", title: "Crear componentes", description: "Desarrollar componentes reutilizables", tag: "desarrollo" },
      ]
    },
    {
      id: "in-progress",
      title: "En Progreso",
      cards: [
        { id: "task-3", title: "Implementar API", description: "Conectar frontend con backend", tag: "backend" },
      ]
    },
    {
      id: "done",
      title: "Completado",
      cards: [
        { id: "task-4", title: "Configurar proyecto", description: "Inicializar proyecto con Astro", tag: "setup" },
      ]
    }
  ]
};

// Función auxiliar para generar IDs únicos
const generateId = () => {
  return 'task-' + Math.random().toString(36).substr(2, 9);
};

// Obtener todas las tareas agrupadas por columnas
export async function get() {
  return new Response(
    JSON.stringify({
      success: true,
      data: kanbanData
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

// Crear una nueva tarea
export async function post({ request }) {
  try {
    const data = await request.json();
    
    // Validar datos requeridos
    if (!data.title || !data.columnId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Se requieren title y columnId"
        }),
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    // Crear la nueva tarea
    const newTask = {
      id: generateId(),
      title: data.title,
      description: data.description || "",
      tag: data.tag || ""
    };
    
    // Encontrar la columna y añadir la tarea
    const column = kanbanData.columns.find(col => col.id === data.columnId);
    
    if (!column) {
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
    
    column.cards.push(newTask);
    
    return new Response(
      JSON.stringify({
        success: true,
        data: newTask
      }),
      {
        status: 201,
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

// Exportar los datos para que sean accesibles desde otros archivos
export { kanbanData };
