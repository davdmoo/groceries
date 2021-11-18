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

    static getProductDetail(req, res) {
        Product.findByPk(+req.params.id)
        .then(data => {
            res.render('product-detail', {product: data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller;