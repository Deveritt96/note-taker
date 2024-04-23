const fs = require ('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const dbFilePath = path.join(__dirname, '../db/db.json');


// code to get the notes from the database
router.get('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error'});
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// code to add a new note to the database
router.post('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuidv4(); // Generate a unique ID for the note
        notes.push(newNote);
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(newNote);
        });
    });
});

// code to delete a note from the database
router.delete('/notes/:id', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        let notes = JSON.parse(data);
        const noteId = req.params.id;
        const updatedNotes = notes.filter(note => note.id !== noteId);
        if (notes.length === updatedNotes.length) {
            return res.status(404).json({ error: 'Note not found' });
        }
        fs.writeFile(dbFilePath, JSON.stringify(updatedNotes), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ success: true });
        });
    });
});



module.exports = router;