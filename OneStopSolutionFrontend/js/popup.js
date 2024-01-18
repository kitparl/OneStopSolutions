let popDiv = document.getElementById("popup1");
let popText = document.getElementById("popAlert");

function visiblePOP(){
    popDiv.style.visibility = "visible";
    popDiv.style.opacity = "1";
}

// close popUp
let close_popUp = document.getElementById("close");
close_popUp.addEventListener("click", backPage)
function backPage(){
    // window.history.go(-1);
    popDiv.style.visibility = "hidden";
    popDiv.style.opacity = "0";
}

goToLogin = () => {
    // console.log(12)
    window.location.href="./login.html"
}