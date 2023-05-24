

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

let categories;

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
    categories = await getCategories();
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
    await createCategoriesFilters();
}

await main();

/*************  FILTERS  *************/

    
const articles = document.querySelectorAll("figure[data-id]");
const checkBoxs = document.querySelectorAll(".filterCheck");

   /****tool functions for filters****/
   function uncheck(method = "target", value){
        for (let i = 0; i < checkBoxs.length; i++){
            if (method == "except" && checkBoxs[i].dataset.id !== value) {
                checkBoxs[i].checked = false;
            }else if(method == "target" && checkBoxs[i].dataset.id == value){
                checkBoxs[i].checked = false;
            }
        };
   }
   function allUnchecked() {
    let state = true;
    for (let i = 0; i < checkBoxs.length; i++) {
        if(checkBoxs[i].checked == true){
            state = false;
        };
    }
    return state
}
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
    function hide(value = "all"){
        for (let i=0; i<articles.length; i++){
            if (value == "all" || articles[i].dataset.id == value) {
                articles[i].style.display = "none";
            }
        };
    }
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

    function toogle(check, id) {
        if(check.checked == true){
            show(id)
        }else{
            hide(id)
        }
    }


/***** main filter functiom *****/
function filter(){    
    let marker = true;
    for (let i = 0; i < checkBoxs.length; i++) {
        const filter = checkBoxs[i];
        const id = filter.dataset.id;
        filter.addEventListener('click', function () {
                if (id == "0") {
                    show("all")
                    marker = true;
                }else if( allUnchecked() ){
                    console.log("all unchecked");
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

 