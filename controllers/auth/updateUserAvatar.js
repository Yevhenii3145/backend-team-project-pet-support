const { User } = require('../../models/userModel')
const path = require('path')
const fs = require('fs/promises')
const { cloudinary } = require('../../helpers')

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file
    const { _id } = req.user
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarDir, filename)

    await fs.rename(tempUpload, resultUpload)

    let imageURL

    const image = await cloudinary.uploader
        .upload(resultUpload)
        .then((result) => {
            imageURL = result.url
            fs.unlink(resultUpload)
        })

    // await resize(resultUpload, resultUpload)
    // const avatarURL = path.join('avatars', filename)

    await User.findByIdAndUpdate(_id, { avatarURL: String(imageURL) })

    res.json({
        avatarURL: User.avatarURL,
    })
}

module.exports = updateAvatar
