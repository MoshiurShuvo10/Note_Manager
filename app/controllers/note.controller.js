const noteModel = require('../models/note.model.js');

exports.createNote = (req, res) => {
    //validate the content
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content are empty. Can't be saved"
        });
    }

    //at this point, request body is valid.Now creating a note to save into db
    const note = new noteModel({
        title: req.body.title || 'Untitled Note',
        author: req.body.author,
        content: req.body.content
    });


    note.save().then(data => res.send(data)).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getAllNotes = (req, res) => {
    noteModel.find().then(notes => {
        res.send(notes);
    }).catch((err => {
        res.status(500).send({
            message: err.message || "Error!"
        });
    }));
}

exports.getNoteById = (req, res) => {
    noteModel.findById(req.params.noteId).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "No note found with id: " + req.params.noteId
            });
        }
        console.log(req.params.noteId);
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No note found with id: " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: err.message || "Error!"
        });
    });
}

exports.deleteNoteById = (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "No note found with id: " + req.params.noteId
                });
            }
            res.send({
                message: "Note deleted Successfully"
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.kind === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with noteId: " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Couldn't delete note"
            });
        });
}

exports.updateNoteById = (req, res) => {
    //first,get the note using the noteid.
    noteModel.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "untitled note",
        author: req.body.author,
        content: req.body.content
    }, {
        new: true
    }).then(note => {
        if (!note) {
            console.log('noteId: ' + req.params.noteId)
            res.status(404).send({
                message: "No note found with noteId: " + req.params.noteId
            });
        }
        return res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
}