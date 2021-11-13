const express = require('express');
const methodOverride = require('method-override');
const app = express()
const models = require('./db/models');
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');

require('./controllers/events')(app, models);
require('./controllers/tickets')(app, models);


app.listen(port, () => {
    console.log('server is connected to port 3000');
})