// Require express library
var express = require('express');

var app = express();

var http = require('http');

var server = http.createServer(app);

var Socket_IO = require('socket.io');

// Start listening for incoming connections
app.listen(5000, function () {
    console.log('Started server at http://localhost:8888');
});
var io = Socket_IO.listen(8000);

app.use(express.static(__dirname + '/public'));

// Else, send to the index
app.use('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var users = new Object();

io.on('connection', function (socket) {
    console.log('SERVER: connected to new client');

    var socketid = socket.id;
    console.log(socketid);
    var username = 'Guest';
    console.log(username);

    users[socketid] = {username: username};

    console.log('SERVER: new username: ' + users[socketid]['username']);

    socket.broadcast.emit("newclient", "A new client has connected: " + users[socketid]['username']);

    socket.on('client_name', function(newname) {

        var oldname = users[socketid]['username'];

        users[socketid]['username'] = newname;

        console.log('SERVER: new username: ' + users[socketid]['username']);

        io.sockets.emit('toclient', {'user': oldname, 'message': 'changed name to ' + users[socketid]['username']})
    })

});