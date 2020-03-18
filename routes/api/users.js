import express from 'express'
const router = express.Router()
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import keys from '../../config/keys.js'
import passport from 'passport'

//validation
import validateRegistration from '../../validation/register.js'
import validateLogin from '../../validation/login.js'

// loading user model
import User from '../../models/User.js'

router.get('/test', (req, res) => {
    res.json({ msg: "USER WORKING" })
})

// Registering a user
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegistration(req.body)  // validating using './../validation/register.js'
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user)
                return res.status(404).json(({ email: "Email already exists" }));

            const avatar = gravatar.url(req.body.email, {
                s: '200', //size of image
                r: 'pg', // rating
                d: 'mm' //default
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(15, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        })
        .catch(err => console.log(err))
})

// logging in a user
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLogin(req.body)  // validating using './../validation/login.js'
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    // finding by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = "User doesn't exist"
                return res.status(404).json(errors)
            }

            // comparing password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        errors.password = "Password incorrect"
                        return res.status(400).json(errors)
                    }

                    const payload = { id: user.id, name: user.name }

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 60 * 60 * 24 * 30 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                })
        })
})

// currently logged in user
router.get('/current',
    passport.authenticate('jwt', { session: false }), // middleware
    (req, res) => {
        res.json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        })
    })

export default router