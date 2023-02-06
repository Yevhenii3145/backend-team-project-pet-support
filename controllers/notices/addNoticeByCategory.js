const path = require('path')
const fs = require('fs/promises')
const { HttpError, cloudinary } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const addNoticeByCategory = async (req, res, next) => {
    const { _id: owner } = req.user
    if (!req.file) {
        next(HttpError(400, 'Avatar is required'))
    }
    const { path: tempUpload, originalname } = req.file
    const FileName = `${owner}_pet_${originalname}`
    const resultUpload = path.join(avatarsDir, FileName)

    await fs.rename(tempUpload, resultUpload)

    let imageURL

    try {
        await cloudinary.uploader.upload(resultUpload).then((result) => {
            imageURL = result.url
            fs.unlink(resultUpload)
        })
    } catch (error) {
        fs.unlink(resultUpload)
        next(HttpError(403, error.message))
    }

    const result = await Notice.create({
        ...req.body,
        image: String(imageURL),
        owner,
    })

    res.json(result)
}

module.exports = addNoticeByCategory
