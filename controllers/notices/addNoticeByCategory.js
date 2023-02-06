const path = require('path')
const fs = require('fs/promises')
const { HttpError, cloudinary } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const addNoticeByCategory = async (req, res) => {
    const { _id: owner } = req.user
    if (!req.file) {
        throw HttpError(400, 'Avatar is required')
    }
    const { path: tempUpload, originalname } = req.file
    const FileName = `${owner}_pet_${originalname}`
    const resultUpload = path.join(avatarsDir, FileName)

    await fs.rename(tempUpload, resultUpload)

    let imageURL

    const image = await cloudinary.uploader
        .upload(resultUpload)
        .then((result) => {
            imageURL = result.url
            fs.unlink(resultUpload)
        })

    // await resize(resultUpload, resultUpload)
    // const avatarURL = path.join('avatars', FileName)
    const result = await Notice.create({
        ...req.body,
        image: String(imageURL),
        owner,
    })

    res.json(result)
}

module.exports = addNoticeByCategory
