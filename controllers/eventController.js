const Event = require('../db/models/event');
const moment= require('moment');
const models = require('../db/models/index');


    // INDEX
    const allEvents = (req, res) => {
        models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
            res.render('events-index', { events: events });
        });
      }
    const createEvent = (req, res) => {
        models.Event.create(req.body).then(event => {
          res.redirect(`/events/${event.id}`);
        }).catch((err) => {
          console.log(err)
        });
      };

      const getNewEvent = (req, res) => {
        res.render('events-new', {});
      };
      
      const getEvent = (req, res) => {
          models.Event.findByPk(req.params.id, { include: [{ model: models.Ticket }] }).then(event => {
          let createdAt = event.createdAt;
          createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
          event.createdAtFormatted = createdAt;
          res.render('events-show', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    };
      // edit
     const editEvent = (req, res) => {
        models.Event.findByPk(req.params.id).then((event) => {
          res.render('events-edit', { event: event });
        }).catch((err) => {
          console.log(err.message);
        })
      };
      
      const updateEvent = (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
          event.update(req.body).then(event => {
            res.redirect(`/events/${req.params.id}`);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      };
      
      const deleteEvent = (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
          event.destroy();
          res.redirect(`/`);
        }).catch((err) => {
          console.log(err);
        });
      }

module.exports = {
  allEvents,
  createEvent,
  getNewEvent,
  getEvent,
  editEvent,
  updateEvent,
  deleteEvent

}