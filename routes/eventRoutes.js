const { Router } = require('express');
const eventController = require('../controllers/eventController');
const router = Router();


router.get('/', eventController.allEvents);
router.post('/events', eventController.createEvent);
router.get('/events/new', eventController.getNewEvent);
router.get('/events/:id', eventController.getEvent);
router.get('/events/:id/edit', eventController.editEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);
    

module.exports = router;
