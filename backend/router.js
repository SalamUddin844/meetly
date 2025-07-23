const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all meeting info
router.get('/api/v1/getalluser', (req, res) => {
    
    db.query('SELECT * FROM bookings', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// create a new slot for meetig
router.post('/api/v1/adduser', (req, res) => {
    const { Date, Room, Type, Slot, Host } = req.body;  
    db.query(
        'INSERT INTO bookings (Date, Room, Type, Slot, Host) VALUES (?, ?, ?, ?, ?)',
        [Date, Room, Type, Slot, Host],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, Date, Room, Type, Slot, Host });
        }
    );
});

// Update Meeting Info
router.put('/api/v1/updateuser/:id', (req, res) => {
    const { Date, Room, Type, Slot, Host } = req.body;
    const { id } = req.params;

    console.log("Updating ID:", id, "with data:", req.body);

    db.query(
        'UPDATE bookings SET Date = ?, Room = ?, Type = ?, Slot = ?, Host = ? WHERE id = ?',
        [Date, Room, Type, Slot, Host, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Entry not found' });
            res.sendStatus(200);
        }
    );
});


// Delete Meeting History
router.delete('/api/v1/deleteuser/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM bookings WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Entry not found' });
        res.sendStatus(200);
    });
});

module.exports = router;
