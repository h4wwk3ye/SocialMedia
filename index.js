import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'

const app = express()

// body parser middelware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// db config
import mongoURI from './config/keys.js'
const db = mongoURI.mongoURI

// routes
import users from './routes/api/users.js'
import profile from './routes/api/profile.js'
import posts from './routes/api/posts.js'

mongoose
    .connect(db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    .then(() => console.log("MONGOOSE CONNECTED\n"))
    .catch(error => console.log(error))

// passport middelware
app.use(passport.initialize())

// passport config
import x from './config/passport.js'
x(passport)

// using routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})