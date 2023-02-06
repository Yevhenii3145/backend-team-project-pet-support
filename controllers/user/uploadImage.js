const path = require('path')
const DatauriParser = require('datauri/parser')
const parser = new DatauriParser()
const cloudinary = require('cloudinary').v2

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
    cloud_name: 'dndoidgc0',
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
})

const formatBufferTo64 = (file) =>
    parser.format(path.extname(file.originalname).toString(), file.buffer)

const cloudinaryUpload = (file) => cloudinary.uploader.upload(file)

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('Image is not presented!')
        }
        const file64 = formatBufferTo64(req.file)
        const uploadResult = await cloudinaryUpload(file64.content)

        return res.json({
            cloudinaryId: uploadResult.public_id,
            url: uploadResult.secure_url,
        })
    } catch (e) {
        return res.status(422).send({ message: e.message })
    }
}

module.exports = uploadImage

// import { useState } from 'react'
// import { useMutate } from 'restful-react'
// import { PageTitle } from 'components/shared'

// const Upload = () => {
//     const [selectedImage, setSelectedImage] = useState()
//     const { mutate: uploadImage } = useMutate({
//         verb: 'POST',
//         path: 'image-upload',
//     })

//     const handleChange = (event) => {
//         setSelectedImage(event.target.files[0])
//     }

//     const handleImageUpload = () => {
//         if (!selectedImage) {
//             return
//         }
//         const formData = new FormData()
//         formData.append('image', selectedImage)

//         uploadImage(formData)
//             .then((uploadedImage) => {
//                 console.log(uploadedImage)
//             })
//             .catch((_) => {
//                 console.log('Oooops, something went wrong!')
//             })
//     }

//     return (
//         <>
//             <PageTitle text="Upload Image" />
//             <input
//                 onChange={handleChange}
//                 accept=".jpg, .png, .jpeg"
//                 className="fileInput mb-2"
//                 type="file"
//             ></input>
//             <div>
//                 <button
//                     onClick={handleImageUpload}
//                     disabled={!selectedImage}
//                     className="btn btn-primary mb-2"
//                 >
//                     Upload
//                 </button>
//             </div>
//         </>
//     )
// }
