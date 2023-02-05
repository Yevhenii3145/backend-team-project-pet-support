const express = require('express')
const ctrl = require('../../controllers/notices')
const { upload } = require('../../middlewares')

const router = express.Router()

router.get('/:categoryName', ctrl.getNoticesByCategories)
router.get('/notice/:noticeId', ctrl.getNoticeById)
router.patch("/favorites/:noticeId",
  // authenticate,
    ctrl.updateFavorite);
router.get("/favorite",
    // authenticate,
    ctrl.getNoticeByFavorite);
router.post(
    '/notice',
    // authenticate,
    upload.single('petImage'),
    ctrl.addNoticeByCategory
    )
router.get("/own",
    // authenticate,
    ctrl.getUserNotices);
router.delete(
    '/:noticeId',
    // authenticate,
    ctrl.deleteNoticeById
)
router.get('/search', ctrl.searchByKeyWord)

module.exports = router
