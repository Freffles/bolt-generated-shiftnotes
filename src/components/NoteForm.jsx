import React, { useState } from 'react'
import { Button } from './ui/button'
import { v4 as uuidv4 } from 'uuid'

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [shift, setShift] = useState('Day')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newNote = {
      id: uuidv4(),
      title,
      content,
      shift,
      createdAt: new Date().toLocaleString()
    }

    onAddNote(newNote)
    setTitle('')
    setContent('')
    setShift('Day')
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shift Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter shift note title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shift Notes
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter detailed shift notes"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shift Type
        </label>
        <select
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50"
        >
          <option value="Day">Day Shift</option>
          <option value="Night">Night Shift</option>
          <option value="Morning">Morning Shift</option>
          <option value="Evening">Evening Shift</option>
        </select>
      </div>

      <Button type="submit" variant="default" className="w-full">
        Create Shift Note
      </Button>
    </form>
  )
}

export default NoteForm
