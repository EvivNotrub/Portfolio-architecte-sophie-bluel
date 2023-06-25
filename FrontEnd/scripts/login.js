
import { authentification } from "./api.js";
// const logInput = {
    //         email: "sophie.bluel@test.tld",
    //         password: "S0phie"
    //     };

const form = document.querySelector(".form-login");
form.addEventListener("submit", async function (event){
    
        event.preventDefault();
        const logInput = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };
        const chargeUtile = JSON.stringify(logInput);

        authentification(chargeUtile);
});