const path = require('path')
const fs = require('fs/promises')

const { HttpError, cloudinary } = require('../../helpers')
const { Pet } = require('../../models/petModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const addUserPet = async (req, res) => {
    const { _id: owner } = req.user
    if (!req.file) {
        throw HttpError(400, 'Avatar is required')
    }
    const { path: tempUpload, originalname } = req.file
    const filename = `${owner}_ownPet_${originalname}`
    const resultUpload = path.join(avatarsDir, filename)

    await fs.rename(tempUpload, resultUpload)

    let imageURL

    const image = await cloudinary.uploader
        .upload(resultUpload)
        .then((result) => {
            imageURL = result.url
            fs.unlink(resultUpload)
        })

    const newPet = await Pet.create({
        ...req.body,
        image: String(imageURL),
        owner,
    })

    res.json({
        petId: newPet._id,
        name: newPet.name,
        birthday: newPet.birthday,
        breed: newPet.breed,
        comments: newPet.comments,
        image: newPet.image,
    })
}

module.exports = addUserPet
