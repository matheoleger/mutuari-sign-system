const path = require('path')
const { app, BrowserWindow } = require('electron');
require("./src/js/server_communication.js")
// const io = require("socket.io-client");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavascript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'electron/preload.js')
        },
        icon: "public/img/logo.png"
    })

    win.setBackgroundColor("#FFF5F8");
    win.maximize();    
    win.loadFile('src/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// const socket = io("http://localhost:3000");

// socket.on('test', () =>{
//     console.log("we are connected");
// })
