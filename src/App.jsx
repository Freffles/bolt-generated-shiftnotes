import React, { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('shiftNotes') || '[]')
    setNotes(savedNotes)
  }, [])

  const addNote = (newNote) => {
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    localStorage.setItem('shiftNotes', JSON.stringify(updatedNotes))
  }

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId)
    setNotes(updatedNotes)
    localStorage.setItem('shiftNotes', JSON.stringify(updatedNotes))
  }

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    )
    setNotes(updatedNotes)
    localStorage.setItem('shiftNotes', JSON.stringify(updatedNotes))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-shift-primary mb-2">
          Shift Notes
        </h1>
        <p className="text-gray-600">
          Create and manage notes for shift handovers
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <NoteForm onAddNote={addNote} />
        </div>
        <div className="md:col-span-2">
          <NoteList 
            notes={notes} 
            onDeleteNote={deleteNote}
            onEditNote={editNote}
          />
        </div>
      </div>
    </div>
  )
}

export default App
