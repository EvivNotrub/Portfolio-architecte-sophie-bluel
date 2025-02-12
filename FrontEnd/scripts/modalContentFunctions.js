export let currentImage, titleInput, categoryInput, addPhotoInput, photoForm, id, descriptionInput, titleDescriptionInput, introTitleElement, currentIntroDescriptionArray;

  /************** utility functions **************/

function returnFileSize(number) {
    if(number < 1024) {
      return number + ' octets';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + ' Ko';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + ' Mo';
    }
  }

function changeDisplayPhoto(addPhotoLabel, storage = true){
    document.getElementById("add-photo-input").addEventListener("change", function(event){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e)  {
          const newImage = document.createElement("img");
          newImage.src = e.target.result;
           if (storage) { window.localStorage.setItem("newImageSource", newImage.src)};
          addPhotoLabel.style.backgroundImage = `url(${newImage.src})`;
          addPhotoLabel.style.backgroundSize = "cover";
          addPhotoLabel.style.backgroundPosition = "center";
          const size = returnFileSize(file.size);
          const sizeSpan = document.querySelector(".add-photo-label span");
          sizeSpan.textContent = size;
      }
      reader.readAsDataURL(file);
      }
    );
  }

function showCUrrentImage(identification) {
  titleInput = document.querySelector("input[name='img-title']");
  currentImage = document.querySelector(identification);
  titleInput.value = currentImage.alt;
  const addPhotoLabel = document.querySelector(".add-photo-label");
  addPhotoLabel.style.background = `center / cover no-repeat url(${currentImage.src})`;
  return addPhotoLabel;
}
  /********************** for text edition ****************/
  function getIntroTexts(){
    introTitleElement = document.querySelector(".intro__title");
    const currentIntroTitle = introTitleElement.innerText;
    const currentIntroDescription = document.querySelector(".intro__description__txt").innerText
    return {
        title: currentIntroTitle,
        description: currentIntroDescription
    }
  }
  function showIntroTexts(currentIntro){
    titleDescriptionInput = document.querySelector("input[name='about-title']");
    descriptionInput = document.querySelector("#about-txt");
    titleDescriptionInput.value = currentIntro.title;
    descriptionInput.value = currentIntro.description;
  }

  
/*************** Main functions ******************/


export function addFormFunctions() {
    const addPhotoLabel = document.querySelector(".add-photo-label");
    photoForm = document.getElementById("modal__form-add");
    addPhotoInput = document.getElementById("add-photo-input");
    titleInput = document.getElementById("img-title");
    categoryInput = document.getElementById("img-category");

    changeDisplayPhoto(addPhotoLabel, false);
}

export function galleryFunctions() {
}
export function editTxtFunctions() {
  const currentIntro = getIntroTexts();
  showIntroTexts(currentIntro);
}
export function editImgFunctions() {
    const addPhotoLabel = showCUrrentImage("#sophie-bluel");
    changeDisplayPhoto(addPhotoLabel, true);
    addPhotoInput = document.getElementById("add-photo-input");   
}
export function editWorkFunctions(options) {
  const addPhotoLabel = document.querySelector(".add-photo-label");
  photoForm = document.getElementById("modal__form-edit-work");
  addPhotoInput = document.getElementById("add-photo-input");
  titleInput = document.getElementById("img-title");
  categoryInput = document.getElementById("img-category");
  changeDisplayPhoto(addPhotoLabel, false);
  addPhotoLabel.style.background = `center / cover no-repeat url("${options.url}")`;
  titleInput.value = options.title;
  categoryInput.value = options.categoryId;
  id = options.id;  
}

