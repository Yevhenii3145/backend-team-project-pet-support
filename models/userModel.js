const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseError } = require('../middlewares')

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        city: {
            type: String,
            required: [true, 'Region is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        },
        avatarURL: {
            type: String,
            default: '',
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
)

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
    password: Joi.string().min(7).max(32).required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().required(),
})

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model('user', userSchema)

module.exports = {
    User,
    schemas,
}
