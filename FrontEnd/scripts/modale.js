import  {createProjectContent} from './works.js';

export function modalGallerySpecifics(article, articleTitle) {
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

let modal = null;
const focusableSelector = "figure, button, a, input, textarea";
console.log(focusableSelector);
let focusables = [];
let previouslyFocusedElement = null;

async function createModalGallery(containerId) {
    const gallery2 = document.createElement("div");
    gallery2.id = "galleryModal";
    gallery2.classList.add("galleryModal");
    document.querySelector(containerId).appendChild(gallery2);
    await createProjectContent("#galleryModal", true);
}


const closeModal = function (event) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) {previouslyFocusedElement.focus()};
    event.preventDefault();
    // window.setTimeout(function () {
    //     modal.style.display = "none";
    //     modal = null;
    // }, 500)
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
    modal.querySelector("#galleryModal").remove();
    modal.addEventListener('animationend', hideModal)
}


async function openModal (event) {
    event.preventDefault();
    // const href = event.target.getAttribute("href");
    // console.log(href);
    modal = document.querySelector(this.getAttribute('href'));
    // console.log(modal);
    await createModalGallery(".modal__content");
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




