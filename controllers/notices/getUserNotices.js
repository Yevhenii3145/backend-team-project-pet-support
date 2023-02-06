const { HttpError } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const getUserNotices = async (req, res, next) => {
    const { _id: owner } = req.user
    const unsortedNotices = await Notice.find({ owner })
    if (!unsortedNotices) {
        next(HttpError(404))
    }
    const notices = [...unsortedNotices].sort(
        (firstNotice, secondNotice) =>
            new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
    )
    res.json(notices)
}

module.exports = getUserNotices
