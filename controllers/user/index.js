const authentification = require('./authentification')
const getCurrent = require('./getCurrent')
const addUserPet = require('./addUserPet')
const getUserPets = require('./getUserPets')
const deleteUserPet = require('./deleteUserPet')
const uploadImage = require('./uploadImage')

module.exports = {
    authentification,
    getCurrent,
    addUserPet,
    getUserPets,
    deleteUserPet,
    uploadImage,
}
