const express = require('express')

// const { validateBody,  upload } = require('../../midlewares')
const {  upload } = require('../../middlewares')
const { ctrlWrapper } = require('../../helpers')

// const { schemasPet } = require('../../models/petModel')
const { addPet, removePetById } = require('../../controllers/pets')

const router = express.Router()

router.post(
    '/',
    // authenticate,
    upload.single('petAvatar'),
    // validateBody(schemasPet.addPetSchema),
    ctrlWrapper(addPet)
)

router.delete(
  '/:id',
  // authenticate,
  ctrlWrapper(removePetById))

module.exports = router
