const { Category, Product, User, UserProfile } = require('../models');
const { Op } = require('sequelize');
const priceFormatter = require('../helpers/price-formatter')

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
        let option = {
            include: Category
        }
        
        if (req.query.sort === 'name') {
            option.order = [['name', 'ASC']]
        } else if (req.query.sort === 'price') {
            option.order = [['price', 'ASC']]
        } else if (req.query.sort === 'stock') {
            option.order = [['stock', 'ASC']]
        } else if (req.query.sort === 'sold') {
            option.order = [['sold', 'ASC']]
        } else if (req.query.sort === 'CategoryId') {
            option.order = [['Category', 'name', 'ASC']]
        }

        Product.findAll(option)
        .then(data => {
            res.render('adminPageNew', {products: data, priceFormatter})
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
        let {name, stock, price, CategoryId, description, imageUrl} = req.body;

        Product.create({name, stock, price, CategoryId, description, imageUrl})
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
        let {name, stock, price, CategoryId, description, imageUrl} = req.body;

        Product.update({
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            description: req.body.description,
            CategoryId: req.body.CategoryId,
            imageUrl: req.body.imageUrl
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

    static getUsers(req, res) {
        UserProfile.findAll({
            include: User
        })
        .then(data => {
            res.render('userList', {users: data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller;