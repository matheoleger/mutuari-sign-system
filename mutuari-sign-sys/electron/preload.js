const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    //Va utilise le système IPC d'electron afin de communiquer avec le "back" (ici server_communication.js)
    getDataFromServer: () => {
        return ipcRenderer.sendSync('getDataFromServer') //demande de récupération des données du serveur
    },
    getDataFromServerReply: () => {
        ipcRenderer.on('getDataFromServerReply', (event, data) => {
            console.log("je recois les données");
            return data;
        })
    },
    sendSignatureData: (data) => {
        console.log(data)
        ipcRenderer.send('sendSignatureData', data) //envoie des données de renseignement
    }
}) 