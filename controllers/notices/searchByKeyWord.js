const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const searchByKeyWord = async (req, res, next) => {
    const { keyword, page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    try {
        const result = await Notice.find(
            {
                title: { $regex: keyword.toLowerCase(), $options: 'i' },
            },
            '',
            {
                skip,
                limit,
            }
        ).populate('owner', 'name email phone')
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
