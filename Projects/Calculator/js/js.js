'use strict';
window.onload=function() {
    var buttons = document.getElementsByClassName("button");
    //Adding event to each button
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", display);
    }
    //Drag element - continer
    dragElement(document.getElementById(("container")));
};

var countOpt=0;

/**
 * This function display() purpose
 * is to deal with the user clicks
 * and send them to input and display functions
 */
function display() {

    var displayCalc = document.getElementById("displayCalc");
    var displayAnswer = document.getElementById("displayAnswer");
    var input=this.value;
    //deals with wrong input
    if (displayAnswer.innerText =="can't calc it"){
        displayAnswer.innerText=0;
        displayCalc.innerText="";
    }
    //Switch case according to the user clicks
    switch (input){
        case "C":
            countOpt=0;
            displayCalc.innerText ="";
            displayAnswer.innerText ="0";
            break;
        case "=":
            countOpt=0;
            displayAnswerCalc(displayCalc ,displayAnswer, input);
            break;
        case "/":
        case "Power":
        case "x":
        case "-":
        case "+":
            countOpt++;
            if (countOpt > 1){
                var split =displayCalc.innerText.split(" ");
                var oldOp=split[split.length-1];
                displayCalc.innerText = changeOpt(displayCalc,oldOp,input);
                break;
            }
            displayCalc.innerText =" " +showInput(displayCalc,displayAnswer,input);
            break;
        default:
            countOpt=0;
            appendMath(displayCalc,displayAnswer,input);
            break;
    }
};

/**
 * This function displayAnswerCalc purpose
 * is to display the answer to the user
 */
function displayAnswerCalc(displayCalc ,displayAnswer ,input){
    var split =displayCalc.innerText.split(" ");
    if (split.length == 1){
        displayAnswer.innerText = displayCalc.innerText;
        return;
    }
    if (split.length<3){
        displayAnswer.innerText="can't calc it";
        return;
    }
    var num1=split[0];
    var num2=split[2];
    var operator=split[1];

    if (num1 == "." || num2 == "." ) {
        displayAnswer.innerText="can't calc it";
        return;
    }
    displayAnswer.innerText=num1+" "+num2;
    switch (operator){
        case "/":
            if (num2=="0"){
                displayAnswer.innerText =  "can't calc it"
                break;
            }
            displayAnswer.innerText =  Number(num1)/Number(num2);
            break;
        case "Power":
            displayAnswer.innerText =  Math.pow(Number(num1),Number(num2));
            break;
        case "x":
            displayAnswer.innerText =  Number(num1)*Number(num2);
            break;
        case "-":
            displayAnswer.innerText =  Number(num1)-Number(num2);
            break;
        case "+":
            displayAnswer.innerText =  Number(num1)+Number(num2);
            break;
    }
    if (input == "="){
        displayCalc.innerText=displayAnswer.innerText;
    }
}

/**
 * This function showInput purpose
 * is to display the input to the user
 */
function showInput(displayCalc ,displayAnswer,input){
    if (displayCalc.innerText == ""){
        return displayAnswer.innerText+ " "+input;

    }
    var split=displayCalc.innerText.split(" ");
    if (split.length ==1) {
        var answer = split[0];
        displayAnswer.innerText = answer;
        return displayCalc.innerText = displayAnswer.innerText + " " + input;
    }
    else{
        if(displayAnswer.innerText== "can't calc it"){
            displayCalc.innerText=displayAnswer.innerText;
        }
        else displayCalc.innerText=displayAnswer.innerText+ " "+input;
        return displayCalc.innerText;
    }

}

/**
 * This function changeOpt purpose
 * is switch the operation in the case changed it
 */
function changeOpt(displayCalc,oldOp,newop){
    return displayCalc.innerText.replace(oldOp,newop);
}

/**
 * This function appendMath purpose
 * is the deal with any number input
 */
function appendMath(displayCalc,displayAnswer,input){
    if (displayCalc.innerText==""){
        displayCalc.innerText +=" " +input;
        displayAnswer.innerText =displayCalc.innerText;

        return;
    }
    var displayCalculation=displayCalc.innerText.split(" ");
    var lastOp=displayCalculation[displayCalculation.length-1];
    if (lastOp == "+" || lastOp == "-" ||  lastOp == "/" || lastOp == "x" || lastOp == "Power"){
        displayCalc.innerText+=" "+input;
        displayAnswerCalc(displayCalc ,displayAnswer);
    }
    else{
        if (displayCalc.innerText == "0" ||displayCalculation[displayCalculation.length-1]=="0" ){
            return;
        }
        displayCalc.innerText +=input;
        displayAnswerCalc(displayCalc ,displayAnswer);
    }
}

///////////////////////////////////////////////////////////////////////////////////////

/**
 * dragElement , dragMouseDown,elementDrag ,closeDragElement
 * functions purpose is to deal with the panel move (by the user)
 */
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("movePanel")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById("movePanel").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
}

function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
