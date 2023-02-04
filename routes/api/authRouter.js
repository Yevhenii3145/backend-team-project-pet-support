const express = require('express')

const ctrl = require('../../controllers/auth')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

const { validateBody, upload } = require('../../middlewares')

const { schemas } = require('../../models/userModel')

router.post(
    '/register',
    validateBody(schemas.registerSchema),
    ctrlWrapper(ctrl.register)
)

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify))

router.post(
    '/login',
    validateBody(schemas.loginSchema),
    ctrlWrapper(ctrl.login)
)

router.post('/logout', ctrl.authentification, ctrlWrapper(ctrl.logout))

router.post(
    '/verify',
    validateBody(schemas.loginSchema),
    ctrlWrapper(ctrl.resendVerifyEmail)
)

router.patch('/update', ctrl.authentification, ctrlWrapper(ctrl.updateUserData))

router.patch(
    '/update/avatar',
    ctrl.authentification,
    upload.single('avatar'),
    ctrlWrapper(ctrl.updateUserAvatar)
)

module.exports = router
