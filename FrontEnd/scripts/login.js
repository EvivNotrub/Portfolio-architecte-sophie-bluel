
// const logInput = {
    //         email: "sophie.bluel@test.tld",
    //         password: "S0phie"
    //     };

const form = document.querySelector(".form-login");
console.log(form);
form.addEventListener("submit", async function (event){
    
        event.preventDefault();
        const logInput = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };
        console.log(logInput);
        const chargeUtile = JSON.stringify(logInput);

        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
        console.log(response.status);
        if (response.ok == false) { // if HTTP-status is NOT 200-299
            const message = await response.json().message;
            alert("HTTP-Error: " + response.status + "\n" + message);
            return;
        };
        // obtenir le corps de réponse
        const retourLogin = await response.json();
        const token = JSON.stringify(retourLogin.token);
        window.localStorage.setItem("token", token)
        window.location = "../index.html"
});