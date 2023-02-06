const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

require('dotenv').config()

const authRouter = require('./routes/api/authRouter')
const userRouter = require('./routes/api/userRouter')
const noticesRouter = require('./routes/api/noticesRouter')
// const newsRouter = require('./routes/api/newsRouter')
// const sponsorsRouter = require('./routes/api/sponsorsRouter')
// const petsRouter = require('./routes/api/petsRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/auth', authRouter)
app.use('/api/notices', noticesRouter)
app.use('/api/users', userRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err
    res.status(status).json({ message })
})

module.exports = app

// const uploadImage = async(event) =>{
// const file = event.target.files[0];
// const base64 = await convertBase64(file);
// setLoading(true);
// axios.post("http://localhost:4001/uploadImage", {image: base64}).then((res) =>{ setUrl(res.data);
// alert("Image uploaded"}).catch(....)

// const convertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader()
//         fileReader.readAsDataURL(file)
//         fileReader.onload = () => {
//             resolve(fileReader.result)
//         }
//         fileReader.onerror = (error) => {
//             reject(error)
//         }
//     })
// }
