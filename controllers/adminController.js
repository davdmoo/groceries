const { Category, Product, User } = require('../models');
const { Op } = require('sequelize');

class Controller {
    static getEmptyList(req, res) {
        Product.findAll({
            include: Category,
            where: {
                stock: {
                    [Op.eq]: 0
                }
            }
        })
        .then(data => {
            res.render('adminpage', {emptyProducts: data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getRestockProduct(req, res) {
        Product.findByPk((+req.params.id), {
            include: Category
        })
        .then(data => {
            res.render('restock-product', {product: data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postRestockProduct(req, res) {
        Product.update({
            stock: req.body.stock
        },
        {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.redirect('/admin');
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = Controller;