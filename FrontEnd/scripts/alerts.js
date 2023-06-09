const alert = document.getElementById("alertArea");
const alertBox = document.getElementById("alert_box");
const alertMessage = document.getElementById("alert__message");
const alertClose = document.getElementById("alert__close");
const alertAbort = document.querySelectorAll(".alert__abort");
const alertConfirm = document.getElementById("alert__confirm");
const alertAlert = document.getElementById("alert__alert");
let confirmation = false;
const delay = timeMs => new Promise(resolve => setTimeout(resolve, timeMs));

async function getPromiseFromAlertEvent(alertAbort, alertConfirm, alertClose, event) {
    return new Promise(async (resolve) => {
        

      const listener = (confirmation, value) => {
        console.log("listener firing!");
        confirmation = value;
        alertAbort.forEach(element => {
            element.removeEventListener(event, listener);
        });
        alertConfirm.removeEventListener(event, listener);
        alertClose.removeEventListener(event, listener);
        resolve(confirmation);
      }
      alertAbort.forEach(element => {
        element.addEventListener(event, () => {listener(confirmation, false)});
        });

          alertConfirm.addEventListener(event, () => {listener(confirmation, true)});

          alertClose.addEventListener(event, () => {listener(confirmation, false)});




      await delay(30000);
        resolve(confirmation);
    })
  }
  

export async function customAlert(type = "success", message = {headers: "Attention !", body: ""}) {

    console.log("Alert type: " + type);
    

    

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
    
    await getPromiseFromAlertEvent(alertAbort, alertConfirm, alertClose, "click").then( (value) => {
        confirmation = value;
        console.log("resolve value" + value);
    });
    
    console.log("confirmation: " + confirmation);
    closeAlert();
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