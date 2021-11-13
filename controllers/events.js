module.exports = function (app, models) {

    // INDEX
    app.get('/', (req, res) => {
        models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
            res.render('events-index', { events: events });
        })
    })

    app.post('/events', (req, res) => {
        models.Event.create(req.body).then(event => {
          res.redirect(`/events/${event.id}`);
        }).catch((err) => {
          console.log(err)
        });
      })
      app.get('/events/new', (req, res) => {
        res.render('events-new', {});
      })
      // show
      app.get('/events/:id', (req, res) => {
        const moment= require('moment') 
        models.Event.findByPk(req.params.id, { include: [{ model: models.Ticket }] }).then(event => {
          let createdAt = event.createdAt;
          createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
          event.createdAtFormatted = createdAt;
          res.render('events-show', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });
      // edit
      app.get('/events/:id/edit', (req, res) => {
        models.Event.findByPk(req.params.id).then((event) => {
          res.render('events-edit', { event: event });
        }).catch((err) => {
          console.log(err.message);
        })
      });
      
      app.put('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
          event.update(req.body).then(event => {
            res.redirect(`/events/${req.params.id}`);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      });
      
      app.delete('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
          event.destroy();
          res.redirect(`/`);
        }).catch((err) => {
          console.log(err);
        });
      })
}

