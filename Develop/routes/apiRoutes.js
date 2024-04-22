const fs = require ('fs');
const path = require('path');
const router = require =('express').Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

router.get('/notes' (req, res) => {
    fs.readFile(dbFilePath. 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error'});
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});