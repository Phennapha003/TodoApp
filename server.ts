import express, { Express, Request, Response } from 'express'
import { Schema, Document } from 'mongoose';
const date = require(__dirname + '/date.js');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL);
interface ITodo extends Document {
    task: String,
    isDone: Boolean,
    date: Date
}
const todoSchema = new Schema({
    task: String,
    isDone: Boolean,
    date: { type: Date, default: Date.now }
})
const Todo = mongoose.model('Todo', todoSchema)

const app = express()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const toDay = date.getDateToday();
const todoHome = new Set()
const todoSchool = new Set()
app.get('/', (request: Request, response: Response) => {
    response.render('index', { today: toDay, tasks: todoHome, taskTitle: "Home" })
})
app.get('/school', (request: Request, response: Response) => {
    response.render('index', { today: toDay, tasks: todoSchool, taskTitle: "School" })
})

app.post('/', (request: Request, response: Response) => {
    let todoList = todoHome
    let path = "/"
    const newTask = request.body.newTask
    if (request.body.type === 'School') {
        todoList = todoSchool
        path = 'school'
    }
    if (newTask !== '') {
        todoList.add(newTask)
    }
    if (request.body.delete !== undefined) {
        todoList.delete(request.body.delete)
    }
    response.redirect(path)

})

app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is runing at https://localhost:${port}`)
})