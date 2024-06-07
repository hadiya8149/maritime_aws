import express from 'express';
import { db } from '../config/dbConnection.js';
import { createNotification, getAllNotifications, sendNotificationToUser } from '../controllers/notificationController.js';

const notificationRouter = express.Router();

// Route to create a notification
notificationRouter.post('/sendnotification', createNotification);

notificationRouter.post('/sendnotificationtouser/:id', sendNotificationToUser);


notificationRouter.get('/notifications' , getAllNotifications);

notificationRouter.get('/notification_by_user_id/:id', async(req, res)=>{
    const user_id = req.params.id;
    const sql = 'select * from notifications where user_id=?';
    await db.query(sql, [user_id], (err, result)=>{
        if(!err){
            console.log(result)
            res.status(200).json(result)
        }
    })
})


export default notificationRouter;
