// src/api/columns.js
// Este archivo maneja las operaciones relacionadas con las columnas del Kanban Board

import { kanbanData } from './tasks.js';

// Función auxiliar para generar IDs únicos
const generateId = () => {
  return 'column-' + Math.random().toString(36).substr(2, 9);
};

// Obtener todas las columnas
export async function get() {
  return new Response(
    JSON.stringify({
      success: true,
      data: kanbanData.columns.map(column => ({
        id: column.id,
        title: column.title,
        cardsCount: column.cards.length
      }))
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

// Crear una nueva columna
export async function post({ request }) {
  try {
    const data = await request.json();
    
    // Validar datos requeridos
    if (!data.title) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Se requiere un título para la columna"
        }),
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    // Crear la nueva columna
    const newColumn = {
      id: data.id || generateId(),
      title: data.title,
      cards: []
    };
    
    // Añadir la columna a los datos
    kanbanData.columns.push(newColumn);
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: newColumn.id,
          title: newColumn.title,
          cardsCount: 0
        }
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
