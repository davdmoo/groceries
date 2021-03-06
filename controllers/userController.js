const { User, UserProfile } = require('../models');
const bcrypt = require('bcryptjs')
const session = require('express-session')


class Controller {
    static login(req, res) {
        const err = req.query.error
        res.render('loginForm',{err});
    }

    static postLogin(req, res) {
        const {email,password} = req.body
        // console.log(req.body)
        User.findOne({where: {email}})
            .then(user => {
                // console.log(user);
                if(user) {
                    const isValid = bcrypt.compareSync(password, user.password)
                    if(isValid) {
                        req.session.userId = user.id
                        req.session.role = user.role
                        // console.log(req.session, 'ini dari controller');
                       return res.redirect('/')
                    } else {
                        const error = `Invalid email or password`
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = `Invalid email or password`
                    return res.redirect(`/login?error=${error}`)
                }

            })
            .catch(err => res.send(err))
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) res.send(err);
            else {
                res.redirect('/login');
            }
        })
    }

    static getRegister(req, res) {
        res.render('registerForm');
    }

    static postRegister(req, res) {
        const {name, email, password, address, city, gender, age, role} = req.body;
        console.log(req.body)
        User.create({name, email, password,role})
        .then(data => {

            return UserProfile.create({address, city, gender, age, UserId: data.id});
        })
        .then(data2 => {

            res.redirect('/login');
        })
        .catch(err => {
            const result = err.errors.map(el => {
                return el.message
            })
            res.send(err)
        })
    }

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
}

module.exports = Controller;