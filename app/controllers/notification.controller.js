// controllers/notificationController.js
const db = require('../models');
const Notification = require('../models/notification.model');

exports.getNotifications = async (req, res) => {
    try {
      const notifications = await db.Notification.findAll({
        order: [['createdAt', 'DESC']], // Order by createdAt descending
      });
      console.log('Fetched Notifications:', notifications); // Log the fetched notifications
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error); // Log the error
      res.status(500).json({ message: 'Error fetching notifications' });
    }
  };

// Debug log to check if the exports are correct
console.log('Notification Controller Exports:', exports);


exports.createNotification = async (message, type) => {
    try {
      await db.Notification.create({ message, type });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  // controllers/notificationController.js
exports.markAsRead = async (req, res) => {
  const { ids } = req.body; // Expecting an array of notification IDs

  try {
      await db.Notification.update({ read: true }, {
          where: {
              id: ids,
          },
      });
      res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
      console.error('Error marking notifications as read:', error);
      res.status(500).json({ message: 'Error marking notifications as read' });
  }
};
