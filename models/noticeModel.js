const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleMongooseError } = require('../middlewares')

const noticeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Type a title'],
        },
        name: {
            type: String,
            // required: [true, "Type the pet's name"],
        },
        birthday: {
            type: String,
            required: [true, "Type the pet's birthday"],
        },
        breed: {
            type: String,
            default: '',
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            default: 'male',
        },
        location: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            required: false,
        },
        public_id: {
            type: String,
            default: '',
        },
        comments: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            enum: ['lost-found', 'in-good-hands', 'sell'],
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
)

noticeSchema.post('save', handleMongooseError)

const addSchema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string(),
    birthday: Joi.string().required(),
    // sex: Joi.string().allow('male', 'female'),
    location: Joi.string().required(),
    price: Joi.string(),
    breed: Joi.string(),
    comments: Joi.string(),
    category: Joi.string().allow('lost-found', 'for-free', 'sell').required(),
})

const Notice = model('notice', noticeSchema)

const schemas = { addSchema }

module.exports = { Notice, schemas }
