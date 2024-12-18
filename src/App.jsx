import React, { useState, useEffect } from 'react'
import { PlusIcon } from 'lucide-react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './components/ui/dialog'

/**
 * Main application component for Shift Notes.
 * Manages state for notes and dialog visibility.
 */
function App() {
  const [notes, setNotes] = useState([]) // State to store notes
  const [isDialogOpen, setIsDialogOpen] = useState(false) // State to control dialog visibility

  // Load notes from local storage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('shiftNotes') || '[]')
    setNotes(savedNotes)
  }, [])

  /**
   * Adds a new note to the list and updates local storage.
   * @param {Object} newNote - The new note to add.
   */
  const addNote = (newNote) => {
    const updatedNotes = [newNote, ...notes]
    setNotes(updatedNotes)
    localStorage.setItem('shiftNotes', JSON.stringify(updatedNotes))
    setIsDialogOpen(false) // Close the dialog after adding a note
  }

  /**
   * Deletes a note by its ID and updates local storage.
   * @param {string} noteId - The ID of the note to delete.
   */
  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId)
    setNotes(updatedNotes)
    localStorage.setItem('shiftNotes', JSON.stringify(updatedNotes))
  }

  /**
   * Edits an existing note and updates local storage.
   * @param {Object} updatedNote - The updated note object.
   */
  const editNote = (updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id 
        ? {...updatedNote, createdAt: note.createdAt, timestamp: note.timestamp} 
        : note
    )
    setNotes(updatedNotes)
    localStorage.setItem('shiftNotes', JSON.stringify(updatedNotes))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-shift-primary mb-2">
          Shift Notes
        </h1>
        <p className="text-gray-600">
          Create and manage notes for shift handovers
        </p>
      </header>

      {/* Floating New Note Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button 
            className="fixed top-4 right-4 z-50 bg-shift-primary text-white p-3 rounded-full shadow-lg hover:bg-shift-primary/90 transition-colors"
            aria-label="New Note"
          >
            <PlusIcon size={24} />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Shift Note</DialogTitle>
          </DialogHeader>
          <NoteForm onAddNote={addNote} />
        </DialogContent>
      </Dialog>

      <div>
        <NoteList 
          notes={notes} 
          onDeleteNote={deleteNote}
          onEditNote={editNote}
        />
      </div>
    </div>
  )
}

export default App
