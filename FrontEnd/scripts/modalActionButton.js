import { deleteWork, addWork, getWorks } from "./api.js";
import { titleInput, categoryInput, addPhotoInput, photoForm, id } from "./modalContentFunctions.js";
import { openModal } from "./modal.js";
export let worksEdit = false;
//in order to be able to change the value of worksEdit from another module:
export function changeWorkEdit(boolean) {
  worksEdit = boolean;
}
const maxSize = 4000000;
let url, request;
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




export async function actionAdd(event) {
  event.preventDefault();
  // console.log( addPhotoInput, titleInput, categoryInput);
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(photoForm);
  const files = addPhotoInput.files;
  const file = files[0];

  if(photoForm.reportValidity() && validFileType(files) && validFileSize(files)){      
      console.log("form valid")
     }else{
      // await customAlert("error", {headers:"Erreur de formulaire !", body: "Merci de bien renseigner tous les champs et de vérifier si l'image est au bon format.."});
      if(validFileType(files)){
        console.log("file type not valid");
      }
      if(validFileSize(files)){
        console.log("file size not valid");
      }
      if(titleInput.valid){
        console.log("Please enter a title");
      }
      if(categoryInput.valid){
        console.log("Please choose a category");        
      }
      return;
     }

    const formDataAdd = new FormData();
      formDataAdd.append("image", file);
      formDataAdd.append("title", titleInput.value);
      formDataAdd.append("category", categoryInput.value);
      console.log(formDataAdd);          
        // if(!await customAlert("warning", {headers: "Action requise !" , body: "Êtes-vous sûr de vouloir ajouter cette photo ?"})){
        //   return;
        // }
    if(confirm("Êtes-vous sûr de vouloir ajouter cette photo ?")){
        const response = await addWork( formDataAdd, token);
            if(response.ok){
              // await customAlert("success", {body: "Votre photo a bien été ajoutée !"});
              alert("Votre photo a bien été ajoutée !");
              worksEdit = true;
              console.log("response ok", response);
              Promise.resolve(response);            
            }else{
              console.log("not ok", response);
              alert("Erreur lors de l'ajout de la photo");
              Promise.reject(response.status);
            return
            }
    }else{
        alert("Annulation de l'ajout de la photo");
        return;
    }
    const works = await getWorks();
    const options = { data: works,
                    arrow: false  };
    openModal("gallery", options);
}

export async function actionEdit(event) {
    // fire edit action
    event.preventDefault();
    console.log('===> modalActionEditButton', event)
    const token = JSON.parse(localStorage.getItem("token"));
    const files = addPhotoInput.files;
    const file = files[0];
    if(photoForm.reportValidity() && validFileType(files) && validFileSize(files)){      
      console.log("form valid")
     }else{
      // await customAlert("error", {headers:"Erreur de formulaire !", body: "Merci de bien renseigner tous les champs et de vérifier si l'image est au bon format.."});
      if(!validFileType(files)){
        alert("file type not valid");
      }
      if(!validFileSize(files)){
        alert("file size not valid");
      }
      if(!titleInput.valid){
        alert("Please enter a title");
      }
      if(!categoryInput.valid){
        alert("Please choose a category");        
      }
      return;
     }

     const formDataAdd = new FormData();
     formDataAdd.append("image", file);
     formDataAdd.append("title", titleInput.value);
     formDataAdd.append("category", categoryInput.value);
     if(confirm('Êtes-vous sûr de vouloir remplacer la photo ' + id + '?')){
      const responseDelete = await deleteWork(id, token);
      console.log(responseDelete);
        if(responseDelete.ok){
            // await customAlert("success", {body: "Votre photo a bien été supprimée !"});   
            console.log("la photo a bien été supprimée !");
          worksEdit = true;     
          Promise.resolve(responseDelete);
        }else{
          console.log("photo non supprimée", responseDelete);
          alert("Erreur lors de la suppression de la photo");
          Promise.reject(responseDelete.status);
          return
        };
        const responseAdd = await addWork( formDataAdd, token);
            if(responseAdd.ok){
              // await customAlert("success", {body: "Votre photo a bien été ajoutée !"});
              alert("la photo a bien été ajoutée !");
              worksEdit = true;
              console.log("response ok", responseAdd);
              Promise.resolve(responseAdd);            
            }else{
              console.log("not ok", responseAdd);
              alert("Erreur lors de l'ajout de la photo");
              Promise.reject(responseAdd.status);
            return
            }
        
    }else{
      alert("Annulation de l'édit de la photo");
      return;
    }
    const works = await getWorks();
    const options = { data: works,
                    arrow: false  };
    openModal("gallery", options);

}

export function actionEditImage(event) {
    // fire edit image action
    console.log('===> modalActionEditImageButton', event)
}

export async function actionDelete(event) {
  event.stopPropagation();
  const id = event.target.dataset.id;
  console.log(id);
  const category = event.target.dataset.cat;
  console.log(category);
  const title = event.target.dataset.title;
  console.log(title);
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  const parent = event.target.parentNode.parentNode;
  console.log(parent);
  
    // if(!await customAlert("warning", {headers: "Action requise !" , body: "Êtes-vous sûr de vouloir supprimer cette photo ?"})){
    if(confirm('Effacer le projet n°' + id + ' \"' + title + '\" de category : ' + category + ' ?')){
      const response = await deleteWork(id, token);
      console.log(response);
        if(response.ok){
          event.target.parentNode.parentNode.remove();        
            // await customAlert("success", {body: "Votre photo a bien été supprimée !"});   
            alert("Votre photo a bien été supprimée !");
          worksEdit = true;     
          Promise.resolve(response);
        }else{
          console.log("not ok");
          Promise.reject(response.status);
          return
        }
    }else{
      alert("Annulation de la suppression de la photo");
      return;
    }

}

export function actionEditTxt(event) {
    // fire edit text action
    console.log('===> modalActionEditTextButton', event.target)
}