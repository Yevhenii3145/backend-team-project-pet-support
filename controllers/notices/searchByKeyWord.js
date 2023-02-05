const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const searchByKeyWord = async (req, res) => {
    const keyword = req.query.keyword
    const result = await Notice.find({ title: { $regex: keyword } })
    if (!result) {
        throw HttpError(404)
    }
    res.json({ result })
}

module.exports = searchByKeyWord
