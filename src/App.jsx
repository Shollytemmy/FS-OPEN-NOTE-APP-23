import { useState, useEffect } from 'react'
import Note from './Components/Note'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'




function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {

    console.log("useEffect")

    axios.get("http://127.0.0.1:5174/notes")

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

    axios.post('http://127.0.0.1:5174/notes', noteObj)
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
