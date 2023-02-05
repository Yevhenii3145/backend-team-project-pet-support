const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const searchByKeyWord = async (req, res) => {
    const { keyword } = req.query
    await Notice.createIndexes({ title: 'text' })
    const result = await Notice.find(
        { $text: { $search: keyword } },
        { score: { $meta: 'textScore' } }
    )
    if (!result) {
        throw HttpError(404)
    }
    res.json({ result })
}

module.exports = searchByKeyWord
