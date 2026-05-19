import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, Notebook } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotes(data.data || []);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      setError('Failed to load notes. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        setTitle('');
        setContent('');
        fetchNotes(); // Refresh list after adding
      } else {
        throw new Error('Failed to create note');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
      alert('Failed to add note. Check console for details.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchNotes(); // Refresh list after deleting
      } else {
        throw new Error('Failed to delete note');
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
      alert('Failed to delete note. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-10 space-x-3">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
            <Notebook className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Notes App</h1>
        </div>
        
        {/* Create Note Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 overflow-hidden mb-12 transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Create a New Note</h2>
            <form onSubmit={handleAddNote} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Enter note title..."
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none text-slate-900 placeholder-slate-400"
                  placeholder="Write your note content here..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!title.trim() || !content.trim()}
                className="w-full flex justify-center items-center py-4 px-4 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <PlusCircle className="mr-2.5 h-5 w-5" />
                Add Note
              </button>
            </form>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-bold text-slate-800">Your Notes</h2>
            <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-semibold">
              {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600"></div>
            </div>
          ) : notes.length === 0 && !error ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
              <Notebook className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No notes yet</h3>
              <p className="mt-1 text-slate-500">Get started by creating a new note above.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {notes.map((note) => (
                <div key={note.id || note._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{note.title}</h3>
                        <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(note.id || note._id)}
                        className="flex-shrink-0 p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                        title="Delete note"
                        aria-label="Delete note"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
