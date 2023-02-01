const bcrypt = require('bcrypt')
const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')
const sendVerifyEmail = require('../../services/email/sendVerifyEmail')
const { nanoid } = require('nanoid')
require('dotenv').config()

const { BASE_URL } = process.env

const register = async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, 'Such email already exists')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const verificationToken = nanoid()

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken,
    })

    const verifyEmail = {
        to: email,
        subject: 'Email verification',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email on <b>Pet Support</b> service!</a>`,
    }

    await sendVerifyEmail(verifyEmail)

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        city: newUser.sity,
        userId: newUser._id,
    })
}

module.exports = register
