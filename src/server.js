const express = require('express');
const mongoose = require('mongoose');
const requestTypesRouter = require('./routes/requestTypes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/request-types', requestTypesRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Connexion à MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/support';
mongoose.connect(mongoUri).then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
