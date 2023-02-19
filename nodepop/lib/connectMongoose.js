const mongoose = require('mongoose')

mongoose.connection.on('error', err => {
    console.log('Error de conexión', err)
})

mongoose.connection.once('open', () => {
    console.log('Connectado a MongoDB en', mongoose.connection.name)
})

mongoose.connect('mongodb://localhost:27017')

module.exports = mongoose.connection