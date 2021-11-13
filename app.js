const express = require('express');
const app = express();
const methodOverride = require('method-override');
const cors = require('cors');
const db = require("./db/models");
const Role = db.role;
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes =  require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');

app.use(eventRoutes);
app.use(ticketRoutes);
app.use(authRoutes);
app.use(userRoutes);



db.sequelize.sync()


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server is connected to port 3000');
})