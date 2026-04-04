#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env.local file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, value] = trimmed.split('=');
    envVars[key] = value;
  }
});

// Generate firebase-config.js
const configContent = `
window.firebaseConfig = {
  apiKey: "${envVars.VITE_FIREBASE_API_KEY || ''}",
  authDomain: "${envVars.VITE_FIREBASE_AUTH_DOMAIN || ''}",
  databaseURL: "${envVars.VITE_FIREBASE_DATABASE_URL || ''}",
  projectId: "${envVars.VITE_FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${envVars.VITE_FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${envVars.VITE_FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${envVars.VITE_FIREBASE_APP_ID || ''}",
  measurementId: "${envVars.VITE_FIREBASE_MEASUREMENT_ID || ''}"
};
`;

const configPath = path.join(__dirname, 'firebase-config.js');
fs.writeFileSync(configPath, configContent);
console.log('✓ firebase-config.js generated successfully');
