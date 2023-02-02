const { User } = require('../../models/userModel')
const path = require('path')
const fs = require('fs/promises')
const { upload } = require('../../middlewares')

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateUserData = async (req, res) => {
    // const { _id } = req.user
    // const query = req.query

    // const key = Object.keys(query)[0]

    // const { path: tempUpload, originalname } = req.file

    // await User.findByIdAndUpdate(_id, { token: '' })
    // const filename = `${_id}_${originalname}`
    // const resultUpload = path.join(avatarDir, filename)
    // await fs.rename(tempUpload, resultUpload)
    // const avatarURL = path.join('avatars', filename)
    // await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
        message: 'Well done!',
    })
}

module.exports = updateUserData

// upload.single('avatar')

// const updateUserData = async (req, res) => {
//     const { path: tempUpload, originalname } = req.file
//     const { _id } = req.user
//     const filename = `${_id}_${originalname}`
//     const resultUpload = path.join(avatarDir, filename)
//     await fs.rename(tempUpload, resultUpload)
//     const avatarURL = path.join('avatars', filename)
//     await User.findByIdAndUpdate(_id, { avatarURL })

//     res.json({
//         avatarURL,
//     })
// }

// module.exports = updateUserData

// const obj = {
//     avatar: 'value',
// }
// const key = Object.keys(obj)[0]

// const value = obj[key]

// console.log(value)
