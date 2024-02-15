const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const admin = require('firebase-admin');

const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); // Add notification routes

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());
// Use user and auth routes
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes); 

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3636;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: false });

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run();

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
