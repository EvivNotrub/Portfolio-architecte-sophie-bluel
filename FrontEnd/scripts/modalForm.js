import { token} from "./works.js";
import { closeModal, modalLinks, modalLinkSetup } from "./modale.js";
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
  function returnFileSize(number) {
    if(number < 1024) {
      return number + ' octets';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + ' Ko';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + ' Mo';
    }
  }
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
          formPhoto.style.backgroundPosition = "center";
          const size = returnFileSize(file.size);
          console.log(size);
          const sizeSpan = document.querySelector(".add-photo-label span");
          sizeSpan.textContent = size;
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
    console.log("lancement fonction setIdPhoto");
    modalButton.addEventListener("click", function photoAndClose(event){
      event.preventDefault();
      const currentImage = document.querySelector("#sophie-bluel");
      if (window.localStorage.getItem("newImageSource") !== null) {
        currentImage.src = window.localStorage.getItem("newImageSource");
        window.localStorage.removeItem("newImageSource");
      }
      const inputAlt = document.querySelector("input[name='img-title']");
      if(inputAlt.value){currentImage.alt = inputAlt.value};
      closeModal(event);
      modalButton.removeEventListener("click", photoAndClose);
    }, {once: true});
  }


  /************** Edit work photos **************/
  let titleInput, categoryInput, addPhotoInput, photoForm, initialId;
  const maxSize = 4000000;
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
  
  function validFileType(files) {
    console.log(files);
    const fileTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png'
    ]
    let valid = true;
    for (let i = 0; i < files.length; i++) {
      if(!fileTypes.includes(files[i].type)){
        valid = false;
      }
    }
    return valid;
  }
  function validFileSize(files) {
    console.log(typeof files);
    let valid = true;
    for (let i = 0; i < files.length; i++) {
      if(files[i].size > maxSize) {
        valid = false;
      }
    }
    return valid;
  }
  function actionOnInputChange(event) {
    categoryInput.addEventListener("change", function logCat(event){
      console.log("category changed");
      console.log(event.target.value);
    });
    titleInput.addEventListener("change", function logTitle(event){
      console.log("title changed");
      console.log(event.target.value);
    });    
  }
  export async function commitWorkEdit (event){
    console.log(event);
    console.log(event.target);
    event.preventDefault();
    console.log("lancement fonction getNewWorkData");
    let request, url;
    //to be deleted afterwards if no other action is inserted in function than just log:
    actionOnInputChange(event);
    
    const files = addPhotoInput.files;
    const file = files[0];

    if(photoForm.reportValidity() && validFileType(files) && validFileSize(files)){      
      console.log("form valid")
     }else{
      console.log("formulaire non valide");
      if(!validFileType(files)){
        console.log("file type not valid");
      }
      if(!validFileSize(files)){
        console.log("file size not valid");
      }
      if(!titleInput.valid){
        console.log("Please enter a title");
      }
      if(!categoryInput.valid){
        console.log("Please choose a category");        
      }
      return;
     }
     let workId;      
     console.log(initialId);
     console.log(typeof initialId);
     console.log(Number.isInteger(parseFloat(initialId)));

     const bearer = "Bearer " + token;
     console.log(bearer);
     if(initialId == "add"){
      const formDataAdd = new FormData();
      formDataAdd.append("image", file);
      formDataAdd.append("title", titleInput.value);
      formDataAdd.append("category", categoryInput.value);
      console.log(formDataAdd);      
      url = "http://localhost:5678/api/works";      
      request = {
        method: "POST",
        headers: {
          Authorization: bearer
           },
        body: formDataAdd
      };
     }else if (Number.isInteger(parseFloat(initialId)) && initialId > 0 && initialId !== "null" && initialId !== "undefined"){
      workId = initialId;
      url = `http://localhost:5678/api/works/${workId}`;
      request = {
        method: "DELETE",
        headers: {
          "Authorization": bearer
            }
      };
     }else{
       alert("error: no valid work id");
       return;
     }
    const response = await fetch( url, request);
    const result = await response.json();
      console.log(response);
      console.log(result);
      if(response.ok){
        alert("Votre photo a bien été ajoutée");
      }else{
      console.log("not ok");
      console.log(response);
      // Promise.reject(response.status);
      return
      }
   


    console.log(event);
    console.log(event.target);
    event.target.removeEventListener("click", commitWorkEdit);
    event.target.classList.add("js-modal");
    modalLinkSetup(modal);
    event.target.click();
  }


export async function getNewWorkData(modalButton, element, id) {
  console.log(id);
  initialId = id;
  // maybe add asome alert or message if no file changed
  console.log("creation eventListerner getNewWorkData");
  photoForm = element;
  addPhotoInput = document.getElementById("add-photo-input");
  titleInput = document.getElementById("img-title");
  categoryInput = document.getElementById("img-category");
  addPhotoInput.setAttribute("required", "");
  titleInput.setAttribute("required", "");
  categoryInput.setAttribute("required", "");
  modalButton.addEventListener("click", commitWorkEdit);
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