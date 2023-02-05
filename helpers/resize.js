const Jimp = require('jimp')
const { AUTO } = require('@jimp/types')

async function resize(path, newPath) {
    const image = await Jimp.read(path)
    image.resize(250, AUTO).write(newPath)
}

module.exports = resize
