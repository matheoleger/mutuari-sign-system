const { ipcMain } = require('electron')
const io = require("socket.io-client");
const socket = io("http://localhost:3000");

// let dataForSelect = {};

socket.on('test', () =>{
    console.log("we are connected");
})

socket.on("data", (data) =>{
    console.log(data);
    // console.log(data[0].firstName);
    // console.log(data[0].borrowsList[0].materialName);

    //Ecouter s'il y a envoie de "getDataFromServer" du Renderer index.js
    ipcMain.on('getDataFromServer', (event) => {
        event.returnValue = data.temporaryData; //Retourner la valeur au renderer.
    });

})

//envoyer les données de signature au serveur.
ipcMain.on("sendSignatureData", (event, data) => {
    socket.emit('getDataFromClient', data);
})