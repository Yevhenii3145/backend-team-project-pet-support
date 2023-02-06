const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const searchByKeyWord = async (req, res, next) => {
    const keyword = req.query.keyword
    const result = await Notice.find({ title: { $regex: keyword } })
    if (!result) {
        next(HttpError(404))
    }
    res.json(result)
}

module.exports = searchByKeyWord
