const { User, UserProfile } = require('../models');

class Controller {
    static userProfile(req, res) {
        UserProfile.findByPk(+req.params.id)
        .then(data => {
            res.render('user-profile', {profile: data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getRegister(req, res) {
        res.render('registerForm');
    }

    static postRegister(req, res) {
        console.log(req.body);
        const {name, email, password, address, city, gender, age} = req.body;

        User.create({name, email, password})
        .then(data => {
            return data;
        })
        .then(data2 => {
            UserProfile.create({address, city, gender, age})

            return data2;
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            res.send(err)
        })
    }

    static login(req, res) {
        res.render('loginForm');
    }

    static postLogin(req, res) {
        res.redirect('/');
    }
}

module.exports = Controller;