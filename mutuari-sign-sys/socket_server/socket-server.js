const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const temporaryData = [
    {
        userID: 0,
        firstName: "John", 
        lastName: "Bibi", 
        borrowsList: [
            {borrowID: 0, materialName: "Appareil photo Nikon", isBorrowed: false, isReturned: false},
            {borrowID: 1, materialName: "Caméra Sony", isBorrowed: true, isReturned: false},
            {borrowID: 2, materialName: "Trépied", isBorrowed: true, isReturned: false},
        ] 
    },
    {
        userID: 1,
        firstName: "Béatrice", 
        lastName: "Sicle", 
        borrowsList: [
            {borrowID: 3, materialName: "Appareil photo Sony", isBorrowed: true, isReturned: false},
            {borrowID: 4, materialName: "Microphone Bird UM1", isBorrowed: false, isReturned: false},
            {borrowID: 5, materialName: "Perche", isBorrowed: false, isReturned: false},
        ] 
    },
]

io.on('connection', (client) => { 
    io.emit('test');
    console.log(`Connecté au client ${client.id}`)

    io.emit("data", {temporaryData}); //Envoyer le tableau de données.

    io.on("getDataFromClient", (data) => {
        console.log(data)
    })
});

server.listen(3000, () => {
    console.log("Serveur en écoute sur le port 3000");
});