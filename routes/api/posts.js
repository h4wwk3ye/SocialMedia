import express from 'express'
const router = express.Router()
import passport from 'passport'

// loading posts model
import Post from '../../models/Post.js'
import Profile from '../../models/Profile.js'

// validation
import validatePost from '../../validation/post.js'

// read all posts
router.get(
    '/',
    (req, res) => {
        Post.find()
            .sort({ date: -1 })
            .then(posts => res.json(posts))
            .catch(err => res.status(404).json({ noPostsFound: 'No posts found' }))
    }
)

// read a single posts
router.get(
    '/:id',
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => res.json(post))
            .catch(err => res.status(404).json({ noPostFound: 'No post found by that id' }))
    }
)

// create a post
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePost(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        })

        newPost.save().then(post => res.json(post)).catch(err => res.status(400).json(err))
    }
)

// like a post
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if ((post.likes.filter(like => like.user.toString() === req.user.id)).length > 0) {
                            return res.status(400).json({ alreadyLiked: 'User already liked this post' })
                        }
                        post.likes.unshift({ user: req.user.id })

                        post.save().then(post => res.json(post))
                    })
                    .catch(err => res.status(404).json({ postnotFound: 'No post found' }))
            })
    }
)

// unlike a post
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if ((post.likes.filter(like => like.user.toString() === req.user.id)).length === 0) {
                            return res.status(400).json({ notLiked: 'User has not liked this post' })
                        }
                        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id)

                        post.likes = newLikes

                        post.save().then(post => res.json(post))
                    })
                    .catch(err => res.status(404).json({ postnotFound: 'No post found' }))
            })
    }
)

// delete a post
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if (post.user.toString() !== req.user.id) {
                            return res.status(401).json({ notAuthorized: "User not authorized" })
                        }
                        post.remove().then(() => res.json({ success: true }))
                    })
                    .catch(err => res.status(404).status.json({ postnotFound: 'No post found' }))
            })
            .catch(err => res.status(404).json({ noUserFound: "No user found by given id" }))
    }
)

// add a comment to post
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePost(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                }

                post.comments.unshift(newComment)

                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({ postnotFound: 'No post found' }))
    }
)

// delete a comment from post
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({ commentnotexists: "Comment doesn't exists" })
                }

                const newComments = post.comments.filter(comment => comment._id.toString() !== req.params.comment_id)

                post.comments = newComments

                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({ postnotFound: 'No post found' }))
    }
)

export default router