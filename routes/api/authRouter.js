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

// router.get('/current', ctrl.authenticate, ctrlWrapper(ctrl.getCurrent))

// router.post(
//     '/verify',
//     validateBody(schemas.verifySchema),
//     ctrlWrapper(ctrl.resendVerifyEmail)
// )

// router.patch(
//     '/',
//     ctrl.authenticate,
//     validateBody(schemas.updateSubscriptionSchema),
//     ctrlWrapper(ctrl.updateSubscription)
// )
// router.patch(
//     '/avatars',
//     ctrl.authenticate,
//     upload.single('avatar'),
//     ctrlWrapper(ctrl.updateAvatar)
// )

module.exports = router
