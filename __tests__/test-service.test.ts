import { getTodoById, createNewTodo, deleteTodoById, updateExistingTodo, getAllTodos } from '../src/services/todoService';
import { Todo } from '../src/models/Todo';
import { connectDb, disconnect } from '../src/config/database';
import mongoose from 'mongoose';

let newTodoId: any = null;

describe('Todo application tests', () => {
  beforeAll(async () => {
    connectDb();
  });

  afterAll(async () => {
    console.log('Disconnecting -----')
    disconnect();
  });

  it('should create a new todo with the provided data', async () => {
    // Arrange
    const url = 'http://localhost:3000/todos/';
    const data = { title: 'Test Todo', order: 25, completed: false };

    // Act
    const savedTodo = await createNewTodo(url, data);
    newTodoId = savedTodo._id;
    // Assert
    expect(savedTodo).toBeInstanceOf(Todo);
    expect(savedTodo._id).toBeDefined();
    expect(savedTodo.url).toBe(url + savedTodo._id);
    expect(savedTodo.title).toBe(data.title);
    expect(savedTodo.order).toBe(data.order);
    expect(savedTodo.completed).toBe(data.completed);
  });

  it('should retrieve all todos', async () => {
    const todos = await getAllTodos();
    expect(todos).toBeInstanceOf(Array);
  })

  it('should return a promise that resolves to the todo object', async () => {
    const result = await getTodoById(newTodoId);
    expect(result).toEqual(expect.any(Object));
  });

  it('should return null if no todo found', async () => {
    const todoId = (new mongoose.Types.ObjectId()).toString();
    const result = await getTodoById(todoId);
    expect(result).toBeNull();
  });

  it('should update an existing todo item in the database', async () => {
    const order = 3000;
    const data = { order: order, completed: true };

    const result = await updateExistingTodo(newTodoId, data);
    expect(result?.order).toBe(data.order);
    expect(result?.completed).toBe(data.completed);
  });

  it('should delete an existing todo item in the database', async () => {
    const result = await deleteTodoById(newTodoId);
    expect(result?._id).toStrictEqual(newTodoId);
  })
});