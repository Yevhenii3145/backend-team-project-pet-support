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

router.post(
    '/addImage',
    ctrl.authentification,
    upload.single('image'),
    (req, res) => {
        try {
            if (!req.file) {
                throw new Error('Image is not presented!')
            }

            return res.json({ message: 'Huraaaay' })
        } catch (e) {
            return res.status(422).send({ message: e.message })
        }
    }
)

router.delete('/:petId', ctrl.authentification, ctrlWrapper(ctrl.deleteUserPet))

module.exports = router
