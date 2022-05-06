const io = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on('test', () =>{
    console.log("we are connected");
})


const getDataFromServer = () => {
    return ([
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
    ])
}