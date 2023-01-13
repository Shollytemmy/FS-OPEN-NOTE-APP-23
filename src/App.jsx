import { useState } from 'react'
import Note from './Components/Note'
import reactLogo from './assets/react.svg'
import './App.css'




function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)



  const noteToShow = showAll
  ? notes : notes.filter((note) => note.important === true)

  

  const addNote = (e) => {
    e.preventDefault()

    setNotes([...notes, {id: notes.length + 1, content: newNote, date: new Date().toISOString(), important: Math.random() < 0.5}])

    setNewNote("")
  
  

  }

  const handleNoteChange = (e) => {
    console.log("input", e.target.value)
    setNewNote(e.target.value)
  }



  return (
    <div className="App">
      <h1>Fs-Open 2023</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important": "All"}

        </button>
      </div>
       <ul>
       {
        noteToShow.map((note) => <Note note={note} key={note.id} />)
       }
      </ul>

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
     

    </div>
  )
}

export default App
