// Import the mongoose module
const mongoose = require('mongoose')

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
mongoose.set('strictQuery', false);

// Subscrie to log in case of Mongo DB connection error
mongoose.connection.on('error', err => {
    console.log('Mongo DB connection error', err)
})

mongoose.connection.once('open', () => {
    console.log('Coonecting to MongoDB ', mongoose.connection.name)
})

// Define the database URL to connect to.
mongoose.connect('mongodb://127.0.0.1:27017/nodepop')

module.exports = mongoose.connection