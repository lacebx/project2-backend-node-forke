// controllers/course.controller.js
const db = require("../models");
const notificationController = require('../controllers/notification.controller'); // Adjusted import

exports.findAll = (req, res) => {
  db.course.findAll()
    .then(course => {
      res.json(course);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Method to create a new course
exports.create = async (req, res) => {
  console.log('Received data:', req.body); // Log the incoming data

  const newCourse = {
    dept: req.body.dept || '',
    course_number: req.body.course_number || '',
    level: req.body.level || '',
    hours: req.body.hours || '',
    name: req.body.name || '',
    description: req.body.description || '',
  };
  
  try {
    const course = await db.course.create(newCourse);
    // Create a notification for the new course
    await notificationController.createNotification(`Course added: ${course.name}`, 'added');
    res.status(201).send(course);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).send({ message: err.message || "Some error occurred while creating the course." });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await db.course.update(req.body, {
      where: { id: id }
    });
    
    if (num[0] === 1) {
      // Create a notification for the updated course
      await notificationController.createNotification(`Course updated: ${req.body.name || 'Unknown'}`, 'updated');
      res.send({ message: "Course was updated successfully." });
    } else {
      res.send({ message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating Course with id=" + id });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // First, find the course to get its details
    const course = await db.course.findOne({ where: { id: id } });

    if (!course) {
      return res.send({ message: `Cannot delete Course with id=${id}. Maybe Course was not found!` });
    }

    // Now, proceed to delete the course
    const num = await db.course.destroy({
      where: { id: id }
    });

    if (num === 1) {
      console.log(`Course with id=${id} deleted. Creating notification...`);
      // Create a notification for the deleted course using course_number and name
      await notificationController.createNotification(`Course deleted: ${course.course_number}: ${course.name}`, 'deleted');
      res.send({ message: "Course was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete Course with id=${id}. Maybe Course was not found!` });
    }
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).send({ message: "Could not delete Course with id=" + id });
  }
};
