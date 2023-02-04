const express = require('express')

const ctrl = require('../../controllers/user')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

const { validateBody, upload } = require('../../middlewares')

const { schemasPet } = require('../../models/petModel')

router.get('/current', ctrl.authentification, ctrlWrapper(ctrl.getCurrent))

router.get(
    '/:userId/pets',
    ctrl.authentification,
    ctrlWrapper(ctrl.getUserPets)
)

router.post(
    '/addPet',
    ctrl.authentification,
    upload.single('image'),
    validateBody(schemasPet.addPetSchema),
    ctrlWrapper(ctrl.addUserPet)
)

router.delete('/:petId', ctrl.authentification, ctrlWrapper(ctrl.deleteUserPet))

module.exports = router
