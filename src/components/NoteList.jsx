import React from 'react'
import { Trash2, Edit } from 'lucide-react'

function NoteList({ notes, onDeleteNote, onEditNote }) {
  // Priority color mapping with default fallback
  const priorityColors = {
    routine: {
      header: 'bg-green-100 text-green-800',
      bg: 'bg-green-50'
    },
    important: {
      header: 'bg-yellow-100 text-yellow-800',
      bg: 'bg-yellow-50'
    },
    critical: {
      header: 'bg-red-100 text-red-800',
      bg: 'bg-red-50'
    },
    default: {
      header: 'bg-gray-100 text-gray-800',
      bg: 'bg-gray-50'
    }
  }

  // Group notes by priority
  const groupedNotes = {
    routine: notes.filter(note => note.priority === 'routine')
      .sort((a, b) => a.timestamp - b.timestamp),
    important: notes.filter(note => note.priority === 'important')
      .sort((a, b) => a.timestamp - b.timestamp),
    critical: notes.filter(note => note.priority === 'critical')
      .sort((a, b) => a.timestamp - b.timestamp)
  }

  // Render function for notes in a column
  const renderNoteColumn = (priorityNotes, priorityKey) => {
    // Safely get colors, fallback to default if not found
    const colors = priorityColors[priorityKey.toLowerCase()] || priorityColors.default

    return (
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold text-center uppercase ${colors.header} p-2 rounded`}>
          {priorityKey}
        </h3>
        <div className={`space-y-4 ${colors.bg} p-2 rounded-lg`}>
          {priorityNotes.map((note) => (
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
                <div className="flex flex-col">
                  <span className="text-xs">{note.createdAt}</span>
                </div>
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
          {priorityNotes.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No {priorityKey.toLowerCase()} items
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        {renderNoteColumn(groupedNotes.routine, 'Routine')}
      </div>
      <div>
        {renderNoteColumn(groupedNotes.important, 'Important')}
      </div>
      <div>
        {renderNoteColumn(groupedNotes.critical, 'Critical')}
      </div>
    </div>
  )
}

export default NoteList
