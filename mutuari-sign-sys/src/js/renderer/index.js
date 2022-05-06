// const { ipcRenderer } = require('electron')
// const serverCommunicator = require("../server_communication.js")

const userSelect = document.querySelector("#user-select")
const borrowSelect = document.querySelector("#borrow-select");

let dataForSelect;

let currentUsersList;
let currentBorrowList;

let currentUserID = -1;
let currentForm = "emprunter";



// dataForSelect = ipcRenderer.sendSync('getDataFromServer'); //Envoie une demande pour récupérer les données.
dataForSelect = window.electronAPI.getDataFromServer(); //Envoie une demande pour récupérer les données vers le preload.js.

const setRightData = (newChosenForm) => {
    if(newChosenForm == "emprunter") {
        //Filtre sur tous les utilisateurs ayant des emprunts en attente
        currentUsersList = dataForSelect.filter((data) => {
            //On cherche dans la liste d'emprunt d'un utilisateur, s'il existe au moins 1 emprunt en attente
            if(data.borrowsList.find(borrow => borrow.isBorrowed == false) != undefined) {
                return true;
            } else {
                return false;
            }
        });      
    } else if(newChosenForm == "retourner") {
        //Filtre sur tous les utilisateurs ayant des retours en attente
        currentUsersList = dataForSelect.filter((data) => {
            //On cherche dans la liste d'emprunt d'un utilisateur, s'il existe au moins 1 retour en attente
            if(data.borrowsList.find(borrow => borrow.isBorrowed == true && borrow.isReturned == false) != undefined) {
                return true;
            } else {
                return false;
            }
        });
    }

    const actualUser = currentUsersList.find(user => user.userID == currentUserID);

    currentBorrowList = (actualUser != undefined) ? actualUser.borrowsList : [];
}

const setBorrowsInSelect = () => {
    // const selectUsers = document.querySelector("#user-select");
    const selectBorrows = document.querySelector("#borrow-select");

    //Enlever toutes les options
    let lastOpt = selectBorrows.lastElementChild; 
    while (lastOpt) {
        selectBorrows.removeChild(lastOpt);
        lastOpt = selectBorrows.lastElementChild;
    }

    //Mettre la valeur par défaut
    selectBorrows.options[selectBorrows.options.length] = new Option("🎥Liste d'objet", -1)

    currentBorrowList.forEach(el => {
        selectBorrows.options[selectBorrows.options.length] = new Option(el.materialName, el.borrowID);
    })
}

const setUsersInSelect = () => {
    //Récupérer l'élément select des utilisateurs.
    const selectUsers = document.querySelector("#user-select");

    //Enlever toutes les options
    let lastOpt = selectUsers.lastElementChild; 
    while (lastOpt) {
        selectUsers.removeChild(lastOpt);
        lastOpt = selectUsers.lastElementChild;
    }

    //Mettre la valeur par défaut
    selectUsers.options[selectUsers.options.length] = new Option("Prénom et Nom", -1)

    currentUsersList.forEach(el => {
        selectUsers.options[selectUsers.options.length] = new Option(`${el.firstName} ${el.lastName}`, el.userID);
    });
}

//Initialisation de l'application
const initiateApplication = () => {
    setRightData(currentForm);
    setUsersInSelect();
}

//EventListener
userSelect.onclick = () => {
    // console.log(ipcRenderer.sendSync("test"));
    // console.log(window.electronAPI.getDataFromServer())
    dataForSelect = window.electronAPI.getDataFromServer();
    console.log("je clique la");
    setRightData(currentForm);
    setUsersInSelect();

    //On redéfinit la valeur du select à celle actuellement choisi par l'utilisateur 
    //on doit faire ça car on rechange les valeurs du select à chaque clique sur le select...)
    userSelect.value = currentUserID;
}

userSelect.onchange = () => {
    currentUserID = userSelect.value;
    console.log(currentUserID);
    setRightData(currentForm);
    setBorrowsInSelect();
}


//Initialisation de l'application
initiateApplication();