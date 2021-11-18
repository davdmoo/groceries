const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const Controller = require('./controllers/productController')

app.set ('view engine', 'ejs');
app.use(express.static('style'));
app.use (express.urlencoded({extended: false}));
app.use('/', routes);

// app.get('/products', Controller.getProducts)

app.listen(port, () => {
    console.log(`Tokopaedi is listening at http://localhost:${port}`);
})