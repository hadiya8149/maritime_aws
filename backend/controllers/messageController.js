import { db } from "../config/dbConnection.js";

export const sendMessage = async(req, res) => {

    const { sender_id, receiver_id, subject, body, Timestamp } = req.body;

    console.log('Request Body:', req.body); // Log request body
    
    const query = 'INSERT INTO messages (sender_id, receiver_id, subject, body, Timestamp) VALUES (?, ?, ?, ?,?)';
    db.query(query, [sender_id, receiver_id, subject, body, Timestamp], (err, result) => {

      if (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ success: false, message: 'Failed to send message' });
        return;
      }
      console.log(result)
      res.status(200).json({ 
        success: true,
        message: 'Message sent successfully' });
    });
  };

export const getAllMessages = (req, res) => {
    const query = 'SELECT * FROM messages';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch messages' });
        return;
      }
      
      res.status(200).json({ 
        success: true,
        Data: results,
        msg : "Fetch All messages data successfully."
      });
    });
  };