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
console.log('Server Running')

const io = require('socket.io')(server,{})
var SOCKET_LIST = []

io.sockets.on('connection', socket => {
    socket.id = Math.random()
    socket.x = 0
    socket.y = 0
    socket.number = "" + Math.floor(10 * Math.random())
    SOCKET_LIST[socket.id] = socket

    socket.on('disconnect', () => {
        delete SOCKET_LIST[socket.id]
    })
})

setInterval(() => {
    let pack = []
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.x++
        socket.y++
        pack.push({
            x: socket.x,
            y: socket.y,
            number: socket.number,
        })
    }
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.emit('newPosition', pack)
    }
}, 1000/25)