const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../middlewares');

const noticeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Type a title'],
        },
        name: {
            type: String,
            required: [true, "Type the pet's name"],
        },
        birthday: {
            type: Date,
            required: true,
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
        place: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: false,
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
            // required: true,
        },
    },
    { versionKey: false, timestamps: true }
)

noticeSchema.post('save', handleMongooseError);
const Notice = model('notice', noticeSchema);

const addSchema = Joi.object({
  title: Joi.string().required(),
  petName: Joi.string().required(),
  petDateOfBirth: Joi.string().required(),
  petSex: Joi.string().allow('male', 'female'),
  petLocation: Joi.string().required(),
  petPrice: Joi.number(),
  petBreed: Joi.string(),
  petComments: Joi.string(),
  petCategory: Joi.string().allow('lost-found', 'for-free', 'sell').required(),
});

const schemas = { addSchema };

module.exports = { Notice, schemas };
