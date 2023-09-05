// todoController.ts

import { Request, Response } from 'express';
import { validateTodo, todoCreateValidationSchema, todoUpdateValidationSchema } from '../validators/todoValidator';
import * as todoService from '../services/todoService';

/**
 * Retrieves todos and sends them as a JSON response.
 *
 * @param {Request} req - The Request object.
 * @param {Response} res - The Response object.
 * @return {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const getTodos = async (req: Request, res: Response) => {
  const todos = await todoService.getAllTodos();
  return res.json(todos);
}

/**
 * Retrieves a todo item by its ID from the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves with the retrieved todo item as a JSON response.
 */
export const getTodo = async (req: Request, res: Response) => {
  const todo = await todoService.getTodoById(req.params.id);
  res.json(todo);
}

/**
 * Creates a new todo item with the provided request body.
 *
 * @param {Request} req - The request object containing the todo data.
 * @param {Response} res - The response object to send the created todo.
 * @return {Promise<void>} - Returns a Promise that resolves to void once the todo is created.
 */
export const createTodo = async (req: Request, res: Response) => {
  let { error, value } = validateTodo(req.body, todoCreateValidationSchema);
  
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  const url = req.protocol + "://" + req.get('host') + '/'
  const todo = await todoService.createNewTodo(url, value);
  res.json(todo);
}

/**
 * Updates a todo item.
 *
 * @param {Request} req - the request object.
 * @param {Response} res - the response object.
 * @return {Promise<void>} - a promise that resolves to nothing.
 */
export const updateTodo = async (req: Request, res: Response) => {
  const { error, value } = validateTodo(req.body, todoUpdateValidationSchema);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const todo = await todoService.updateExistingTodo(req.params.id, value);
  res.json(todo);
}

/**
 * Deletes a todo by its ID.
 *
 * @param {Request} req - The request object containing the ID of the todo to be deleted.
 * @param {Response} res - The response object used to send the deleted todo as JSON.
 * @return {Promise<void>} A promise that resolves when the todo is deleted.
 */
export const deleteTodo = async (req: Request, res: Response) => {
  const todo = await todoService.deleteTodoById(req.params.id);
  res.json(todo);
}
