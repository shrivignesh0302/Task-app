
const mongoose = require("mongoose") 

const taskSchema = new mongoose.Schema({
  task: {
    type: String, 
    unique: true, 
    required: true,
  },
  completed: {
    type: Boolean, 
    default: false, 
  },
})

const taskModel = mongoose.model("Task", taskSchema) 

module.exports = taskModel 