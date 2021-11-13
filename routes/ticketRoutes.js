const { Router } = require('express');
const ticketController = require('../controllers/ticketController');
const router = Router();


router.get('/events/:eventId/tickets/new', ticketController.getTicket);
router.post('/events/:eventId/tickets', ticketController.createTicket);

    

module.exports = router;
