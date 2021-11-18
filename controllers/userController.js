const { User, UserProfile } = require('../models');

class Controller {
    static userProfile(req, res) {
        User.findByPk(+req.params.id, {
            include: UserProfile
        })
        .then(data => {
            res.render('myProfile', {profile: data})
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

            return UserProfile.create({address, city, gender, age, UserId: data.id});
        })
        .then(data2 => {

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