import { openModal } from './modale.js';
import  { createProjectContent, deletePicture } from './works.js';
import { showIntroTexts, getIntroTexts, setIntroTexts, changeDisplayPhoto, setIdPhoto, showCUrrentImage, createCategoryOptions, getNewWorkData } from './modalForm.js';


export function setModalTexts(modal, modalVersion, id){
    console.log(modal);
    const modalTitle = modal.querySelector(".modal__title");
    const modalButton = modal.querySelector(".modal__action");
    modalButton.setAttribute("type", "button");

    modalButton.removeAttribute("href");
    delete modalButton.dataset.version;
    delete modalButton.dataset.id;
    modalButton.classList.remove("js-modal");
    if (modalVersion === "gallery") {
        modalTitle.innerText = "Galerie Photos";
        modalButton.innerText = "Ajouter une photo";
        modalButton.setAttribute("href", "./pages/modalImageForm.html#modal__form")
        modalButton.classList.add("js-modal");
        modalButton.dataset.version = "editPhoto";
        modalButton.dataset.id = "add";
    }else if (modalVersion === "editPhoto" && id === "add"){
        modalTitle.innerText = "Ajout photo";
        modalButton.innerText = "Valider";
    }else if (modalVersion === "editPhoto"){
        modalTitle.innerText = "Éditer la photo";
        modalButton.innerText = "Valider";
        // if (id !== null) {
        //     modalButton.dataset.id = id;
        // }
    }else if (modalVersion === "editText"){
        modalTitle.innerText = "Changer le texte";
        modalButton.innerText = "Valider";
    }
    return modalButton;
}

export function removeGallery() {
    const gallery = document.querySelector("#galleryModal");
    if (gallery) {
        gallery.remove();
    }
}
export function removeForm(){
    const form = document.querySelector("#modal__form");
    if (form) {
        form.remove();
    }
}
export function modalGallerySpecifics(article, articleTitle) {
    console.log(article);
    article.setAttribute("href", "./pages/modalImageForm.html#modal__form")
    article.classList.add("js-modal");
    article.dataset.version = "editPhoto";
    articleTitle.textContent = "éditer";
    const icons = document.createElement("div");
    icons.classList.add("modal__icons");
    const iconBin = document.createElement("span");
    iconBin.classList.add("icon-bin", "material-symbols-outlined");
    iconBin.innerText = "delete";
    const iconDrag = document.createElement("span");
    iconDrag.classList.add("icon-drag", "material-symbols-outlined");
    iconDrag.innerText = "drag_pan";
    article.appendChild(icons);
    icons.appendChild(iconBin);
    icons.appendChild(iconDrag);
}

async function createModalGallery(containerClass, modalButton) {

    const gallery2 = document.createElement("div");
    gallery2.id = "galleryModal";
    gallery2.classList.add("galleryModal");
    document.querySelector(containerClass).appendChild(gallery2);
    await createProjectContent("#galleryModal", true);
    console.log(gallery2);
    gallery2.querySelectorAll(".icon-bin").forEach( picture => {
        // console.log(picture);
        const id = picture.dataset.id;
        // console.log(id);
        picture.addEventListener("click", function (event) {deletePicture(event, id)}, {once: true} );
    });
}

async function createModalEditPhoto(containerClass, id, element) {
    
    // const modalForm = element;
    document.querySelector(containerClass).appendChild(element);

    if (id !== null) {
        createCategoryOptions();
        const formPhoto = document.querySelector(".add-photo-label");
        console.log(formPhoto);
        changeDisplayPhoto(formPhoto);
    }else{
        document.querySelector("label[for='img-category']").remove();
        document.querySelector("#img-category").remove(); 
        document.querySelector("label[for='img-title']").textContent = "Texte alternatif";
        const formPhoto = showCUrrentImage("#sophie-bluel");
        changeDisplayPhoto(formPhoto);
    }
}
function createModalEditText(containerClass, element){
    // const modalForm = element;
    document.querySelector(containerClass).appendChild(element);
    const currentIntro = getIntroTexts();
    // console.log(currentIntro);
    showIntroTexts(currentIntro);
}
export async function createModalBody(modalVersion, id, element, modalButton){
        console.log(element);
        const arrow = document.querySelector(".modal__arrow");
        arrow.style.transform = "scale(0)";

        if (element !== null) {
            element.addEventListener("submit", function (event) {
                event.preventDefault();
                modalButton.focus();
            });        
        }
        
    if (id !== null) {
        arrow.style.transform = "scale(1)";
    }
    if (modalVersion === "gallery") {
        await createModalGallery(".modal__content", modalButton);
    
    };
    if (modalVersion === "editPhoto") {
        await createModalEditPhoto(".modal__content", id, element);
        if(id == null){
            setIdPhoto(modalButton)
        }else{
            getNewWorkData(modalButton);

        } console.log(id);
    }
    if (modalVersion === "editText") {
        createModalEditText(".modal__content", element);
        // this also closes the modal and sets the event listener for the modals anew
        setIntroTexts(modalButton);
    }
}