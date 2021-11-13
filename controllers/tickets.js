module.exports = (app, models) => {
    // NEW
    app.get('/events/:eventId/tickets/new', (req, res) => {
      models.Event.findByPk(req.params.eventId).then(event => {
        res.render('tickets-new', { event: event });
      });
    });
  
    // CREATE
    app.post('/events/:eventId/tickets', (req, res) => {
      req.body.EventId = req.params.eventId;
        models.Ticket.create(req.body).then(ticket => {
            res.redirect(`/events/${req.params.eventId}`);
        }).catch((err) => {
            console.log(err)
        });
    });
    // DESTROY  
  }