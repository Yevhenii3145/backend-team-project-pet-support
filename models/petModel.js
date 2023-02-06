const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseError } = require('../middlewares')

const petSchema = new Schema(
    {
        name: {
            type: String,
            // required: [true, 'Set name for pet'],
        },
        birthday: {
            type: String,
            // required: [true, 'Set birthday for pet'],
        },
        breed: {
            type: String,
            // required: [true, 'Set breed of pet'],
        },
        comments: {
            type: String,
            // required: [true, 'Set comments about pet'],
        },
        image: {
            type: String,
            default: '',
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'Set owner'],
        },
    },
    { versionKey: false, timestamps: true }
)

petSchema.post('save', handleMongooseError)

const addPetSchema = Joi.object({
    name: Joi.string().min(2).max(16).required(),
    birthday: Joi.string().required(),
    breed: Joi.string().min(2).max(16).required(),
    comments: Joi.string().min(8).max(120).required(),
})

const schemasPet = { addPetSchema }

const Pet = model('pet', petSchema)

module.exports = { Pet, schemasPet }
