const alert = document.getElementById("alertArea");
const alertBox = document.getElementById("alert_box");
const alertMessage = document.getElementById("alert__message");
const alertClose = document.getElementById("alert__close");
const alertAbort = document.querySelectorAll(".alert__abort");
const alertConfirm = document.getElementById("alert__confirm");
const alertAlert = document.getElementById("alert__alert");

export function customAlert(type = "success", message = {headers: "Attention !", body: "Opération réussit !"}) {


    let confirmation = true;

    alert.style.display = "";
    alert.removeAttribute("aria-hidden");
    if(type === "info") {
        alertAbort.forEach(element => {
            element.style.display = "none";
        });
    } else if (type === "warning") {
        alertAlert.style.display = "";
        alertClose.style.display = "none";
    } else if (type === "error") {
        alertAbort.forEach(element => {
            element.style.display = "none";
        });
    } else if (type === "success") {
        alertAbort.forEach(element => {
            element.style.display = "none";
        });
    } else {
        console.error("Alert type not recognized");
    }
    if (message.headers === undefined) {
        message.headers = "Attention !";
    }
    alertAlert.innerText = message.headers;
    alertMessage.innerText = message.body;
    // Below we retunr false if it is aborted:
    alertAbort.forEach(element => {
        element.addEventListener("click", function(e){
            confirmation = false;
            closeAlert();
        }, {once: true})
    });
    // Below we return true if it is confirmed:
    alertConfirm.addEventListener("click", function(e){
        confirmation = true;
        closeAlert();
    }, {once: true});

    alertClose.addEventListener("click", closeAlert, {once: true});
    return confirmation;
    
}
function closeAlert() {
    alert.style.display = "none";
    alert.setAttribute("aria-hidden", "true");
    alertMessage.innerText = "";
    alertAlert.style.display = "none";
    alertClose.style.display = "";
    alertAbort.forEach(element => {
        element.removeEventListener("click", closeAlert);
        element.style.display = "";
    });
    alertConfirm.removeEventListener("click", closeAlert);
    alertClose.removeEventListener("click", closeAlert);
    
}