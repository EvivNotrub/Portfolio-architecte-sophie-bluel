export let titleInput, categoryInput, addPhotoInput, photoForm, id;

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

function changeDisplayPhoto(formPhoto, storage = true){
    document.getElementById("add-photo-input").addEventListener("change", function(event){
      const file = event.target.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.onload = function(e)  {
          const newImage = document.createElement("img");
          newImage.src = e.target.result;
          console.log(newImage);
           if (storage) { window.localStorage.setItem("newImageSource", newImage.src)};
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
function actionOnInputChange(event) {
  categoryInput.addEventListener("change", function logCat(event){
    console.log("category changed");
    console.log(event.target.value);
  });
  titleInput.addEventListener("change", function logTitle(event){
    console.log("title changed");
    console.log(event.target.value);
  });
  addPhotoInput.addEventListener("change", function logPhoto(event){
    console.log("photo changed");
    console.log(event.target.value);
  }); 
}
function showCUrrentImage(identification) {
  const inputAlt = document.querySelector("input[name='img-title']");
  console.log(inputAlt);
  const image = document.querySelector(identification);
  inputAlt.value = image.alt;
  const formPhoto = document.querySelector(".add-photo-label");
  formPhoto.style.backgroundImage = `url(${image.src})`;
  formPhoto.style.backgroundSize = "cover";
  return formPhoto;
}


/*************** Main functions ******************/


export function addFormFunctions() {
    const addPhotoLabel = document.querySelector(".add-photo-label");
    photoForm = document.getElementById("modal__form-add");
    addPhotoInput = document.getElementById("add-photo-input");
    titleInput = document.getElementById("img-title");
    categoryInput = document.getElementById("img-category");


    console.log(addPhotoLabel);
    changeDisplayPhoto(addPhotoLabel, false);
    actionOnInputChange();
}

export function galleryFunctions() {
}
export function editTxtFunctions() {
}
export function editImgFunctions() {
    const formPhoto = showCUrrentImage("#sophie-bluel");
    changeDisplayPhoto(formPhoto, true); 
}
export function editWorkFunctions(options) {
  console.log("==> editWorkFunction",options);
  const addPhotoLabel = document.querySelector(".add-photo-label");
  photoForm = document.getElementById("modal__form-edit-work");
  addPhotoInput = document.getElementById("add-photo-input");
  titleInput = document.getElementById("img-title");
  categoryInput = document.getElementById("img-category");
  changeDisplayPhoto(addPhotoLabel, false);
  actionOnInputChange();
  console.log("options url", options.url);
  addPhotoLabel.style.background = `center / cover no-repeat url("${options.url}")`;
  titleInput.value = options.title;
  categoryInput.value = options.categoryId;
  id = options.id;
  console.log("id in editWoF", id);




    // const formPhoto = showCUrrentImage("");// to be taken in options?
    // changeDisplayPhoto(formPhoto, false); 
}

