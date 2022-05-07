// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//         const element = document.getElementById(selector)
//         if (element) element.innerText = text
//     }

//     for (const dependency of ['chrome', 'node', 'electron']) {
//         replaceText(`${dependency}-version`, process.versions[dependency])
//     }
// })

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    //Va utilise le système IPC d'electron afin de communiquer avec le "back" (ici server_communication.js)
    getDataFromServer: () => {
        return ipcRenderer.sendSync('getDataFromServer') //demande de récupération des données du serveur
    },
    sendSignatureData: () => {
        ipcRenderer.sendSync('sendSignatureData') //envoie des données de renseignement
    }
}) 