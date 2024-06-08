import { db } from "../config/dbConnection.js";

export const createNotification = (req, res) => {
  const { user_id, notificationType, content, IsRead } = req.body;
  console.log(req.body)
  const query = 'INSERT INTO notifications (user_id, notificationType, content, IsRead) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, notificationType, content, IsRead], (err, result) => {
    if (err) {
      console.error('Error creating notification:', err);
      res.status(500).json({ success: false, message: 'Failed to create notification' });
    }
    console.log(result)
    res.status(200).json({ 
        success: true, 
        message: 'Notification created successfully'
     });
  });
};
export const sendNotificationToUser = async (req, res) => {
  const { notificationType, content, IsRead} = req.body;
  const job_seeker_id=req.params.id;
  console.log(req.params)
  console.log(req.body)
  console.log("jobseekerid", job_seeker_id)
  const  sql2 = 'select job_title from jobs where job_id=?'
  const sql= 'SELECT user_id from jobseekers where jobSeeker_id=?'

  db.query(sql, [job_seeker_id], (err, result)=>{
    if(!err){
      console.log(result[0].user_id)
      const user_id = result[0].user_id
      const query = 'INSERT INTO notifications (user_id, notificationType, content, IsRead) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, notificationType, content, IsRead], (err, result) => {
      if (err) {
        console.error('Error creating notification:', err);
        res.status(500).json({ success: false, message: 'Failed to create notification' });
        return;
      }

      res.status(200).json({ 
          success: true, 
          message: 'Notification created successfully'
      });
    });
    }
  })
  
};


export const getAllNotifications = (req, res) => {
    const query = 'SELECT * FROM notifications';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
        return;
      }
      
      res.status(200).json({ 
        success: true,
        Data: results ,
        msg : "Fetch All notifications data successfully."

      });
    });
  };