import express from 'express'
const router = express.Router()
import passport from 'passport'

// loading profile and user model
import Profile from '../../models/Profile.js'
import User from '../../models/User.js'


router.get('/test', (req, res) => {
    res.json({ msg: "PROFILE WORKING" })
})

// get current user's profile
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {}

        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "There is no profile for this user"
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err))
    }
)

// get profile by handle 
router.get(
    '/handle/:handle',
    (req, res) => {
        const errors = {}

        Profile.findOne({ handle: req.params.handle })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user'
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err))
    }
)

// get all profiles
router.get(
    '/all',
    (req, res) => {
        const errors = {}
        Profile.find({})
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profiles'
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).send(err))
    }
)

// get profile by id
router.get(
    '/user/:user_id',
    (req, res) => {
        const errors = {}

        Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user'
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err))
    }
)

// create or edit user's profile

import validateProfile from '../../validation/profile.js'

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfile(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const profileFields = {}
        profileFields.user = req.user.id
        if (req.body.handle) profileFields.handle = req.body.handle
        if (req.body.company) profileFields.company = req.body.company
        if (req.body.website) profileFields.website = req.body.website
        if (req.body.location) profileFields.location = req.body.location
        if (req.body.bio) profileFields.bio = req.body.bio
        if (req.body.status) profileFields.status = req.body.status
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername
        if (req.body.handle) profileFields.handle = req.body.handle

        // skills
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',')
        }

        // social
        profileFields.social = {}
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    // update
                    Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                        .then(profile => {
                            res.json(profile)
                        })
                } else {
                    // create

                    // checking if handle exist
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = "That handle already exist"
                                return res.status(400).json(errors)
                            }

                            // saving profile
                            new Profile(profileFields).save()
                                .then(profile => {
                                    res.json(profile)
                                })
                        })
                }
            })
    }
)

// add experience to profile

import validateExperience from '../../validation/experience.js'

router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateExperience(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newExp = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                profile.experience.unshift(newExp)

                profile.save().then(profile => res.json(profile))
            })
            .catch(err => res.status(404).json(err))


    }
)

// add education to profile

import validateEducation from '../../validation/education.js'

router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateEducation(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newEdu = {
                    school: req.body.school,
                    degree: req.body.degree,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                profile.education.unshift(newEdu)

                profile.save().then(profile => res.json(profile))
            })
            .catch(err => res.status(404).json(err))
    }
)

// delete experience from profile

router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newExperience = profile.experience.filter(item => item.id !== req.params.exp_id)

                profile.experience = newExperience

                profile.save().then(profile => res.json(profile))
            })
            .catch(err => res.status(404).json(err))
    }
)

// delete education from profile

router.delete(
    '/experience/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                const newEducation = profile.education.filter(item => item.id !== req.params.edu_id)

                profile.education = newEducation

                profile.save().then(profile => res.json(profile))
            })
            .catch(err => res.status(404).json(err))
    }
)

// delete profile

router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
                User.findOneAndRemove({ _id: req.user.id })
                    .then(() => res.json({ success: true }))
            })
            .catch(err => console.log(err))
    }
)

export default router