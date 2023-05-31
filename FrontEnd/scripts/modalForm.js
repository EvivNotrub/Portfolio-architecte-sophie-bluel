import { closeModal } from "./modale.js";
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
export function showCUrrentImage() {
  const inputAlt = document.querySelector("input[name='img-title']");
  console.log(inputAlt);
  const image = document.querySelector("#sophie-bluel");
  inputAlt.value = image.alt;
  const formPhoto = document.querySelector(".add-photo-label");
  formPhoto.style.backgroundImage = `url(${image.src})`;
  formPhoto.style.backgroundSize = "cover";
  return formPhoto;
}


  export function setIdPhoto(modalButton){
    modalButton.addEventListener("click", function(event){
      event.preventDefault();
      const currentImage = document.querySelector("#sophie-bluel");
      if (window.localStorage.getItem("newImageSource") !== null) {
        currentImage.src = window.localStorage.getItem("newImageSource");
        window.localStorage.removeItem("newImageSource");
      }
      const inputAlt = document.querySelector("input[name='img-title']");
      currentImage.alt = inputAlt.value;
      closeModal(event);
    }, {once: true});
  }

