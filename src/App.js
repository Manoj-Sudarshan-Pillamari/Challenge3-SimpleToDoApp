import { useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { BsTrashFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

function App() {
  const [notes, setNotes] = useState([])
  const [newTask, setNewTask] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask !== "") {
      setNotes([...notes, { id: nanoid(), task: newTask }])
      setNewTask('')
    }
    else {
      alert("Task cannot be empty")
    }
  }

  const handleDeleteTask = (e, noteID) => {
    e.preventDefault()
    setNotes((prevData) => prevData.filter((task) => task.id !== noteID))
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", margin: "1%", textDecoration: "underline" }}>Simple To-Do Application</h1>
      <label htmlFor='taskDetail'>Enter New Task Here</label><br />
      <textarea className="new-task-data" name='taskDetail' placeholder='Add a new task' value={newTask} onChange={(e) => { setNewTask(e.target.value) }} /><br />
      <button onClick={(e) => handleAddTask(e)}>Add</button>
      <div style={{ width: "-webkit-fill-available", padding: "2% 0%" }}>
        <Table bordered responsive style={{ border: "black" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ width: "90", backgroundColor: "#c9c4b5" }}>Task</th>
              <th style={{ width: "10%", backgroundColor: "#c9c4b5" }}>Action</th>
            </tr>
          </thead>
          {notes.length === 0 ?
            <tbody>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  There are no Tasks
                </td>
              </tr>
            </tbody>
            :
            notes?.map((notesData) => {
              return (
                <tbody>
                  <tr>
                    <td style={{ width: "90%", overflowWrap: "anywhere" }}>{notesData.task}</td>
                    <td style={{ width: "10%", textAlign: "center" }}><BsTrashFill size={20} color='red' onClick={(e) => handleDeleteTask(e, notesData.id)} style={{ cursor: "pointer" }} /></td>
                  </tr>
                </tbody>)
            })
          }
        </Table>
      </div>
    </div>
  );
}

export default App;
