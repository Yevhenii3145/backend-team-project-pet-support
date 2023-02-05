const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const { User } = require('../../models/userModel')

const google = async (req, res) => {
    const { _id: id } = req.user
    const payload = {
        id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
    await User.findByIdAndUpdate(id, { token })

    res.redirect(
        `http://localhost:3000/team-project-pet-support?usertoken=${token}`
    )
}

module.exports = google
