import { useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Table } from 'react-bootstrap';

function App() {
  const [notes, setNotes] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editTask, setEditTask] = useState('')
  const [modalPop, setModalPop] = useState(false)
  const [selectedNote, setSelectedNote] = useState();

  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmedNewTask = newTask.trim();
    console.log("TRIM::",trimmedNewTask)
    if (trimmedNewTask !== "") {
      setNotes([...notes, { id: nanoid(), task: trimmedNewTask }])
      setEditTask(trimmedNewTask)
      setNewTask('')
    }
    else if(/^[ ]+$/.test(trimmedNewTask)){
      alert("Task cannot have only spaces")
    }
    else {
      alert("Task cannot be empty")
    }
  }

  console.log("NOTES::::", notes)

  const handleDeleteTask = (e, noteID) => {
    e.preventDefault();
    setNotes((prevData) => prevData.filter((data) => data.id !== noteID))
  }

  const handleEditTask = (e, noteID) => {
    e.preventDefault();
    const tempSelectedTask = notes.find((data) => data.id === noteID)
    setModalPop(true);
    console.log(editTask,"EDIT")
    setSelectedNote({ ...tempSelectedTask })
    setEditTask(tempSelectedTask.task.trim())
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (editTask.trim() !== "") {
      setNotes((prevData) => prevData.map((data) => data.id === selectedNote.id ? { ...selectedNote, task: editTask } : data))
      setModalPop(false);
      setSelectedNote(null);
      setEditTask('');
    }
    else {
      alert("Task cannot be empty")
    }
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", margin: "1%", textDecoration: "underline" }}>Simple To-Do Application</h1>
      <label htmlFor='taskDetail'>Enter New Task Here</label><br />
      <textarea className="new-task-data" name='taskDetail' placeholder='Add a new task' value={newTask.replace(/\s+/g, ' ')} onChange={(e) => { setNewTask(e.target.value); }} /><br />
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
                <tbody key={notesData.id}>
                  <tr>
                    <td style={{ width: "90%", overflowWrap: "anywhere" }}>{notesData.task}</td>
                    <td style={{ width: "10%" }}>
                      <div style={{ display: "flex", gap: "10%", justifyContent: "center" }}>
                        <BsPencilFill size={25} color='blue' onClick={(e) => handleEditTask(e, notesData.id)} style={{ cursor: "pointer" }} />
                        <BsTrashFill size={25} color='red' onClick={(e) => handleDeleteTask(e, notesData.id)} style={{ cursor: "pointer" }} />
                      </div>
                    </td>
                  </tr>
                </tbody>)
            })
          }
        </Table>
        <Modal show={modalPop}>
          <Modal.Header closeButton onClick={()=>{setModalPop(false)}}>
            <Modal.Title>Editing Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea style={{ width: "100%", height: "25%", resize: 'none' }} name='editingTaskDetail' value={editTask.replace(/\s+/g, ' ')} onChange={(e) => { setEditTask(e.target.value) }} /><br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={(e) => handleSaveEdit(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
