import React from 'react'
import { Trash2, Edit, AlertCircle, Clock } from 'lucide-react'

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
      .sort((a, b) => b.timestamp - a.timestamp),
    important: notes.filter(note => note.priority === 'important')
      .sort((a, b) => b.timestamp - a.timestamp),
    critical: notes.filter(note => note.priority === 'critical')
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  // Calculate time elapsed
  const getTimeElapsed = (timestamp) => {
    const now = new Date().getTime();
    const elapsed = now - timestamp;
    const minutes = Math.floor(elapsed / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  // Render function for notes in a column
  const renderNoteColumn = (priorityNotes, priorityKey) => {
    // Safely get colors, fallback to default if not found
    const colors = priorityColors[priorityKey.toLowerCase()] || priorityColors.default

    return (
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold text-center uppercase ${colors.header} p-2 rounded`}>
          {priorityKey}
        </h3>
        <div className={`space-y-4 ${colors.bg} p-2 rounded-lg min-h-[200px]`}>
          {priorityNotes.map((note) => {
            const isActionOpen = note.requiresAction && note.actionStatus === 'open';
            
            return (
              <div 
                key={note.id} 
                className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow relative ${
                  isActionOpen ? 'border-l-4 border-red-500 bg-red-50/30' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-shift-primary">
                        {note.title}
                      </h3>
                      {isActionOpen && (
                        <span 
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"
                        >
                          <AlertCircle size={12} className="animate-pulse" />
                          Action Required
                          <span className="flex items-center gap-1 ml-1">
                            <Clock size={12} />
                            {getTimeElapsed(note.timestamp)}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {note.shift} Shift
                      </span>
                      <span className="text-xs text-gray-500">
                        {note.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEditNote(note)}
                      className="text-shift-accent hover:text-shift-accent/80"
                      title="Edit note"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDeleteNote(note.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete note"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {truncateText(note.content || '', 150)}
                </p>
              </div>
            );
          })}
          {priorityNotes.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No {priorityKey.toLowerCase()} notes
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
