import { getCategories as getCategoriesData, getWorks } from './api.js';
import { openModalLinkSetup, closeModalLinkSetup} from './modalLink.js';
import { filters } from './filters.js';

let openModalLinks = [], categories;
export let token;

const loginButton = document.querySelector("#login-link");

function toggleEditMode(toDisplay = false) {
    const edits = document.querySelectorAll(".edit");
    if (!toDisplay) {
        edits.forEach( edit => edit.style.display = "none");
    } else {
        edits.forEach( edit => edit.style.display = "");
    }
}

function checkAuthentication() {
    token = window.localStorage.getItem('token');
    if(!token) {
        toggleEditMode();
        loginButton.innerText = "login";
    } 
    else {
        loginButton.innerText = "logout";
        toggleEditMode(true);
    }
}

loginButton.addEventListener("click", async function(event){
    event.preventDefault();
    if (loginButton.innerText === "logout"){
        window.localStorage.removeItem("token");
        checkAuthentication();
        await renderFilters();
        filters();
    }else{
        window.location = "./pages/login.html";
    };
});

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

async function renderFilters() {
    categories = await getCategoriesData();
    categories.unshift({ id: 0, name: 'Tous' });
    const filtersElement = document.querySelector(".filters");
    for (let i in categories) {
        renderFilterComponent(categories[i], filtersElement);
    }
}

function renderWorkCard(work, parent) {
    const workElement = document.createElement("figure");
    const workImage = document.createElement("img")
    const workTitle = document.createElement("figcaption");
    workElement.dataset.id = work.category.id;
    workElement.dataset.cat = work.category.name;
    workElement.dataset.title = work.title;
    workImage.src = work.imageUrl;
    workImage.alt = work.title;
    workTitle.textContent = work.title;
    workElement.appendChild(workImage);
    workElement.appendChild(workTitle);
    parent.appendChild(workElement);
}


export async function renderWorkCards() {
    const works = await getWorks();
    const galleryElement = document.querySelector(".gallery");
    galleryElement.innerHTML = "";
    return works.map((work, index) => renderWorkCard(work, galleryElement));
}

async function main(){
    checkAuthentication();

    renderWorkCards();

    if(!token){
        await renderFilters();
        filters();  
    }
    
    openModalLinks = openModalLinkSetup(document);
}

await main();

