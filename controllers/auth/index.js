const register = require('./register')
const verify = require('./verify')
const login = require('./login')
const logout = require('./logout')
const authentification = require('./authentification')
const resendVerifyEmail = require('./resendVerifyEmail')
const updateUserData = require('./updateUserData')

module.exports = {
    register,
    verify,
    login,
    logout,
    authentification,
    resendVerifyEmail,
    updateUserData,
}
