const { Category, Product, UserProfile, User } = require('../models');
const priceFormatter = require('../helpers/price-formatter');
const { Op } = require("sequelize");

class Controller {
    static getProducts(req, res) {
        let option = {
            include: Category,
            order: [['sold','desc']],
            limit: 4
        }

        Product.findAll(option)
        .then(data => {
            const err = req.query.error;
            console.log(data);
            res.render('homePageNew', {products: data, priceFormatter, err})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static allProducts(req,res) {
        const keyword = req.query.search;

        let option = {
            include: Category
        }

        if(keyword) {
            option.where = {
                name: {
                    [Op.iLike]: `%${keyword}%`
                }
            }
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