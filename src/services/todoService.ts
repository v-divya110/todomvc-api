// todoService.ts

import mongoose from 'mongoose';
import { Todo } from '../models/Todo';

/**
 * Retrieves all todos from the database.
 * @returns {Promise<Todo[]>} A promise that resolves to an array of todos.
 */
export const getAllTodos = async () => {
  return Todo.find();
}

/**
 * Retrieve a todo by its ID.
 * 
 * @param id - The ID of the todo.
 * @returns A promise that resolves to the todo object.
 */
export const getTodoById = async (id: string) => {
  return Todo.findById(id);
}

/**
 * Create a new todo.
 * 
 * @param url - The base URL for the todo.
 * @param data - The data for the new todo.
 * @returns The saved todo.
 */
export const createNewTodo = async (url: string, data: any) => {
  const todoId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
  data._id = todoId;
  data.url = url + todoId;
  const todo = new Todo(data);
  console.log("Creating new todo with data: ", data);
  return todo.save();
}

/**
 * Updates an existing todo item in the database.
 * 
 * @param id - The ID of the todo item to update.
 * @param data - The updated data for the todo item.
 * 
 * @returns A Promise that resolves to the updated todo item.
 */
export const updateExistingTodo = async (id: string, data: any) => {
  console.log("Updating todo with data: ", data);

  return Todo.findByIdAndUpdate(id, data, {
    new: true,
  });
}

export const deleteTodoById = async (id: string) => {
  console.log("Deleting todo with id: ", id);

  return Todo.findByIdAndDelete(id);
}
