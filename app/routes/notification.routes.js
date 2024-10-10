module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const notification = require('../controllers/notification.controller');

    console.log('Notification Controller:', notification); // Should log the controller

    router.get('/', notification.getNotifications);

    router.patch('/read', notification.markAsRead); 

    app.use('/api/notifications', router);
};
