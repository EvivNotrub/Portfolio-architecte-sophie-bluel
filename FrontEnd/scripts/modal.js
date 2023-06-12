import { openModalLinkSetup, closeModalLinkSetup, removeCloseModalLinkSetup } from "./modalLink.js";
import { getFocusables, focusInModal, focusables} from "./focus.js";
import { actionEditImage, actionAdd, actionEdit, actionEditTxt, actionDelete } from "./modalActions.js";
// import { openModalLinks} from "./works.js";
// let openModalLinks2 = [];
let closeModalLinks = [], openModalLinks = [], previouslyFocusedElement = null;
export let modal = null;
let works;
const arrow = document.getElementById('modal__arrow');

export const MODAL_TYPE = {
    ADD_FORM: 'add_form',
    EDIT_WORK: 'edit_work',
    GALLERY: 'gallery',
    EDIT_TEXT: 'edit_text',
    EDIT_IMAGE: 'edit_image'
};

function renderWorksCards(options) {
    works = options.data;
    console.log("==> renderWorksCards\n", "options :", options);
    const worksGallery = options.data.map((work) => (`
    <a data-id="${work.id}" data-title="${work.title}" data-cat="${work.category.name}" href="#" class="js-modal" data-version="edit_work">
        <div class="modal__icons">
            <span class="icon-bin material-symbols-outlined modal-action-delete-item" data-id="1">delete</span>
            <span class="icon-drag material-symbols-outlined">drag_pan</span>
        </div>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>éditer</figcaption>
    </a>
    `));
    return       `<h3 id="modal__title" class="modal__title">Galerie Photos</h3>
    <div class="modal__content">
        <div id="galleryModal" class="galleryModal">
            ${worksGallery.join('')}
        </div>
    </div>
    
    <div class="modal__footer">
        <div class="modal__line"></div>
        <button class="js-modal rnd-button rnd-button--green modal__action" type="button" href="#" data-version="add_form" data-id="add">Ajouter une photo</button>
    </div>`;    
}

    //  options.data.map((work) => (`
    //     <div>
    //         <a href="#?work=${work.id}" class="modal-action-delete-item">x</a>
    //         <div>${work.imageUrl}</div>
    //         <div>${work.title}</div>
    //         <div>${work.id}</div>
    //     </div>
    // `));


// function renderAddWorkForm(options) {
//     return `
// <form id="modal__form" class="modal__form" action="#">
//     <div class="modal__content">
//         <div class="modal__form__imgDiv">
//             <!-- i want to change the name displayed in the input type file -->
//             <label for="add-photo-input" class="material-symbols-outlined add-photo-label">
//                 imagesmode
//                 <span class="add-photo-button">+ Ajouter photo</span>
//                 <span class="add-photo-specs">jpg, png: 4mo max</span>
//             </label>
//             <input id="add-photo-input"class="add-photo-input"  type="file" accept=".png, .jpg, .jpeg" name="+ Ajouter photo">
//         </div>
//         <div class="file-input-info">
//             <label for="img-title">Titre</label>
//             <input type="text" name="img-title" id="img-title">
//         </div>
//         <div class="file-input-info">
//             <label for="img-category">Catégorie</label>
//             <select id="img-category">
//                 <!-- here we add the category options using the API response and category availables -->
//             </select>
//         </div>
//     </div>
//     <div class="modal__footer">
//         <div class="modal__line"></div>
//         <button type="submit" class="modal-action-add">Valider</button>
//     </div>
// </form>
//     `;
// }

function renderAddWorkForm(options) {
    return `
    <h3 id="modal__title" class="modal__title">Ajout photo</h3>
    <div class="modal__content">
        <form id="modal__form-add" class="modal__form" action="#">
                <div class="modal__form__imgDiv">
                    <!-- i want to change the name displayed in the input type file -->
                    <label for="add-photo-input" class="material-symbols-outlined add-photo-label">
                        imagesmode
                        <span class="add-photo-button">+ Ajouter photo</span>
                        <span class="add-photo-specs">jpg, png: 4mo max</span>
                    </label>
                    <input id="add-photo-input" class="add-photo-input" type="file" accept=".png, .jpg, .jpeg" name="+ Ajouter photo" required="">
                </div>
                <div class="file-input-info">
                    <label for="img-title">Titre</label>
                    <input type="text" name="img-title" id="img-title" required="">
                </div>
                <div class="file-input-info">
                    <label for="img-category">Catégorie</label>
                    <select id="img-category" required=""><!-- here we add the category options using the API response and category availables -->
                        <option value="1">Objets</option>
                        <option value="2">Appartements</option>
                        <option value="3">Hotels &amp; restaurants</option>
                    </select>
                </div>
        </form>
    </div>
    <div class="modal__footer">
        <div class="modal__line"></div>
        <button class="js-modal rnd-button rnd-button--green modal__action modal-action-add" type="submit" data-version="gallery" href="#modal" form="modal__form-add">Valider</button>
    </div>
    `;
}

