import { removeGallery, createModalBody, setModalTexts } from './modalVersions.js';

let modal = null;
const focusableSelector = "button, a, input, textarea";
console.log(focusableSelector);
let focusables = [];
let previouslyFocusedElement = null;


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

export async function openModal (e) {
    e.preventDefault();
    let element;
    console.log(this);
    const id = this.getAttribute("data-id");
    console.log(id);
    removeGallery();
    // const href = e.getAttribute("href");
    // console.log(href);
    const target = this.getAttribute("href");
    console.log(target);
    if (target.startsWith('#')){
        modal = document.querySelector(target);
    } else {
        modal = document.querySelector("#modal");
        element = await loadModal(target);
    }
    // modal = document.querySelector(this.getAttribute("href"));
    console.log(modal);
    const modalVersion = this.getAttribute("data-version");
    console.log(modalVersion);
    setModalTexts(modal, modalVersion);
    await createModalBody(modalVersion, id, element);
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

const loadModal = async function (url) {
    // TODO ajouter un loader pendant le chargement
    const target = '#' + url.split('#')[1];
    console.log(target);
    const existingModal = document.querySelector(target);
    if (existingModal !== null) return existingModal;
    const html = await fetch(url).then(response => response.text());
    console.log(html);
    const fragment = document.createRange().createContextualFragment(html);
    console.log(fragment);
    const element = fragment.querySelector(target)
    console.log(element);
    if (element === null) throw `L'élément ${target} n'existe pas dans la page ${url}`;
    // ici devrait mettre des try and catch ... plus tard
    document.body.appendChild(element);
    return element;
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




