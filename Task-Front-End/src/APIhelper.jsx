
import axios from "axios"

const API_URL = "http://localhost:8000/tasks/"

async function createTask(task) {
  const { data: newTask } = await axios.post(API_URL, {
    task,
  })
  return newTask
}

async function deleteTask(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function updateTask(id, payload) {
  const { data: newTask } = await axios.put(`${API_URL}${id}`, payload)
  return newTask
}

async function getAllTasks() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

export default { createTask, deleteTask, updateTask, getAllTasks }