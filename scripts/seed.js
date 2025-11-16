const mongoose = require('mongoose');
const RequestType = require('../src/models/RequestType');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/support';

const requestTypes = [
  {
    code: 'TECH_ISSUE',
    name: 'Problème technique',
    description: 'Problème technique rencontré par l’utilisateur',
    priority: 'high',
    category: 'tech',
    estimatedResponseTime: 4,
  },
  {
    code: 'BILLING_QUESTION',
    name: 'Question de facturation',
    description: 'Interrogation sur une facture ou un paiement',
    priority: 'medium',
    category: 'finance',
    estimatedResponseTime: 24,
  },
  {
    code: 'ACCOUNT_CHANGE',
    name: 'Demande de modification de compte',
    description: 'Modification des informations personnelles',
    priority: 'medium',
    category: 'account',
    estimatedResponseTime: 12,
  },
  {
    code: 'FEATURE_REQUEST',
    name: 'Demande de fonctionnalité',
    description: 'Proposition d’ajout de nouvelle fonctionnalité',
    priority: 'low',
    category: 'feature',
    estimatedResponseTime: 72,
  },
  {
    code: 'COMPLAINT',
    name: 'Réclamation',
    description: 'Réclamation d’un utilisateur',
    priority: 'critical',
    category: 'support',
    estimatedResponseTime: 8,
  },
];

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    await RequestType.deleteMany({});
    await RequestType.insertMany(requestTypes);
    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
