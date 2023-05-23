

function getInput(){
    const email = document.querySelector("input[name='email']").value;
    console.log(email);
    const pass = document.querySelector("input[name='password']").value;
    console.log(pass);
    return {
        email: email,
        password: pass
    }
}

async function sendInput(){
    console.log("myFunction!");
    
    const logInput = getInput();
    console.log(logInput);

    const chargeUtile = JSON.stringify(logInput);
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    const valeursLogin = await response.json();
    console.log(valeursLogin);
    const token = valeursLogin.token
    console.log(token);
};


const form = document.querySelector(".form-login");
console.log(form);
form.addEventListener("submit", function (event){
    event.preventDefault();

    sendInput();
});