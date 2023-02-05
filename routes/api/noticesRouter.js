const express = require('express')
const ctrl = require('../../controllers/notices')
const ctrlAuth = require('../../controllers/auth')
const { upload } = require('../../middlewares')

const router = express.Router()

router.get('/favorite', ctrlAuth.authentification, ctrl.getNoticeByFavorite)

router.get('/notice/:noticeId', ctrl.getNoticeById)

router.get('/own', ctrlAuth.authentification, ctrl.getUserNotices)

router.get('/search', ctrl.searchByKeyWord)

router.get('/:categoryName', ctrl.getNoticesByCategories)

router.post(
    '/notice',
    ctrlAuth.authentification,
    upload.single('image'),
    ctrl.addNoticeByCategory
)

router.patch(
    '/favorites/:noticeId',
    ctrlAuth.authentification,
    ctrl.updateFavorite
)

router.delete('/:noticeId', ctrlAuth.authentification, ctrl.deleteNoticeById)

module.exports = router
