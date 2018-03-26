'use strict'
/**
 * This function checkedForm(form) purpose
 * is to check and deal with empty fields.
 * if it's empty the user will get a massage
 * to enter the right input
 */
function checkedForm(form){
    var isOk=true;
    var errorsMess=document.getElementsByClassName("missingFormInput");
    var formHeight=document.getElementsByClassName("contactUs");
    var screenHeightFirst=document.getElementsByClassName("background")[0].clientHeight;
    //In the case the name is empty
    if (form.uName.value==""){
        errorsMess[0].style.display="block";
        errorsMess[0].innerHTML="Please enter your name";
        isOk=false;
    }else{
        errorsMess[0].style.display="none";
    }
    //In the case the email is empty
    if (form.uEmail.value==""){
        errorsMess[1].style.display="block";
        errorsMess[1].innerHTML="Please enter your email";
        isOk=false;
    }else{
        errorsMess[1].style.display="none";
    }
    //In the case the subject is empty
    if (form.subj.value==""){
        errorsMess[2].style.display="block";
        errorsMess[2].innerHTML="Please choose a subject";
        isOk=false;
    }else{
        errorsMess[2].style.display="none";
    }
    var screenHeightFirstAfter=document.getElementsByClassName("background")[0].clientHeight;
    //Adjustments to the screen size
    if (screenHeightFirstAfter > screenHeightFirst){
        document.getElementsByClassName("background")[0].style.height="unset";
    }else{
        document.getElementsByClassName("background")[0].style.height="100vh";
    }
    return isOk;
}