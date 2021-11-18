const { Category, Product } = require('../models');
const priceFormatter = require('../helpers/price-formatter');

class Controller {
    static getProducts(req, res) {
        let option = {
            include: Category
        }

        Product.findAll(option)
        .then(data => {
            console.log(priceFormatter(10000));
            res.render('homePageNew', {products: data, priceFormatter})
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

    static getBuyProduct(req, res) {
        
    }

    static postBuyProduct(req, res) {

    }
}

module.exports = Controller;