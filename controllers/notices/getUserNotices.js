const { HttpError } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const getUserNotices = async (req, res, next) => {
    const { _id: owner } = req.user
    try {
        const unsortedNotices = await Notice.find({ owner }).populate(
            'owner',
            'name email phone'
        )
        const countNotices = (await Notice.find({ owner }).length) ?? 0
        if (!unsortedNotices) {
            next(HttpError(404))
        } else {
            const notices = [...unsortedNotices].sort(
                (firstNotice, secondNotice) =>
                    new Date(secondNotice.createdAt) -
                    new Date(firstNotice.createdAt)
            )
            res.json({ countNotices, notices })
        }
    } catch (error) {
        next(HttpError(404, error.message))
    }
}

module.exports = getUserNotices