// function renderEditWorkForm(options) {
    
//     return `
//     <h3 id="modal__title" class="modal__title">Éditer la Photo</h3>
// 	<div class="modal__content">
//         <form id="modal__form" class="modal__form" action="#">
//             <div class="modal__form__imgDiv">
//                 <!-- i want to change the name displayed in the input type file -->
//                 <label for="add-photo-input" class="material-symbols-outlined add-photo-label">
//                 imagesmode
//                 <span class="add-photo-button">+ Ajouter photo</span>
//                 <span class="add-photo-specs">jpg, png: 4mo max</span>
//                 </label>
//                 <input id="add-photo-input"class="add-photo-input"  type="file" accept=".png, .jpg, .jpeg" name="+ Ajouter photo">
//             </div>
//         <div class="file-input-info">
//             <label for="img-title">Titre</label>
//             <input type="text" name="img-title" id="img-title" placeholder="${options.imgTitle}">
//         </div>
//         <div class="file-input-info">
//             <label for="img-category">Catégorie</label>
//             <select id="img-category">
//                 <!-- here we add the category options using the API response and category availables -->
//             </select>
//         </div>
//         </div>
//         </form>
//     </div>
// 	<div class="modal__footer">
// 		<div class="modal__line"></div>
// 		<button type="submit" form="modal__form" class="rnd-button rnd-button--green modal__action">Éditer</button>
// 	</div>

//     `;
// }


function renderEditWorkForm(options) {
    
    return `
				<h3 id="modal__title" class="modal__title">Éditer la photo</h3>
				<div class="modal__content">
                    <form id="modal__form-edit-work" class="modal__form" action="#">
                            <div class="modal__form__imgDiv">
                                <label for="add-photo-input" class="material-symbols-outlined add-photo-label">
                                    imagesmode
                                    <span class="add-photo-button">+ Ajouter photo</span>
                                    <span class="add-photo-specs">jpg, png: 4mo max</span>
                                </label>
                                <input id="add-photo-input" class="add-photo-input" type="file" accept=".png, .jpg, .jpeg" name="+ Ajouter photo" required="">
                            </div>
                            <div class="file-input-info">
                                <label for="img-title">Titre</label>
                                <input type="text" name="img-title" id="img-title" required="" placeholder="${options.imgTitle}">
                            </div>
                            <div class="file-input-info">
                                <label for="img-category">Catégorie</label>
                                <select id="img-category" required=""><!-- here we add the category options using the API response and category availables -->
                                    <option value="1">Objets</option>
                                    <option value="2">Appartements</option>
                                    <option value="3">Hotels &amp; restaurants</option>
                                </select>
                            </div>
                    </form>
                </div>
				<div class="modal__footer">
					<div class="modal__line"></div>
					<button class="js-modal rnd-button rnd-button--green modal__action modal-action-edit-work" type="submit" data-version="gallery" href="#modal" form="modal__form-edit-work">Valider</button>
				</div>
    `;
}

function renderEditImageFrom(options) {
    return `

    <h3 id="modal__title" class="modal__title">Éditer la photo</h3>
    <div class="modal__content">
        <form id="modal__form-edit-img" class="modal__form" action="#">
            <div class="modal__form__imgDiv">
                <!-- i want to change the name displayed in the input type file -->
                <label for="add-photo-input" class="material-symbols-outlined add-photo-label" style="background-image: url(&quot;http://127.0.0.1:5501/FrontEnd/assets/images/sophie-bluel.png&quot;); background-size: cover;">
                    imagesmode
                    <span class="add-photo-button">+ Ajouter photo</span>
                    <span class="add-photo-specs">jpg, png: 4mo max</span>
                </label>
                <input id="add-photo-input" class="add-photo-input" type="file" accept=".png, .jpg, .jpeg" name="+ Ajouter photo">
            </div>
            <div class="file-input-info">
                <label for="img-title">Texte alternatif</label>
                <input type="text" name="img-title" id="img-title">
            </div>
            <div class="file-input-info">
            </div>
        </form>
    </div>
    <div class="modal__footer">
        <div class="modal__line"></div>
        <button type="submit" class="rnd-button rnd-button--green modal__action modal-action-edit-image" form="modal__form-edit-img">Valider</button>
    </div>
    `;
}

