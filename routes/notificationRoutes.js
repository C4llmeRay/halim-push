const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Route to send push notification
router.post('/sendNotification', async (req, res) => {
  const { token, title, body } = req.body;

  try {
    // Send push notification using Firebase Admin SDK
    await admin.messaging().send({
      token,
      notification: {
        title,
        body
      }
    });
    
    res.status(200).json({ message: 'Push notification sent successfully' });
  } catch (error) {
    console.error('Error sending push notification:', error);
    res.status(500).json({ error: 'Failed to send push notification' });
  }
});

module.exports = router;