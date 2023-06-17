import { deleteWork, addWork, getWorks } from "./api.js";
import {  currentImage, titleInput, categoryInput, addPhotoInput, photoForm, id, titleDescriptionInput, descriptionInput, introTitleElement } from "./modalContentFunctions.js";
import { openModal, closeModal } from "./modal.js";
import { customAlert } from "./alerts.js";
import { renderWorkCards } from "./works.js";
// import { openModalLinkSetup } from "./modalLink.js";

const maxSize = 4000000;
let url, request;

function validFileType(files) {  
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
 // 
  const token = JSON.parse(localStorage.getItem("token"));  
  const files = addPhotoInput.files;
  const file = files[0];

  if(photoForm.reportValidity() && validFileType(files) && validFileSize(files)){      
      console.log("form valid")
     }else{
      if(files.length === 0){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Oups, vous n'avez pas sélectionné de fichier!"});        
      }else if(!validFileType(files)){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Le format de l'image n'est pas valide."});        
      }else if(!validFileSize(files)){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "La taille de l'image est trop grande."});        
      }else if(!titleInput.valid){        
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Le titre doit être renseigné."});
      }else if(!categoryInput.valid){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "La catégorie doit être renseignée."});        
      }else{
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Merci de bien renseigner tous les champs et de vérifier si l'image est au bon format."});
      }
      return;
     }

    const formDataAdd = new FormData();
      formDataAdd.append("image", file);
      formDataAdd.append("title", titleInput.value);
      formDataAdd.append("category", categoryInput.value);      
      if(await customAlert("warning", {headers: "Action requise !" , body: "Êtes-vous sûr de vouloir ajouter cette photo ?"})){
        const response = await addWork( formDataAdd, token);
            if(response.ok){
              await customAlert("success", {body: "Votre photo a bien été ajoutée !"});
              // Promise.resolve(response);            
            }else{              
              await customAlert("error", {headers:"Erreur lors de l'ajout de la photo !", body: "Veuillez réessayer en vérifiant que le fichier est bien au format jpeg ou png et que la taille est inférieure à 4Mo."});
              Promise.reject(response.status);
            return
            }
    }else{
        await customAlert("info", {body: "Annulation de l'ajout de la photo"});
        return;
    }
    const works = await getWorks();
    const options = { data: works,
                    arrow: false  };
    openModal("gallery", options);
    renderWorkCards();
}

export async function actionEdit(event) {
    // fire edit action
    event.preventDefault();    
    const token = JSON.parse(localStorage.getItem("token"));
    const files = addPhotoInput.files;
    const file = files[0];    
    if(photoForm.reportValidity() && validFileType(files) && validFileSize(files)){      
      console.log("form valid")
     }else{
      if(files.length === 0){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Oups, vous n'avez pas sélectionné de fichier!"});        
      }else if(!validFileType(files)){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Le format de l'image n'est pas valide."});        
      }else if(!validFileSize(files)){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "La taille de l'image est trop grande."});        
      }else if(!titleInput.valid){        
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Le titre doit être renseigné."});
      }else if(!categoryInput.valid){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "La catégorie doit être renseignée."});        
      }else{
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Merci de bien renseigner tous les champs et de vérifier si l'image est au bon format."});
      }
      return;
     }

     const formDataAdd = new FormData();
     formDataAdd.append("image", file);
     formDataAdd.append("title", titleInput.value);
     formDataAdd.append("category", categoryInput.value);
    //  if(confirm()){
      if(await customAlert("warning", {headers: "Action requise !" , body: 'Êtes-vous sûr de vouloir remplacer la photo ' + id + '?'})){
      const responseDelete = await deleteWork(id, token);      
        if(responseDelete.ok){            
          // Promise.resolve(responseDelete);
        }else{          
          await customAlert("error", {headers:"Erreur !", body: "La suppression de la photo n'a pas abouti."});
          // Promise.reject(responseDelete.status);
          return
        };
        const responseAdd = await addWork( formDataAdd, token);
            if(responseAdd.ok){
              await customAlert("success", {body: "Votre photo a bien été remplacée !"});
              // Promise.resolve(responseAdd);            
            }else{              
              await customAlert("error", {headers:"Erreur !", body: "L'ajout de la photo n'a pas abouti."});
              // Promise.reject(responseAdd.status);
            return
            }
        
    }else{
      await customAlert("info", {body: "Annulation de l'édit de la photo"});
      return;
    }
    const works = await getWorks();
    const options = { data: works,
                    arrow: false  };
    openModal("gallery", options);
    renderWorkCards();
}

export async function actionEditImage(event) {
    event.preventDefault();
    const form = document.getElementById("modal__form-edit-img");
    const files = addPhotoInput.files;
    if(form.reportValidity() && validFileType(files) && validFileSize(files)){      
      console.log("form valid")
     }else{
      if(!validFileType(files)){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Le format de l'image n'est pas valide."});        
      }else if(!validFileSize(files)){
        await customAlert("error", {headers:"Erreur de formulaire !", body: "La taille de l'image est trop grande."});        
      }else if(!titleInput.valid){        
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Le titre doit être renseigné."});      
      }else{
        await customAlert("error", {headers:"Erreur de formulaire !", body: "Merci de bien renseigner tous les champs et de vérifier si l'image est au bon format."});
      }
      return;
     }
    if (window.localStorage.getItem("newImageSource")) {
      currentImage.src = window.localStorage.getItem("newImageSource");
      window.localStorage.removeItem("newImageSource");
    }
    if(titleInput.value){currentImage.alt = titleInput.value};
    closeModal();
}

export async function actionDelete(event) {
  event.stopPropagation();
  const id = event.target.dataset.id;  
  const category = event.target.dataset.cat;  
  const title = event.target.dataset.title;  
  const token = JSON.parse(localStorage.getItem("token"));  
  const parent = event.target.parentNode.parentNode;  
  
    if(await customAlert("warning", {headers: "Action requise !" , body: 'Êtes-vous sûr de vouloir supprimer le projet n°' + id + ' \"' + title + '\" de category : ' + category + ' ?'})){
      const response = await deleteWork(id, token);      
        if(response.ok){
          event.target.parentNode.parentNode.remove();        
            await customAlert("success", {body: "Votre photo a bien été supprimée !"});   
          renderWorkCards();     
          // Promise.resolve(response);
        }else{
          await customAlert("error", {headers:"Erreur !", body: "La suppression de la photo n'a pas abouti, car le serveur renvoie une erreur."});
          // Promise.reject(response.status);
          return
        }
    }else{
      await customAlert("info", {body: "Annulation de la suppression de la photo!"});
      return;
    }

}

export function actionEditTxt(event) {
    // fire edit text action
          event.preventDefault();
            const currentIntroDescription = document.querySelector(".intro__description__txt")
            currentIntroDescription.innerText = descriptionInput.value
            introTitleElement.innerText = titleDescriptionInput.value;
          closeModal();
}