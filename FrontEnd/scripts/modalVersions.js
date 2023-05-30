import { openModal } from './modale.js';
import  { createProjectContent, deletePicture, getCategories } from './works.js';
import { showIntroTexts, getIntroTexts, setIntroTexts } from './modalForm.js';


export function setModalTexts(modal, modalVersion){
    const modalTitle = modal.querySelector(".modal__title");
    const modalButton = modal.querySelector(".modal__action");
    modalButton.setAttribute("type", "button");
    if (modalVersion === "gallery") {
        modalTitle.innerText = "Galerie Photos";
        modalButton.innerText = "Ajouter une photo";
    }else if (modalVersion === "addPhoto"){
        modalTitle.innerText = "Ajout photo";
        modalButton.innerText = "Valider";
    }else if (modalVersion === "editPhoto"){
        modalTitle.innerText = "Éditer la photo";
        modalButton.innerText = "Valider";
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

export function modalGallerySpecifics(article, articleTitle) {
    console.log(article);
    article.setAttribute("href", "./pages/modalImageForm.html#modal__form")
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

async function createModalGallery(containerClass) {
    const gallery2 = document.createElement("div");
    gallery2.id = "galleryModal";
    gallery2.classList.add("galleryModal");
    document.querySelector(containerClass).appendChild(gallery2);
    await createProjectContent("#galleryModal", true);
    console.log(gallery2);
    gallery2.querySelectorAll("a").forEach( picture => {
        // console.log(picture);
        const id = picture.dataset.id;
        console.log(id);
        picture.querySelector(".icon-bin").addEventListener("click", function (event) {deletePicture(event, id)} );
        picture.addEventListener("click", openModal );
    });
}

async function createModalEditPhoto(containerClass, id, element) {
    
    // const modalForm = element;
    document.querySelector(containerClass).appendChild(element);

    if (id !== null) {
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
    }else{
        const imgCategoryLabel = document.querySelector("label[for='img-category']");
        imgCategoryLabel.remove();
        const imgCategory = document.querySelector("#img-category"); 
        imgCategory.remove();
        const imgAltTxt = document.querySelector("label[for='img-title']");
        imgAltTxt.textContent = "Texte alternatif";
        const IdImage = document.querySelector("#sophie-bluel").src;
        console.log(IdImage);
        const formPhoto = document.querySelector(".add-photo-label");
        formPhoto.style.backgroundImage = `url(${IdImage})`;
        formPhoto.style.backgroundSize = "cover";

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

        const arrow = document.querySelector(".modal__arrow");
        arrow.style.transform = "scale(0)";
    if (id !== null) {
        arrow.style.transform = "scale(1)";
    }
    if (modalVersion === "gallery") {
        await createModalGallery(".modal__content");
    };
    if (modalVersion === "editPhoto") {
        await createModalEditPhoto(".modal__content", id, element);
    }
    if (modalVersion === "editText") {
        createModalEditText(".modal__content", element);
        // this also closes the modal and sets the event listener for the modals anew
        setIntroTexts(modalButton);
    }
}