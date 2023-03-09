const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const searchByKeyWord = async (req, res, next) => {
    const keyword = req.query.keyword
    try {
        const result = await Notice.find({
            title: { $regex: keyword.toLowerCase(), $options: 'i' },
        }).populate('owner', 'name email phone')
        const countNotices = result.length ?? 0
        if (!result) {
            next(HttpError(404))
        } else {
            res.json({ countNotices, result })
        }
    } catch (error) {
        next(HttpError(404, error.message))
    }
}

module.exports = searchByKeyWord
