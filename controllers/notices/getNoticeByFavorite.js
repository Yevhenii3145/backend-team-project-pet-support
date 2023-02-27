const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const getNoticeByFavorite = async (req, res, next) => {
    const { favoriteNotices } = req.user
    const unsortedNotices = await Notice.find({
        _id: favoriteNotices,
    }).populate('owner', 'name email phone')
    if (!unsortedNotices) {
        next(HttpError(404))
    }
    const notices = [...unsortedNotices].sort(
        (firstNotice, secondNotice) =>
            new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
    )
    res.json(notices)
}

module.exports = getNoticeByFavorite
