
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


/* template for post
object {
    category: Object { id: 3, name: "Hotels & restaurants" }​​
    categoryId: 3​​
    id: 12
    imageUrl: "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png"​​
    title: "Restaurant Sushisen - Londres"​​
    userId: 1
}
*/
/*
  curl -X 'POST' \
  'http://localhost:5678/api/works' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NDk2MTI2OSwiZXhwIjoxNjg1MDQ3NjY5fQ.uCS-f83bBxFtUciHDbnZ0Gj08zfaGnNfs6Q9VwN2Mts' \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@scull.avif;type=image/avif' \
  -F 'title=scull2' \
  -F 'category=None'
*/


  // curl -X 'DELETE' \
  // 'http://localhost:5678/api/works/12' \
  // -H 'accept: */*' \
  // -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NDk2MTI2OSwiZXhwIjoxNjg1MDQ3NjY5fQ.uCS-f83bBxFtUciHDbnZ0Gj08zfaGnNfs6Q9VwN2Mts'
