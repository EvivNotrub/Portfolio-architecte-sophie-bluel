import  {createProjectContent} from './works.js';

export function modalGallerySpecifics(article, articleTitle) {
    article.setAttribute("href", "#modal")
    article.dataset.id = "addPhoto";
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

function changeGalleryPictures() {
    console.log(this);
    removeGallery();

    openModal(this);
}

let modal = null;
const focusableSelector = "button, a, input, textarea";
console.log(focusableSelector);
let focusables = [];
let previouslyFocusedElement = null;

async function createModalGallery(containerClass) {
    const gallery2 = document.createElement("div");
    gallery2.id = "galleryModal";
    gallery2.classList.add("galleryModal");
    document.querySelector(containerClass).appendChild(gallery2);
    await createProjectContent("#galleryModal", true);
    console.log(gallery2);
    gallery2.querySelectorAll("button").forEach( picture => {
        console.log(picture);
        picture.addEventListener("click", openModal );
    });

}

function setModalTexts(modal, modalVersion){
    const modalTitle = modal.querySelector(".modal__title");
    const modalButton = modal.querySelector(".modal__action");
    if (modalVersion === "gallery") {
        modalTitle.innerText = "Galerie Photos";
        modalButton.innerText = "Ajouter une photo";
    }else if (modalVersion === "addPhoto"){
        modalTitle.innerText = "Ajout photo";
        modalButton.innerText = "Valider";
    }else if (modalVersion === "editPhoto"){
        modalTitle.innerText = "Changer la photo";
        modalButton.innerText = "Valider";
    }else if (modalVersion === "editText"){
        modalTitle.innerText = "Changer le texte";
        modalButton.innerText = "Valider";
    }
}

async function createModalBody(modalVersion){
    if (modalVersion === "gallery") {
        await createModalGallery(".modal__content");
    };
}
function removeGallery() {
    const gallery = document.querySelector("#galleryModal");
    if (gallery) {
        gallery.remove();
    }
}
const closeModal = function (event) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) {previouslyFocusedElement.focus()};
    event.preventDefault();
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    document.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal)
        modal = null;
    }
    removeGallery();
    modal.addEventListener('animationend', hideModal)
}


async function openModal (event) {
    event.preventDefault();
    console.log(this);
    removeGallery();
    // const href = event.target.getAttribute("href");
    // console.log(href);

    modal = document.querySelector(this.getAttribute("href"));
    console.log(modal);
    const modalVersion = this.getAttribute("data-id");
    console.log(modalVersion);
    setModalTexts(modal, modalVersion);
    await createModalBody(modalVersion);
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    console.log(focusables);
    previouslyFocusedElement = document.querySelector(':focus');
    focusables[0].focus();
    modal.style.display = "";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    document.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

const stopPropagation = function (event) {
    event.stopPropagation();
}

const focusInModal = function (event) {
    event.preventDefault();
    // console.log(focusables);
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    console.log(index);
    if (event.shiftKey === true){
        index--
    }else{
        index++
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0 ) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
}

const modalLinks = Array.from(document.querySelectorAll('.js-modal'));
// console.log(modalLinks);
modalLinks.forEach( link => {link.addEventListener("click", openModal)});


window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }
    if (event.key === "Tab" && modal !== null) {
        focusInModal(event);
    }
});




