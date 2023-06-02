import { closeModal } from "./modale.js";
import  { getCategories, getWorks } from './works.js';

// document.querySelector("#add-photo-input").addEventListener('change', function() {
//   console.log("bob");
//     console.log(this.files[0]);
//     filename = this.files[0].name;
//     console.log(filename);
//   });

/********* Intro Edit mode *********/


  export function getIntroTexts(){
    const currentIntroTitle = document.querySelector(".intro__title").innerText;
    console.log(currentIntroTitle);
    const currentIntroDescriptionArray = Array.from(document.querySelectorAll(".intro__description p"));
    console.log(currentIntroDescriptionArray);
    const currentIntroDescription = currentIntroDescriptionArray.map(p => p.innerText).join("\n\n");
    console.log(currentIntroDescription);
    return {
        title: currentIntroTitle,
        description: currentIntroDescription
    }
  }
  export function showIntroTexts(currentIntro){
    console.log(currentIntro);
    const titleDescriptionInput = document.querySelector("input[name='about-title']");
    console.log(titleDescriptionInput);
    const descriptionInput = document.querySelector("#about-txt");
    console.log(descriptionInput);
    titleDescriptionInput.value = currentIntro.title;
    descriptionInput.value = currentIntro.description;
    console.log(titleDescriptionInput, descriptionInput);
  }

  export function setIntroTexts(modalButton){
    modalButton.addEventListener("click", function(event){
      // event.preventDefault();
      const titleDescriptionInput = document.querySelector("input[name='about-title']");
      // console.log(titleDescriptionInput);
      const descriptionInput = document.querySelector("#about-txt");
      // console.log(descriptionInput);
      const descriptionArray = descriptionInput.value.split("\n");
      // console.log(descriptionArray);
      const description = descriptionArray.map(p => `<p>${p}</p>`).join("").replace(/<p><\/p>/g, "");
      document.querySelector(".intro__title").innerText = titleDescriptionInput.value;
      const currentIntroDescriptionArray = Array.from(document.querySelectorAll(".intro__description p"));
      currentIntroDescriptionArray.forEach( p => p.remove());
      document.querySelector(".intro__description").innerHTML += description;
      closeModal(event);
    }, {once: true});
  }

  /************** Edit Sophie's photo **************/

  export function changeDisplayPhoto(formPhoto){
    document.getElementById("add-photo-input").addEventListener("change", function(event){
      const file = event.target.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.onload = function(e)  {
          const newImage = document.createElement("img");
          newImage.src = e.target.result;
          console.log(newImage);
          window.localStorage.setItem("newImageSource", newImage.src);
          formPhoto.style.backgroundImage = `url(${newImage.src})`;
          formPhoto.style.backgroundSize = "cover";
      }
      reader.readAsDataURL(file);
      }
    );
  }
export function showCUrrentImage(identification) {
  const inputAlt = document.querySelector("input[name='img-title']");
  console.log(inputAlt);
  const image = document.querySelector(identification);
  inputAlt.value = image.alt;
  const formPhoto = document.querySelector(".add-photo-label");
  formPhoto.style.backgroundImage = `url(${image.src})`;
  formPhoto.style.backgroundSize = "cover";
  return formPhoto;
}


  export function setIdPhoto(modalButton){
    modalButton.addEventListener("click", function photoAndClose(event){
      event.preventDefault();
      const currentImage = document.querySelector("#sophie-bluel");
      if (window.localStorage.getItem("newImageSource") !== null) {
        currentImage.src = window.localStorage.getItem("newImageSource");
        window.localStorage.removeItem("newImageSource");
      }
      const inputAlt = document.querySelector("input[name='img-title']");
      currentImage.alt = inputAlt.value;
      closeModal(event);
      modalButton.removeEventListener("click", photoAndClose);
    }, {once: true});
  }


  /************** Edit work photos **************/

  export async function createCategoryOptions() {
    const categories = await getCategories();
        console.log(categories);
        const imgCategory = document.querySelector("#img-category"); 
        categories.forEach( category => {
            const imgCategoryOption = document.createElement("option");
            imgCategoryOption.setAttribute("value", category.id);
            imgCategoryOption.textContent = category.name;
            console.log(imgCategoryOption);
            imgCategory.appendChild(imgCategoryOption);
        });
  }


export async function getNewWorkData(modalButton) {

  modalButton.addEventListener("click", async function(event){
    event.preventDefault();
    const file = document.getElementById("add-photo-input").files[0];
    console.log(file);
    const fileURL = document.URL.createObjectURL(file);
    console.log(fileURL);
    const title = document.getElementById("img-title").value;
    console.log(title);
    const category = document.getElementById("img-category").value;
    console.log(category);
    const works = await getWorks();
      const id = works.length;
      console.log(id);

    const imgInput = {
      "id": id,
      "title": title,
      "imageUrl": fileURL,
      "categoryId": category,
      "userId": 1
    }
    console.log(imgInput);
  }
  );
}

  /*
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
// const logInput = {
//   email: event.target.querySelector("[name=email]").value,
//   password: event.target.querySelector("[name=password]").value
// };
// console.log(logInput);
// const chargeUtile = JSON.stringify(logInput);

// const response = await fetch("http://localhost:5678/api/users/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: chargeUtile
// });
// console.log(response.status);
// if (response.ok == false) { // if HTTP-status is NOT 200-299
//   const message = await response.json().message;
//   alert("HTTP-Error: " + response.status + "\n" + message);
//   return;
// };
// // obtenir le corps de réponse
// const retourLogin = await response.json();
// const token = JSON.stringify(retourLogin.token);
// window.localStorage.setItem("token", token)
// window.location = "../index.html"