const handleMongooseError = require('./handleMongooseError')
const upload = require('./upload')
const authentification = require('./authentification')
const validateBody = require('./validateBody')

module.exports = {
    handleMongooseError,
    upload,
    authentification,
    validateBody,
}
