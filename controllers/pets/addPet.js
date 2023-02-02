const path = require('path')
const fs = require('fs/promises')
const { HttpError, resize } = require('../../helpers')
const { Pet } = require('../../models/petModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const addPet = async (req, res) => {
    // const {_id: owner} = req.user;
    if (!req.file) {
        throw HttpError(400, 'Avatar is required')
    }
    const { path: tempUpload, originalname } = req.file
    // const FileName = `${owner}_${originalname}`;
    const FileName = `${originalname}`
    const resultUpload = path.join(avatarsDir, FileName)

    await resize(tempUpload, resultUpload)

    fs.unlink(req.file.path)
    const avatarURL = path.join('avatars', FileName)
    console.log(avatarURL)


    const newPet = await Pet.create({
        ...req.body,
        petAvatar: avatarURL,
        // owner,
    })

    res.status(201).json({
        message: 'success',
        newPet,
    })
}

module.exports = addPet
