import styled from "styled-components"
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import APIHelper from "../APIhelper"
import { PencilIcon,TrashIcon } from '@heroicons/react/24/outline'


const AddTaskSticky = (props) => {

  useEffect(() => {
    const fetchTaskAndSetTasks = async () => {
      const tasks = await APIHelper.getAllTasks()
      setTasks(tasks)
    }
    fetchTaskAndSetTasks()
  }, [])

  let [isOpen, setIsOpen] = useState(false)
  let [editable, setEditable] = useState(false)
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")
  console.log(tasks);
  // if(props.windowWidth<500)
  return (
    <div>
      <StickyButton onClick={() => setIsOpen(true)} className='rounded-lg bg-slate-900 p-2 text-white hover:text-gray-400 focus:outline-none focus:ring-2focus:ring-offset-2 focus:ring-offset-gray-800'>
        Add Task</StickyButton>
      <MyDialog />
      <div className="flex justify-center items-center my-5 ">
        <ul className="bg-gray-800 p-5 text-white rounded-2xl text-lg w-96">
          {tasks.map(({ _id, task, completed }, i) => (
            <li
              key={i}
              className={completed ? "completed bg-slate-600" : "bg-slate-600 p-3 rounded-xl m-3 flex justify-center items-center gap-3" }
            >
              <span contenteditable={`${editable}`} className="px-2">{task}</span>
            <button className="text-white bg-slate-800 p-2 rounded-full hover:bg-slate-500" onClick={e => {
            updateTask(e, _id)
            if(editable)
            setEditable(false)
            else
            setEditable(true)
            }}><PencilIcon className="block h-6 w-6"/></button>
            <button className="text-white bg-slate-800 p-2 rounded-full hover:bg-red-500" onClick={e => deleteTask(e, _id)}><TrashIcon className="block h-6 w-6"/></button>

            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  function MyDialog() {

    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={"bg-slate-300 md:w-6/12 p-6 rounded-xl mx-auto my-14 "}>
        <Dialog.Panel className={""}>
          <div className="flex justify-center flex-wrap">
            <input type="text"
              className="my-3 block w-6/6 md:w-4/6 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              placeholder="Enter Task Title"
              value={task}
              onChange={({ target }) => setTask(target.value)} />
            <input type="text" className="my-3 block md:w-4/6 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" placeholder="Enter Task Description" />
          </div>
          <div className="flex justify-center">
            <button className="rounded-lg bg-slate-900 text-center text-white p-3 m-2" onClick={() => {
              setIsOpen(false)
              createTask()
            }}>Save</button>
            <button className="rounded-lg bg-slate-900 text-center text-white p-3 m-2" onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </Dialog.Panel>
      </Dialog>
    )
  }

}
const StickyButton = styled.button`
        position: fixed;
        bottom: 1.5rem;
        right: 2rem;
    `
const createTask = async e => {
  e.preventDefault()
  if (!task) {
    alert("please enter something")
    return
  }
  if (tasks.some(({ task }) => task === task)) {
    alert(`Task: ${task} already exists`)
    return
  }
  const newTask = await APIHelper.createTask(task)
  setTasks([...tasks, newTask])
}
const deleteTask = async (e, id) => {
  try {
    e.stopPropagation()
    await APIHelper.deleteTask(id)
    setTasks(tasks.filter(({ _id: i }) => id !== i))
  } catch (err) { }
}

const updateTask = async (e, id) => {
  e.stopPropagation()
  const payload = {
    completed: !tasks.find(task => task._id === id).completed,
  }
  const updatedTask = await APIHelper.updateTask(id, payload)
  setTasks(tasks.map(task => (task._id === id ? updatedTask : task)))
}

export default AddTaskSticky


