import { filters } from "./filters.js";
import { modalGallerySpecifics } from "./modalVersions.js";
import { customAlert } from "./alerts.js";

export let token;
//Below we check if the user is connected or not.
// If he is, we display the edit mode and change the login button to logout and hide the filters.
// If not, we hide the edit mode, get filters and change the login button to login.
const loginButton = document.querySelector("#login-link");

export async function deletePicture(event, id) {
    event.stopPropagation();
    event.preventDefault();
    console.log(id);

    const confirmation = await customAlert( "warning", {body: "Vous vous appretez à supprimer cette image!\nÊtes-vous sûr de vouloir continuer ?"});
    console.log(confirmation);
    if (confirmation === false){
        return;
    }else if(confirmation){
        const pictureDeleteResponse = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(pictureDeleteResponse);
        await customAlert("success", {body: "Image supprimée avec succès !"});
    }
    
}

function toggleEditMode(action = "hide"){
    const edits = document.querySelectorAll(".edit");
    if (action === "hide"){
        edits.forEach( edit => edit.style.display = "none");
    }else if (action === "show"){
        edits.forEach( edit => edit.style.display = "");
    }
}

function loginButtonAction() {
    const valeurToken = window.localStorage.getItem('token');
    console.log(valeurToken);
    if (valeurToken === null){
    toggleEditMode();
    loginButton.innerText = "login";
    }else{
        loginButton.innerText = "logout";
        toggleEditMode("show");
        token = JSON.parse(valeurToken);
    };
}

loginButtonAction();

loginButton.addEventListener("click", async function(event){
    event.preventDefault();
    if (loginButton.innerText === "logout"){
        window.localStorage.removeItem("token");
        loginButtonAction();
        await createCategoriesFilters();
        filters();
    }else{
        window.location = "./pages/login.html";
    };
});

export async function getWorks() {
    
    const worksResponse = await fetch('http://localhost:5678/api/works');
    const works = await worksResponse.json();
    return works;
    
};
    
export async function getCategories() {
    const categoriesResponse = await fetch('http://localhost:5678/api/categories');
    const categories = await categoriesResponse.json();
    return categories;
};

// let categories;

export async function createProjectContent(containerId, modal = false) {
    const works = await getWorks();
    console.log(works);

    for (let i in works) {

        const gallery = document.querySelector(containerId);

        const work = modal === false ? document.createElement("figure"): document.createElement("a");
        const workImage = document.createElement("img")
        const workTitle = document.createElement("figcaption");
        work.dataset.id = works[i].category.id;
        workImage.src = works[i].imageUrl;
        if (modal === false){
            workTitle.textContent = works[i].title;
        }else{
            const id = works[i].id;
            work.dataset.id = id;
            modalGallerySpecifics(work, workTitle, id);
        }

        gallery.appendChild(work);
        work.appendChild(workImage);
        work.appendChild(workTitle);
    }
};

//Below we create the filters depending on the categories in the database
async function createCategoriesFilters() {
    let categories = await getCategories();
    categories.unshift({id: 0, name: "Tous"});
    console.log(categories);

    const filters = document.querySelector(".filters");
    for (let i in categories) {
        const filter = document.createElement("div");
        filter.classList.add("filter");        
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = categories[i].name;
        checkBox.classList.add("filterCheck");
        checkBox.dataset.id = categories[i].id;
        const button = document.createElement("button");
        button.innerText = categories[i].name;
        button.classList.add("filter-button", "rnd-button", "rnd-button--white");
        filters.appendChild(filter);
        filter.appendChild(checkBox);
        filter.appendChild(button);
    }
}

async function main(){
    await createProjectContent("#gallery");
    if(token == undefined){
        await createCategoriesFilters();
        filters();  
    }
}

await main();

