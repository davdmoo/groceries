const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const Controller = require('./controllers/productController')
const session = require('express-session')

app.set ('view engine', 'ejs');
app.use(express.static('style'));
app.use (express.urlencoded({extended: false}));
app.use(session({
    secret: 'postgres',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
  }))
app.use('/', routes);

// app.get('/products', Controller.getProducts)

app.listen(port, () => {
    console.log(`Tokopaedi is listening at http://localhost:${port}`);
})