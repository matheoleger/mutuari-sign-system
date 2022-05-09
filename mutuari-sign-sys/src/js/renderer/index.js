// const { ipcRenderer } = require('electron')
// const serverCommunicator = require("../server_communication.js")

const userSelect = document.querySelector("#user-select")
const borrowSelect = document.querySelector("#borrow-select");
const validateButton = document.querySelector("#validate");


let dataForSelect;

let currentUsersList;
let currentBorrowList;

let currentUserID = -1;
let currentForm = "emprunter";

const setData = (data) => {
    let finalData = [];

    data.users.forEach(user => {

        let borrowForUser = data.borrows.filter(borrow => {
            return borrow.userID == user.id;
        })

        let obj = {
            userID: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            borrowsList: borrowForUser
        }

        finalData.push(obj);
    })

    console.log(finalData);

    return finalData;
}


// dataForSelect = ipcRenderer.sendSync('getDataFromServer'); //Envoie une demande pour récupérer les données.
dataForSelect = setData(window.electronAPI.getDataFromServer()); //Envoie une demande pour récupérer les données vers le preload.js.

const setRightData = () => {

    if(currentForm == "emprunter") {
        //Filtre sur tous les utilisateurs ayant des emprunts en attente
        currentUsersList = dataForSelect.filter((data) => {
            //On cherche dans la liste d'emprunt d'un utilisateur, s'il existe au moins 1 emprunt en attente
            if(data.borrowsList.find(borrow => borrow.isBorrowed == false) != undefined) {
                return true;
            } else {
                return false;
            }
        }); 

        const actualUser = currentUsersList.find(user => user.userID == currentUserID);
        
        if(actualUser != undefined) {
            currentBorrowList = actualUser.borrowsList.filter((borrow) => borrow.isBorrowed == false)
    
        } else {
            currentBorrowList = [];
        }

    } else if(currentForm == "retourner") {
        //Filtre sur tous les utilisateurs ayant des retours en attente
        currentUsersList = dataForSelect.filter((data) => {
            //On cherche dans la liste d'emprunt d'un utilisateur, s'il existe au moins 1 retour en attente
            if(data.borrowsList.find(borrow => borrow.isBorrowed == true && borrow.isReturned == false) != undefined) {
                return true;
            } else {
                return false;
            }
        });

        const actualUser = currentUsersList.find(user => user.userID == currentUserID);

        if(actualUser != undefined) {
            currentBorrowList = actualUser.borrowsList.filter((borrow) => borrow.isBorrowed == true && borrow.isReturned == false)
    
        } else {
            currentBorrowList = [];
        }
    }

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
        selectBorrows.options[selectBorrows.options.length] = new Option(el.materialName, el.id);
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
    setRightData();
    setUsersInSelect();
}

/* EventListeners */

userSelect.onclick = () => {
    // console.log(ipcRenderer.sendSync("test"));
    // console.log(window.electronAPI.getDataFromServer())

    dataForSelect = setData(window.electronAPI.getDataFromServer());
    console.log("je clique la");
    setRightData();
    setUsersInSelect();


    //On redéfinit la valeur du select à celle actuellement choisi par l'utilisateur 
    //on doit faire ça car on rechange les valeurs du select à chaque clique sur le select...)
    userSelect.value = currentUserID;
}

userSelect.onchange = () => {
    currentUserID = userSelect.value;
    console.log(currentUserID);
    setRightData();
    setBorrowsInSelect();
}

document.querySelectorAll(".borrow-state-element").forEach(element => {
    element.onclick = () => {
        //On enlève à l'élément actuel la classe "selected-menu" et on le met sur le nouvel élément.
        document.querySelector(".selected-menu").classList.remove("selected-menu");
        element.classList.add("selected-menu");
        currentForm = element.dataset.value;
        setRightData();
        setBorrowsInSelect();
        console.log(currentForm, "tamerelagrossepute");
    }
});

validateButton.onclick = () => {
    //Envoie la signature vers l'API qui va elle renvoyer au serveur
    let dataToSend = {
        userID: userSelect.value,
        borrow: dataForSelect.find(user => user.userID == userSelect.value).borrowsList.find(borrow => borrow.id == borrowSelect.value),
        signature: canvas.toDataURL()
    };

    window.electronAPI.sendSignatureData(dataToSend);

    //Réinitialiser les valeurs
    clearDrawing();
    dataForSelect = setData(window.electronAPI.getDataFromServer());
    currentUserID = -1;
    setRightData();
    setUsersInSelect();
    setBorrowsInSelect();
}

/* Initialisation de l'application */
initiateApplication();