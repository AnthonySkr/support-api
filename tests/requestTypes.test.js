/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const RequestType = require('../src/models/RequestType');
const requestTypesRouter = require('../src/routes/requestTypes');

const app = express();
app.use(express.json());
app.use('/api/request-types', requestTypesRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/support_test';
    await mongoose.connect(mongoUri);
    await RequestType.deleteMany({});
    await RequestType.insertMany([
        { code: 'TEST1', name: 'Test 1', description: 'desc', category: 'cat' },
        { code: 'TEST2', name: 'Test 2', description: 'desc', category: 'cat' },
    ]);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Health Check', () => {
    it('GET /health returns status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });
});

describe('Request Types API', () => {
    it('GET /api/request-types returns array', async () => {
        const res = await request(app).get('/api/request-types');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it('POST /api/request-types creates a new type', async () => {
        const newType = { code: 'TEST3', name: 'Test 3', description: 'desc', category: 'cat' };
        const res = await request(app).post('/api/request-types').send(newType);
        expect(res.statusCode).toBe(201);
        expect(res.body.code).toBe('TEST3');
    });
});
