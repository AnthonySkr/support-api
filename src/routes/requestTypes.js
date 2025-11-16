const express = require('express');
const router = express.Router();
const RequestType = require('../models/RequestType');

// GET /api/request-types → tous les types actifs
router.get('/', async (req, res) => {
    const types = await RequestType.find({ isActive: true });
    res.json(types);
});

// GET /api/request-types/:id → type par ID
router.get('/:id', async (req, res) => {
    try {
        const type = await RequestType.findById(req.params.id);
        if (!type) return res.status(404).json({ message: 'Not found' });
        res.json(type);
    } catch {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

// POST /api/request-types → créer un type
router.post('/', async (req, res) => {
    try {
        const newType = new RequestType(req.body);
        const saved = await newType.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
