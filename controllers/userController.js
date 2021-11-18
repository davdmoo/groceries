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
        const {name, email, password} = req.body;

        User.create({name, email, password})
        .then(data => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller;