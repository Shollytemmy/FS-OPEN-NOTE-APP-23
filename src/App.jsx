import { useState, useEffect } from 'react'
import Note from './Components/Note'
import noteServices from './services/notes'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'




function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {

    console.log("useEffect")

    noteServices.getAll()
    .then((response) => {
      setNotes(response.data)
    })

  }, [])

  



  const noteToShow = showAll
  ? notes : notes.filter((note) => note.important === true)

  

  const addNote = (e) => {
    e.preventDefault()


    if(!newNote) return 

    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    noteServices.create(noteObj)
    .then((response) => {
      console.log(response)
      setNotes(notes.concat(response.data))
    })

    setNewNote("")
  
  

  }

  const handleNoteChange = (e) => {
    console.log("input", e.target.value)
    setNewNote(e.target.value)
  }


  const toggleImportanceOf = (id) => {
    const url = `http://127.0.0.1:5174/notes/${id}`

   const note = notes.find((n) => n.id === id)
   const changeNote = {...note, important: !note.important}

   noteServices.update(id, changeNote)
   .then((response) => {

    let noteMapped = notes.map((n) => n.id === id ? response.data : n)

    setNotes(noteMapped)

   })

   .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
   

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
        noteToShow.map((note) => <Note note={note} key={note.id} toggleImportance={() => toggleImportanceOf(note.id)} />)
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
