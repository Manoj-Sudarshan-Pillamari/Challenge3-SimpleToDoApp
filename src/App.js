import { useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';

function App() {
  const [notes, setNotes] = useState([])
  const [newTask, setNewTask] = useState('')

  const handleAddTask = () => {
    if (newTask !== "") {
      setNotes([...notes, { id: nanoid(), task: newTask }])
      setNewTask('')
    }
    else {
      alert("Task cannot be empty")
    }
  }

  const handleDeleteTask = (noteID) => {
    setNotes((prevData)=>prevData.filter((task)=>task.id !== noteID))
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", margin: "1%" }}>Simple To-Do Application</h1>
      <label htmlFor='taskDetail'>Enter New Task Here</label><br />
      <input type='text' name='taskDetail' placeholder='Add a new task' value={newTask} onChange={(e) => { setNewTask(e.target.value) }} /><br />
      <button onClick={handleAddTask}>Add</button>
      {notes.map((notesData) => {
        return (
          <ul key={notesData.id} style={{display:'flex', gap:"1%"}}>
            <li>{notesData.task}</li>
            <div onClick={()=>handleDeleteTask(notesData.id)}>🗑️</div>
          </ul>)
      })}
    </div>
  );
}

export default App;
