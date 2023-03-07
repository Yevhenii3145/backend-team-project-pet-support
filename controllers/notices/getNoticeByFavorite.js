const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const getNoticeByFavorite = async (req, res, next) => {
    const { favoriteNotices } = req.user
    try {
        const unsortedNotices = await Notice.find({
            _id: favoriteNotices,
        }).populate('owner', 'name email phone')
        const countNotices = await Notice.find({
            _id: favoriteNotices,
        }).length
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

module.exports = getNoticeByFavorite
