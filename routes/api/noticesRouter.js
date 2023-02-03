const express = require('express')
const ctrl = require('../../controllers/notices')
const { upload } = require('../../middlewares')

const router = express.Router()

// router.get("/own",
//   // authenticate,
//   ctrl.getUserNotices);
// router.get("/favorite",
//   // authenticate,
//   ctrl.getNoticeByFavorite);
router.get('/notice/:noticeId', ctrl.getNoticeById)
router.get('/:categoryName', ctrl.getNoticesByCategories)
router.post(
    '/notice',
    // authenticate,
    upload.single('petImage'),
    ctrl.addNoticeByCategory
)
// router.patch("/:noticeId",
//   // authenticate,
//   ctrl.updateFavorite);
router.delete(
    '/:noticeId',
    // authenticate,
    ctrl.deleteNoticeById
)

router.get('/search', ctrl.searchByKeyWord)

module.exports = router
