const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { HttpError } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const addNoticeByCategory = async (req, res) => {
    // const {_id: owner} = req.user;
    if (!req.file) {
        throw HttpError(400, 'Avatar is required')
    }
    const { path: tempUpload, originalname } = req.file
    // const FileName = `${owner}_${originalname}`;
    const FileName = `${originalname}`
    const resultUpload = path.join(avatarsDir, FileName)

    await Jimp.read(tempUpload)
        .then((avatar) => {
            return avatar.resize(250, 250).write(tempUpload)
        })
        .catch((err) => {
            console.error(err)
        })

    await fs.rename(tempUpload, resultUpload)
    // await fs.unlink(tempUpload);
    const avatarURL = path.join('avatars', FileName)
    console.log(avatarURL)
    const result = await Notice.create({
        ...req.body,
        avatarURL,
        // owner,
    })

    res.status(201).json({ notice: result })
}

module.exports = addNoticeByCategory
