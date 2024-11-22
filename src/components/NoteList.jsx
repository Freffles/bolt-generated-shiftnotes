import React from 'react'
import { Trash2, Edit } from 'lucide-react'

function NoteList({ notes, onDeleteNote, onEditNote }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div 
          key={note.id} 
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-shift-primary">
              {note.title}
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {note.shift} Shift
            </span>
          </div>
          <p className="text-gray-600 mb-4">{note.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{note.createdAt}</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEditNote(note)}
                className="text-shift-accent hover:text-shift-accent/80"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={() => onDeleteNote(note.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NoteList
