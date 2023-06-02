import { removeGallery, removeForm, createModalBody, setModalTexts } from './modalVersions.js';

const focusableSelector = "button, a, input, textarea, select";
let modalLinks, modalButton, focusables = [], modal = null, previouslyFocusedElement = null;

export const closeModal = function (event) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) {previouslyFocusedElement.focus()};
    event.preventDefault();
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    document.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    const element = modal.querySelector(".modal__form");
    console.log(element);
    if (element !== null) element.remove();
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal)
        modal = null;
    }
    removeGallery();
    removeForm();
    modal.addEventListener('animationend', hideModal)
    modalLinkSetup();
    window.localStorage.removeItem("newImageSource");
}
function getFocusables(id) {
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    if (id == null) {
        focusables = focusables.filter(f => !f.classList.contains("modal__arrow"));
        console.log(focusables);
    }
}
export async function openModal (e) {
    console.log(modal);
    e.preventDefault();
    let element;
    console.log(this);
    const id = this.getAttribute("data-id");
    console.log(id);
    removeGallery();
    removeForm();
    // const href = e.getAttribute("href");
    // console.log(href);
    const target = this.getAttribute("href");
    console.log(target);
    if (target.startsWith('#')){
        modal = document.querySelector(target);
        element = modal.querySelector(".modal__form");
        if (element !== null) element.remove();
    } else {
        modal = document.querySelector("#modal");
        element = await loadModal(target);
        console.log(element);
    }
    // modal = document.querySelector(this.getAttribute("href"));
    console.log(modal);
    const modalVersion = this.getAttribute("data-version");
    console.log(modalVersion);
    modalButton = setModalTexts(modal, modalVersion, id);
    await createModalBody(modalVersion, id, element, modalButton);
    getFocusables(id);
    previouslyFocusedElement = document.querySelector(':focus');
    modal.style.display = "";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    document.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    focusables[1].focus();
    // to be able
    modalLinkSetup();
}

const stopPropagation = function (event) {
    event.stopPropagation();
}

const focusInModal = function (event) {
    event.preventDefault();
    console.log(focusables);
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
    console.log(index);
    focusables[index].focus();
}

const loadModal = async function (url) {
    // TODO ajouter un loader pendant le chargement
    const target = '#' + url.split('#')[1];
    console.log(target);
    // const existingModal = document.querySelector(target);
    // console.log(existingModal);
    // if (existingModal !== null) return existingModal;
    const html = await fetch(url).then(response => response.text());
    // console.log(html);
    const fragment = document.createRange().createContextualFragment(html);
    console.log(fragment);
    const element = fragment.querySelector(target)
    console.log(element);
    if (element === null) throw `L'élément ${target} n'existe pas dans la page ${url}`;
    // ici devrait mettre des try and catch ... plus tard
    // document.body.appendChild(element);
    return element;
}
// function modalLinkSetup () {
//     modalLinks = Array.from(document.querySelectorAll('.js-modal'));
//     console.log(modalLinks);
//     modalLinks.forEach( link => {
//         link.removeEventListener("click", function (event) {
//             if (modal != null){ closeModal(event);}
//             openModal( event);
//         });
//         link.addEventListener("click", function (event) {
//             if (modal != null){ closeModal(event);}
//             openModal( event);
//         }, {once: true})
//     });
// }

function modalLinkSetup () {
    modalLinks = Array.from(document.querySelectorAll('.js-modal'));
    console.log(modalLinks);
    modalLinks.forEach( link => {
        link.removeEventListener("click", openModal);
        link.addEventListener("click", openModal, {once: true})
    });
}
modalLinkSetup();

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }
    if (event.key === "Tab" && modal !== null) {
        focusInModal(event);
    }
});




