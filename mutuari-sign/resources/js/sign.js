const canvas = document.querySelector('#signature-canvas');
const context = canvas.getContext('2d');


let isDrawing = false;

const startDrawing = () => {
    isDrawing = true;
}

const endDrawing = () => {
    isDrawing = false;
    context.beginPath();
}

const clearDrawing = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const draw = (e) => {

    //Va permettre de mettre la valeur de la position du trait parfaitement en dessous du curseur
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height; 


    if(isDrawing) {
        context.lineWidth = 5;
        context.lineCap = "round";

        context.lineTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
        context.stroke();
        context.beginPath();
        context.moveTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    }
}


canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mousemove", draw);