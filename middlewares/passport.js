const { Strategy } = require('passport-google-oauth2')
const passport = require('passport')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

const { User } = require('../models/userModel')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET_KEY, BASE_URL } = process.env

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET_KEY,
    callbackURL: `${BASE_URL}/api/auth/google/callback`,
    passReqCallback: true,
    scope: ['profile', 'email'],
}

const googleCallback = async (
    req,
    accessToken,
    refreshToken,
    profile,
    done
) => {
    try {
        const { email, displayName } = profile
        const user = User.findOne({ email })
        if (user) {
            done(null, user)
        }
        const password = nanoid()
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            email,
            name: displayName,
            password: hashPassword,
            city: 'Write your city',
            phone: '30000000000',
        })
        done(null, newUser)
    } catch (error) {
        done(error, false)
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback)

passport.use('google', googleStrategy)

module.exports = passport
