const { Strategy } = require('passport-google-oauth2')
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

const { User } = require('../../models/userModel')

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET_KEY,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    BASE_URL,
} = process.env

const facebookParams = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${BASE_URL}/api/auth/facebook/callback`,
    scope: ['profile', 'email'],
}

const facebookCallback = async (
    req,
    accessToken,
    refreshToken,
    profile,
    done
) => {
    try {
        const { email, displayName } = profile

        const user = await User.findOne({ email })

        if (user) {
            done(null, user)
        }
        const password = nanoid()
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            name: displayName,
            password: hashPassword,
            city: 'Insert city',
            phone: '380930000000',
            verify: true,
        })

        done(null, newUser)
    } catch (error) {
        done(error, false)
    }
}

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

        const user = await User.findOne({ email })

        if (user) {
            done(null, user)
        }
        const password = nanoid()
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            name: displayName,
            password: hashPassword,
            city: 'Insert city',
            phone: '380930000000',
            verify: true,
        })

        done(null, newUser)
    } catch (error) {
        done(error, false)
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback)
const facebookStrategy = new FacebookStrategy(facebookParams, facebookCallback)

passport.use('google', googleStrategy)
passport.use('facebook', facebookStrategy)

module.exports = passport
