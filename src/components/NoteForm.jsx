import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { v4 as uuidv4 } from 'uuid'

function NoteForm({ onAddNote, initialNote }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [shift, setShift] = useState('Day')
  const [priority, setPriority] = useState('routine')
  const [requiresAction, setRequiresAction] = useState(false)
  const [actionStatus, setActionStatus] = useState('none') // none, open, closed

  // Load initial note data if editing
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '')
      setContent(initialNote.content || '')
      setShift(initialNote.shift || 'Day')
      setPriority(initialNote.priority || 'routine')
      setRequiresAction(initialNote.requiresAction || false)
      setActionStatus(initialNote.actionStatus || 'none')
    }
  }, [initialNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const now = new Date()
    const noteData = {
      title: title.trim(),
      content: content.trim(),
      shift,
      priority,
      requiresAction,
      actionStatus: requiresAction ? (actionStatus === 'none' ? 'open' : actionStatus) : 'none',
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      timestamp: now.getTime(),
      closedAt: actionStatus === 'closed' ? now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) : null
    }

    if (initialNote) {
      // If editing, keep the original ID and creation date
      onAddNote({
        ...noteData,
        id: initialNote.id,
        createdAt: initialNote.createdAt,
        timestamp: initialNote.timestamp
      })
    } else {
      // If creating new, generate new ID
      onAddNote({ ...noteData, id: uuidv4() })
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 bg-white p-6 rounded-lg shadow-sm"
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

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requiresAction"
            checked={requiresAction}
            onChange={(e) => {
              setRequiresAction(e.target.checked)
              if (!e.target.checked) {
                setActionStatus('none')
              } else if (actionStatus === 'none') {
                setActionStatus('open')
              }
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="requiresAction" className="ml-2 block text-sm text-gray-900">
            Requires Action
          </label>
        </div>

        {requiresAction && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Status
            </label>
            <select
              value={actionStatus}
              onChange={(e) => setActionStatus(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-shift-primary focus:ring focus:ring-shift-primary/50 px-3 py-2"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">
        {initialNote ? 'Update Note' : 'Add Note'}
      </Button>
    </form>
  )
}

export default NoteForm
