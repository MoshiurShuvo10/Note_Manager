module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    app.post('/notes', notes.createNote);
    app.get('/notes', notes.getAllNotes);
    app.get('/notes/:noteId', notes.getNoteById);
    app.delete('/notes/:noteId', notes.deleteNoteById);
    app.put('/notes/:noteId', notes.updateNoteById);
}