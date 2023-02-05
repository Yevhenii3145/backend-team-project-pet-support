const path = require('path')
const fs = require('fs/promises')
const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../', 'public')

const deleteNoticeById = async (req, res) => {
    const { noticeId } = req.params
    const { _id: owner } = req.user
    const deletedNotice = await Notice.findOneAndDelete({
        _id: noticeId,
        owner,
    })
    const FileName = deletedNotice.image
    const pathImage = path.join(avatarsDir, FileName)
    await fs.unlink(pathImage)
    if (!deletedNotice) {
        throw HttpError(404)
    }
    res.json(deletedNotice)
}

module.exports = deleteNoticeById
