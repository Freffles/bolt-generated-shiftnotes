import React, { useState } from 'react'
import { Button } from './ui/button'
import { v4 as uuidv4 } from 'uuid'

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [shift, setShift] = useState('Day')
  const [priority, setPriority] = useState('routine')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newNote = {
      id: uuidv4(),
      title,
      content,
      shift,
      priority,
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      timestamp: new Date().getTime()
    }

    onAddNote(newNote)
    setTitle('')
    setContent('')
    setShift('Day')
    setPriority('routine')
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shift Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter shift note title"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shift Notes
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter detailed shift notes"
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50 px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shift Type
          </label>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50 px-3 py-2"
          >
            <option value="Day">Day Shift</option>
            <option value="Night">Night Shift</option>
            <option value="Morning">Morning Shift</option>
            <option value="Evening">Evening Shift</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50 px-3 py-2"
          >
            <option value="routine">Routine</option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <Button type="submit" variant="default" className="w-full">
        Create Shift Note
      </Button>
    </form>
  )
}

export default NoteForm
