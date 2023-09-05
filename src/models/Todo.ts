import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    order: Number,
    url: String
})

export const Todo = mongoose.model('Todo', TodoSchema)
