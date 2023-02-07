const { User } = require('../../models/userModel')

const { HttpError } = require('../../helpers')

const { FRONT_URL } = process.env

const verify = async (req, res, next) => {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    if (!user) {
        next(HttpError(400, 'User nоt found or verification already done!'))
    }
    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    })

    res.redirect(`${FRONT_URL}/team-project-pet-support/login`)
}

module.exports = verify
