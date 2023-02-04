const { Pet } = require('../../models/petModel')

const { HttpError } = require('../../helpers')

const getUserPets = async (req, res, next) => {
    const { userId: owner } = req.params
    const result = await Pet.find(
        { owner },
        'name birthday breed comments image'
    )

    if (!result) {
        next(HttpError(404))
    }

    res.json(result)
}

module.exports = getUserPets
