const express = require('express')
const app = express()
const server = require('http').Server(app)

app.get('/', (req, res) => {
    // Transfers the file at the given path.
    // Sets the Content-Type response HTTP header field based on the filename's extension.
    // Unless the root option is set in the options object, path must be an absolute path to the file.
    res.sendFile(__dirname + '/client/index.html')
})

app.use('/client', express.static(__dirname + '/client'))

server.listen(2000)