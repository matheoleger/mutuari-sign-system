const { ipcMain } = require('electron')
const io = require("socket.io-client");
const socket = io("http://localhost:3000");

// let dataForSelect = {};

socket.on('connected', () =>{
    console.log("On est connecté avec le serveur");
})

socket.on("data", (data) =>{
    console.log(data);

    //Ecouter s'il y a envoie de "getDataFromServer" du Renderer index.js
    ipcMain.on('getDataFromServer', (event) => {
        event.returnValue = data.temporaryData; //Retourner la valeur au renderer.
    });

})


//envoyer les données de signature au serveur.
ipcMain.on("sendSignatureData", (event, data) => {
    console.log("on a send de la data encore")
    //Envoyer les données au serveur
    socket.emit('getDataFromClient', data);
})