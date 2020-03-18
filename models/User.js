import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', UserSchema)

export default User
