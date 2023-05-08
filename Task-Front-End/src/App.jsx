import React from 'react'
import NavBar from './components/NavBar'
import TaskInput from './components/TaskInput'
import AddTaskButton from './components/AddTaskButton'

const App = () => {
  const windowWidth = screen.width;
  return (
    <div>
      <NavBar />
      <TaskInput />
      <AddTaskButton width={windowWidth} />
    </div>
  )
}

export default App