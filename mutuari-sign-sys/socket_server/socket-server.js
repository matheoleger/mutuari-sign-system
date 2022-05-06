const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (client) => { 
    io.emit('test');
    console.log(`Connecté au client ${client.id}`)
});
server.listen(3000, () => {
    console.log("Serveur en écoute sur le port 3000");
});