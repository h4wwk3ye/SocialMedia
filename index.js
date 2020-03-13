import express from 'express'
import mongoose from 'mongoose'

const app = express()

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
            useUnifiedTopology: true
        })
    .then(() => console.log("MONGOOSE CONNECTED\n"))
    .catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send('HELLO');
})

// using routes

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})