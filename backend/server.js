require('dotenv').config()

const express = require('express')

// express app
const app = express()

// routes
app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the app!'})
})

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port ', process.env.PORT)
})

