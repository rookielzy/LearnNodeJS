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

var SOCKET_LIST = {}
var PLAER_LSIT = {}

var Player = function(id) {
    let self = {
        id: id,
        x: 250,
        y: 250,
        number: "" + Math.floor(10 * Math.random()),
        pressingRight: false,
        pressingLeft: false,
        pressingUp: false,
        pressingDown: false,
        maxSpd: 10,
    }
    self.updatePosition = function() {
        if (self.pressingRight) {
            self.x += self.maxSpd
        }
        if (self.pressingLeft) {
            self.x -= self.maxSpd            
        }
        if (self.pressingUp) {
            self.y -= self.maxSpd
        }
        if (self.pressingDown) {
            self.y += self.maxSpd
        }
    }
    return self
}

const io = require('socket.io')(server,{})
io.sockets.on('connection', socket => {
    socket.id = Math.random()
    SOCKET_LIST[socket.id] = socket
    
    let player = Player(socket.io)
    PLAER_LSIT[socket.id] = player

    socket.on('disconnect', () => {
        delete SOCKET_LIST[socket.id]
        delete PLAER_LSIT[socket.id]
    })

    socket.on('keyPress', data => {
        if (data.inputId === 'left') {
            player.pressingLeft = data.state
        } else if (data.inputId === 'right') {
            player.pressingRight = data.state
        } else if (data.inputId === 'up') {
            player.pressingUp = data.state
        } else if (data.inputId === 'down') {
            player.pressingDown = data.state
        }
    })


})

setInterval(() => {
    let pack = []
    for (let i in PLAER_LSIT) {
        let player = PLAER_LSIT[i]
        player.updatePosition()
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number,
        })
    }
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.emit('newPosition', pack)
    }
}, 1000/25)