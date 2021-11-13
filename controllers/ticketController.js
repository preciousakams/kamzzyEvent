   const Event = require('../db/models/event');
   const Ticket = require('../db/models/ticket');
   const models = require('../db/models/index');
   // NEW
    const getTicket = (req, res) => {
      models.Event.findByPk(req.params.eventId).then(event => {
        res.render('tickets-new', { event: event });
      });
    };
  
    // CREATE
   const createTicket = (req, res) => {
      req.body.EventId = req.params.eventId;
        models.Ticket.create(req.body).then(ticket => {
            res.redirect(`/events/${req.params.eventId}`);
        }).catch((err) => {
            console.log(err)
        });
    };
    // DESTROY  


module.exports = {
  getTicket,
  createTicket

}