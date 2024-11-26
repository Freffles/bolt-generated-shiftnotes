import React, { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import { Button } from './components/ui/button'

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('shiftNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shiftNotes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (newNote) => {
    setNotes(prev => [...prev, newNote]);
    setShowForm(false);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    setShowForm(false);
    setEditingNote(null);
  };

  if (showForm) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {editingNote ? 'Edit Note' : 'Add New Note'}
          </h1>
          <Button 
            onClick={() => {
              setShowForm(false);
              setEditingNote(null);
            }}
          >
            Back to Notes
          </Button>
        </div>
        <NoteForm 
          onAddNote={editingNote ? handleUpdateNote : handleAddNote}
          initialNote={editingNote}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shift Notes</h1>
        <Button onClick={() => setShowForm(true)}>
          Add New Note
        </Button>
      </div>
      <NoteList 
        notes={notes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
      />
    </div>
  );
}

export default App;
