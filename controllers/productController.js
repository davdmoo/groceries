const { Category, Product } = require('../models');

class Controller {
    static getProducts(req, res) {
        Product.findAll()
        .then(data => {
            res.render('products', {products: data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller;