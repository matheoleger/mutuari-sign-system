let dataForSelect = getDataFromServer();

let currentUsersList;
let currentBorrowList;

const setRightData = (newChosenForm) => {
    if(newChosenForm == "emprunter") {
        currentUsersList = []
        currentBorrowList = []
    } else if(newChosenForm == "retourner") {
        currentUsersList = []
        currentBorrowList = []
    }
}

const setBorrowsInSelect = () => {
    const selectUsers = document.querySelector("#user-select");
    const selectBorrows = document.querySelector("#borrow-select");

    const currentUser = currentUsersList.find(el => el.userID == selectUsers.value);

    currentUser.borrowsList.forEach(el => {
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
    selectUsers.options[selectUsers.options.length] = new Option("Prénom et Nom", null)

    currentUsersList.forEach(el => {
        selectUsers.options[selectUsers.options.length] = new Option(`${el.firstName} ${el.lastName}`, el.userID);
    });
}

//Initialisation de l'application
const initiateApplication = () => {
    currentUsersList = dataForSelect;
    setUsersInSelect();
}

initiateApplication();