function renderEditText(options) {
    return `
    <h3 id="modal__title" class="modal__title">Changer le texte</h3>
    <div class="modal__content">
        <form id="modal__form-edit-txt" class="modal__form" action="#">
                <div class="about-input">
                    <label for="about-title">Titre d'introduction</label>
                    <input type="text" name="about-title" id="about-title">
                </div>
                <div class="about-input">
                    <label for="about-txt">Éditer la description</label>
                    <textarea name="about-txt" id="about-txt" cols="1000" rows="1000"></textarea>
                </div>
        </form>
    </div>
    <div class="modal__footer">
        <div class="modal__line"></div>
        <button type="submit" class="rnd-button rnd-button--green modal__action modal-action-edit-text" form="modal__form-edit-txt">Valider</button>
    </div>
    `;
}

function renderModalContent(type = MODAL_TYPE.GALLERY, options) {
    let modalContent;
    
    switch (type) {
        case MODAL_TYPE.ADD_FORM:

            modalContent = renderAddWorkForm(options);
            break;
        case MODAL_TYPE.EDIT_WORK:

            modalContent = renderEditWorkForm(options);
            break;
        case MODAL_TYPE.GALLERY:
        default:

            modalContent = renderWorksCards(options);
            break;
        case MODAL_TYPE.EDIT_TEXT:
 
            modalContent = renderEditText(options);
            break;
        case MODAL_TYPE.EDIT_IMAGE:

            modalContent = renderEditImageFrom(options);
            break;
    }
    return modalContent;
}


export function openModal(type = MODAL_TYPE.GALLERY, options = {}) {
    console.log('===> openModal with type: ', type, 'options : ', options);
    previouslyFocusedElement = document.querySelector(':focus');
    modal = document.querySelector('#myModal');
    const modalBody = document.querySelector('.modal__body');
    modalBody.innerHTML = renderModalContent(type, options);
    console.log('===> arrow', arrow, 'options.arrow', options.arrow);
    if (options.arrow) {
        arrow.classList.add('js-modal');
        arrow.style.transform = "scale(1)";
     }else{
        arrow.classList.remove('js-modal');
        arrow.style.transform = "scale(0)";
     }
    openModalLinks = openModalLinkSetup(works, modal);
    console.log('===> openModalLinksModal', openModalLinks);
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.style.display = "";
    
    const modalActionAddButton = document.querySelector('.modal-action-add');
    modalActionAddButton && modalActionAddButton.addEventListener('click', actionAdd);

    const modalActionEditButton = document.querySelector('.modal-action-edit-work');
    modalActionEditButton && modalActionEditButton.addEventListener('click', actionEdit);

    document.querySelectorAll('.modal-action-delete-item').forEach( modalActionDeleteButton => {
        modalActionDeleteButton && modalActionDeleteButton.addEventListener('click', actionDelete);
    });

    const modalActionEditImageButton = document.querySelector('.modal-action-edit-image');
    modalActionEditImageButton && modalActionEditImageButton.addEventListener('click', actionEditImage);

    const modalActionEditTextButton = document.querySelector('.modal-action-edit-text');
    modalActionEditTextButton && modalActionEditTextButton.addEventListener('click', actionEditTxt);
    
    getFocusables(options.arrow);
    focusables[2].focus();

    // When the user clicks anywhere outside of the modal, it closes
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    closeModalLinks = closeModalLinkSetup(closeModalLinks, modal);
}

function removeActionEventListerner() {


    const modalActionAddButton = document.querySelector('.modal-action-add');
    modalActionAddButton && modalActionAddButton.removeEventListener('click', actionAdd);

    const modalActionEditButton = document.querySelector('.modal-action-edit-work');
    modalActionEditButton && modalActionEditButton.removeEventListener('click', actionEdit);

    const modalActionEditImageButton = document.querySelector('.modal-action-edit-image');
    modalActionEditImageButton && modalActionEditImageButton.removeEventListener('click', actionEditImage );

    const pictures = document.querySelectorAll('.modal-action-delete-item');
    pictures && pictures.forEach( modalActionDeleteButton => {
            console.log('picture : ', modalActionDeleteButton);
            modalActionDeleteButton.removeEventListener('click', actionDelete);
        });

    const modalActionEditTextButton = document.querySelector('.modal-action-edit-text');
    modalActionEditTextButton && modalActionEditTextButton.removeEventListener('click', actionEditTxt);

}



export function closeModal() {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) {previouslyFocusedElement.focus()};
    modal = document.querySelector('#myModal');
    arrow.classList.remove('js-modal');
    arrow.style.transform = "scale(0)";

    removeActionEventListerner();


    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    closeModalLinks = removeCloseModalLinkSetup(closeModalLinks, modal);
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal)
        modal = null;
    };
    modal.addEventListener('animationend', hideModal)

}

const stopPropagation = function (event) {
    event.stopPropagation();
};

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event);
    }
    if (event.key === "Tab" && modal !== null) {
        focusInModal(event);
    }
});
