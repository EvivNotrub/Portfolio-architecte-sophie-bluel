import { getCategories as getCategoriesData, getWorks as getWorksData } from './api.js';
// import { openModal, closeModal, MODAL_TYPE } from './modal.js';
import { openModalLinkSetup } from './modalLink.js';

export const openModalLinks = [];
export const closeModalLinks = [];

function toggleEditMode(toDisplay = false) {
    console.log('===> toDisplay', toDisplay);
    const edits = document.querySelectorAll(".edit");
    if (!toDisplay) {
        edits.forEach( edit => edit.style.display = "none");
    } else {
        edits.forEach( edit => edit.style.display = "");
    }
}

// function checkAuthentication() {
//     const token = window.localStorage.getItem('token');
//     const loginButton = document.querySelector("#login-link");
//     if(!token) {
//         toggleEditMode();
//         loginButton.innerText = "login";
//     } 
//     else {
//         loginButton.innerText = "logout";
//         toggleEditMode(true);
//     }
// }
function checkAuthentication() {
    const token = window.localStorage.getItem('token');
    const loginButton = document.querySelector("#login-link");
    loginButton.innerText = !token ? "login" : "logout";
    toggleEditMode(!!token);
}

function renderFilterComponent(category, parent) {
    const filterElement = document.createElement("div");
    filterElement.classList.add("filter");        
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = category.name;
    checkBox.classList.add("filterCheck");
    checkBox.dataset.id = category.id;
    const button = document.createElement("button");
    button.innerText = category.name;
    button.classList.add("filter-button", "rnd-button", "rnd-button--white");
    filterElement.appendChild(checkBox);
    filterElement.appendChild(button);
    parent.appendChild(filterElement);
}

function renderFilters(categories) {
    const filtersElement = document.querySelector(".filters");
    return categories.map((category, index) => renderFilterComponent(category, filtersElement));
}

function renderWorkCard(work, parent) {
    const workElement = document.createElement("figure");
    const workImage = document.createElement("img")
    const workTitle = document.createElement("figcaption");
    workElement.dataset.id = work.category.id;
    workImage.src = work.imageUrl;
    workTitle.textContent = work.title;
    workElement.appendChild(workImage);
    workElement.appendChild(workTitle);
    parent.appendChild(workElement);
}

function renderWorkCards(works) {
    const galleryElement = document.querySelector(".gallery");
    return works.map((work, index) => renderWorkCard(work, galleryElement));
}

async function main(){
    checkAuthentication();

    const works = await getWorksData();
    renderWorkCards(works);

    const categories = await getCategoriesData();
    categories.unshift({ id: 0, name: 'Tous' });
    renderFilters(categories);
    
    openModalLinkSetup(openModalLinks, works, document);
    // const openModalButton = document.querySelector('.edit--portfolio');
    // const closeModalButton = document.querySelector('.modal-close-button');
    // openModalButton.addEventListener('click', () => openModal(MODAL_TYPE.EDIT_FORM, { data: works }));
    // closeModalButton.addEventListener('click', closeModal);
}

await main();

