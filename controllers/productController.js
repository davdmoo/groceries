const { Category, Product, UserProfile, User } = require('../models');
const priceFormatter = require('../helpers/price-formatter');

class Controller {
    static getProducts(req, res) {
        let option = {
            include: Category,
            order: [['sold','desc']],
            limit: 4
        }

        Product.findAll(option)
        .then(data => {
            res.render('homePageNew', {products: data, priceFormatter})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static allProducts(req,res) {
        let option = {
            include: Category
        }

        Product.findAll(option)
        .then(data => {
            res.render('allProducts', {products: data, priceFormatter})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getProductDetail(req, res) {
        Product.findByPk(+req.params.id)
        .then(data => {
            res.render('productDetailNew', {product: data, priceFormatter})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static buyProduct(req, res) {
        Product.decrement('stock', {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            return Product.increment('sold', {
                where: { id: +req.params.id }
            })
        })
        .then(data2 => {
            res.redirect('/products')
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = Controller;