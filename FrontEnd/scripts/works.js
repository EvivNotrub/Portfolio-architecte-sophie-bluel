
//Below we check if the user is connected or not, and if he is, we display the edit mode
let token, valeurToken = window.localStorage.getItem('token');
if (valeurToken === null){
   const edits = document.querySelectorAll(".edit");
   edits.forEach( edit => edit.style.display = "none");
}else{
   token = JSON.parse(valeurToken);
};

async function getWorks() {
    
    const worksResponse = await fetch('http://localhost:5678/api/works');
    const works = await worksResponse.json();
    return works;
    
};
    
async function getCategories() {
    const categoriesResponse = await fetch('http://localhost:5678/api/categories');
    const categories = await categoriesResponse.json();
    return categories;
};

// let categories;

async function createProjectContent() {
    const works = await getWorks();
    console.log(works);

    for (let i in works) {

        const gallery = document.querySelector(".gallery");

        const work = document.createElement("figure");
        const workImage = document.createElement("img")
        const workTitle = document.createElement("figcaption");
        work.dataset.id = works[i].category.id;
        workImage.src = works[i].imageUrl;
        workTitle.textContent = works[i].title;

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
        button.classList.add("filter-button");
        filters.appendChild(filter);
        filter.appendChild(checkBox);
        filter.appendChild(button);
    }
}

async function main(){
    await createProjectContent();
    if(token == undefined){
        await createCategoriesFilters();   
    }
}

await main();

/*************  FILTERS  *************/
// function uncheckExcept(value){
    //     for (let i = 0; i < checkBoxs.length; i++){
    //         if (checkBoxs[i].dataset.id !== value) {
    //             checkBoxs[i].checked = false;
    //         }
    //     };
    // }
    // function uncheck(value){        
    //     for (let i = 0; i < checkBoxs.length; i++){
    //         if (checkBoxs[i].dataset.id == value) {
    //             checkBoxs[i].checked = false;
    //         }
    //     };
    // }
    // function showAll(){
    //     uncheckExcept("0");
    //     for (let i=0; i<articles.length; i++){
    //         articles[i].style.display = "block";
    //     };
    // }

    // function showCategory(value){
    //     uncheck("0");
    //     for (let i=0; i<articles.length; i++){
    //         if (articles[i].dataset.id == value) {
    //             articles[i].style.display = "block";
    //         }
    //     };
    // }
    // function hideAll(){
    //     for (let i=0; i<articles.length; i++){
    //         articles[i].style.display = "none";
    //     };
    // }
    // function hideCategory(value){
    //     for (let i=0; i<articles.length; i++){
    //         if (articles[i].dataset.id == value) {
    //             articles[i].style.display = "none";
    //         }
    //     };
    // }

const articles = document.querySelectorAll("figure[data-id]");
const checkBoxs = document.querySelectorAll(".filterCheck");

   /****tools for filters****/

   // this function can target an id or all except id : use the first argument:
   function uncheck(method = "target", value){
        for (let i = 0; i < checkBoxs.length; i++){
            if (method == "except" && checkBoxs[i].dataset.id !== value) {
                checkBoxs[i].checked = false;
            }else if(method == "target" && checkBoxs[i].dataset.id == value){
                checkBoxs[i].checked = false;
            }
        };
   }
   // Below function is used to verify if no checkbox is checked after using them,
   // otherwise nothing shows on the page:
   function allUnchecked() {
        let state = true;
            for (let i = 0; i < checkBoxs.length; i++) {
                if(checkBoxs[i].checked == true){
                    state = false;
                };
            }
        return state
    }
    // can show items of "works" depending wether "all" or id is mentionned,
    // and unchecks filters in the same time: 
    function show(value = "all"){
        if(value == "all"){
            uncheck("except", "0");
        }else{
            uncheck("target", "0");
        };
        for (let i=0; i<articles.length; i++){
            if (value == "all" || articles[i].dataset.id == value) {
                articles[i].style.display = "block";
            }
        };
    }
    // can hide items of "works" depending wether "all" or id is mentionned:
    function hide(value = "all"){
        for (let i=0; i<articles.length; i++){
            if (value == "all" || articles[i].dataset.id == value) {
                articles[i].style.display = "none";
            }
        };
    }
    // the switch:
    function toogle(check, id) {
        if(check.checked == true){
            show(id)
        }else{
            hide(id)
        }
    }


/***** main filter function *****/

    /**Below we run through the list of filters and add a listener for each of them
    in order to take action:

    the marker is used to hide other items from works when first using a filter,
    but we don't want the hide function again when another category is checked.
    It needs to be reset when all works are shown.**/

function filter(){    
    let marker = true;
    for (let i = 0; i < checkBoxs.length; i++) {
        const filter = checkBoxs[i];
        const id = filter.dataset.id;
        filter.addEventListener('click', function () {
                if (id == "0" || allUnchecked() ) {
                    show("all")
                    marker = true;
                }else{
                    if(marker == true){
                        hide("all");
                        marker = false;
                    };
                    toogle(filter, id)
                }
        })
    }
}


filter();
