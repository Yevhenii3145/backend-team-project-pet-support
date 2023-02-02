const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')
const sendVerifyEmail = require('../../services/email/sendVerifyEmail')
const bcrypt = require('bcrypt')
require('dotenv').config()

const { BASE_URL } = process.env

const resendVerifyEmail = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        throw HttpError(404, 'User not found')
    }

    if (user.verify) {
        throw HttpError(400, 'You already verified')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, 'Password is wrong')
    }

    const { verificationToken } = user

    const verifyEmail = {
        to: email,
        subject: 'Email verification',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email on <b>Pet Support</b> service!</a>`,
    }

    await sendVerifyEmail(verifyEmail)

    res.json({
        message: 'We resent your verification code',
    })
}

module.exports = resendVerifyEmail
