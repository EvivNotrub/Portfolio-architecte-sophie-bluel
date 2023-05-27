import { openModal } from './modale.js';
import  { createProjectContent, deletePicture, getCategories } from './works.js';



export function setModalTexts(modal, modalVersion){
    const modalTitle = modal.querySelector(".modal__title");
    const modalButton = modal.querySelector(".modal__action");
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

async function createModalEditPhoto(containerClass, element) {

    const modalForm = element;
    document.querySelector(containerClass).appendChild(modalForm);

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

export async function createModalBody(modalVersion, id, element){

        const arrow = document.querySelector(".modal__arrow");
        arrow.style.transform = "scale(0)";
    if (id !== null) {
        arrow.style.transform = "scale(1)";
    }
    if (modalVersion === "gallery") {
        await createModalGallery(".modal__content");
    };
    if (modalVersion === "editPhoto") {
        await createModalEditPhoto(".modal__content", element);
    }
}