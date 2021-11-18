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
            res.render('empty-list', {emptyProducts: data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getProducts(req, res) {
        Product.findAll()
        .then(data => {
            res.render('admin-products', {products: data})
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

    static getAddProduct(req, res) {
        Category.findAll()
        .then(data => {
            res.render('addNewProduct', {category: data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postAddProduct(req, res) {
        let {name, stock, price, CategoryId, description} = req.body;

        Product.create({name, stock, price, CategoryId, description})
        .then(data => {
            res.redirect('/admin');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static getEditProduct(req, res) {
        const product = Product.findByPk(+req.params.id, {
            include: Category
        });
        const categories = Category.findAll();

        Promise.all([product, categories])
        .then(data => {
            res.render('edit-product', {product: data[0], categories: data[1]});
        })
        .catch(err => {
            res.send(err);
        })
    }

    static postEditProduct(req, res) {
        let {name, stock, price, CategoryId, description} = req.body;

        Product.update({
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            description: req.body.description,
            CategoryId: req.body.CategoryId
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

    static deleteProduct(req, res) {
        Product.destroy({
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