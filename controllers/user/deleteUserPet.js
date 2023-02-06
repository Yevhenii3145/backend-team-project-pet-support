const { Pet } = require('../../models/petModel')
const { HttpError } = require('../../helpers')

const deleteUserPet = async (req, res, next) => {
    const status = await Pet.findByIdAndRemove(req.params.petId)
    if (!status) {
        next(HttpError(404))
    }
    return res.json({ message: 'Successful delete' })
}

module.exports = deleteUserPet
