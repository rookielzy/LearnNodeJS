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

const io = require('socket.io')(server,{})

io.sockets.on('connection', socket => {
    console.log('socket connection')

    socket.on('happy', data => {
        console.log('happy together' + data.reason)
    })

    socket.emit('getup', {
        msg: 'Lets play DotA2'
    })
})