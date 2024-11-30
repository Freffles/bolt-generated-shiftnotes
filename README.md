# Shift Notes Application

A modern web application for managing shift handover notes, built with React, Vite, and TailwindCSS.

## 🚀 Features

- Create, edit, and delete shift notes
- Priority-based organization (Routine, Important, Critical)
- Real-time updates
- Persistent storage using localStorage
- Responsive design
- Modal-based note creation
- Shift type categorization
- Timestamp tracking

## 🛠️ Technology Stack

- **React** - Frontend library
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **UUID** - Unique ID generation
- **Lucide React** - Icon library

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd shift-notes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
shift-notes/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   └── dialog.jsx
│   │   ├── NoteForm.jsx
│   │   └── NoteList.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔍 Component Overview

### App.jsx
- Main application component
- Manages global state
- Handles CRUD operations for notes
- Implements localStorage persistence

### NoteForm.jsx
- Form component for note creation
- Handles input validation
- Manages form state
- Implements note submission

### NoteList.jsx
- Displays notes grouped by priority
- Implements priority-based columns
- Handles note sorting
- Manages note actions (edit/delete)

## 📝 Note Structure

Each note contains the following properties:
```javascript
{
  id: string,          // Unique identifier
  title: string,       // Note title
  content: string,     // Note content
  shift: string,       // Shift type (Day/Night/Morning/Evening)
  priority: string,    // Priority level (routine/important/critical)
  createdAt: string,   // Formatted creation date
  timestamp: number    // Unix timestamp for sorting
}
```

## 🎨 Styling

The application uses TailwindCSS with custom configuration:

- Custom color scheme:
  - Primary: Blue (#3B82F6)
  - Secondary: Green (#10B981)
  - Accent: Indigo (#6366F1)
  - Background: Gray (#F3F4F6)

- Priority Colors:
  - Routine: Green
  - Important: Yellow
  - Critical: Red

## 💾 Data Persistence

Notes are stored in the browser's localStorage:
- Key: 'shiftNotes'
- Format: JSON string array
- Auto-saves on all CRUD operations

## 🔄 State Management

- Uses React's useState for local state management
- Implements useEffect for localStorage synchronization
- Real-time updates across components

## 🛡️ Error Handling

- Form validation for required fields
- Fallback UI for empty states
- Safe access patterns for undefined values
- Default color schemes for unknown priorities

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and desktop
- Requires JavaScript enabled

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔒 Security Considerations

- Input sanitization for note content
- No sensitive data storage
- XSS protection through React's built-in escaping

## 🔧 Configuration Files

### vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
```

### tailwind.config.js
Contains custom color schemes and theme extensions.

### postcss.config.js
Configures PostCSS with TailwindCSS and Autoprefixer.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🐛 Known Issues

- No offline support
- Limited to localStorage capacity
- No data sync between browsers/devices

## 🔜 Future Enhancements

- [ ] Add search functionality
- [ ] Implement note filtering
- [ ] Add note categories/tags
- [ ] Implement note archiving
- [ ] Add user authentication
- [ ] Add data export/import
- [ ] Implement real-time collaboration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
