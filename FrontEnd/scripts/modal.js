import { closeModalLinkSetup, removeCloseModalLinkSetup } from "./modalLink.js";
import { getFocusables, focusInModal, focusables} from "./focus.js";
let closeModalLinks = [], previouslyFocusedElement = null;
export let modal = null;

export const MODAL_TYPE = {
    ADD_FORM: 'add_form',
    EDIT_FORM: 'edit_form',
    GALLERY: 'gallery',
};

function renderWorksCards(options) {
    return options.data.map((work) => (`
        <div>
            <a href="#?work=${work.id}" class="modal-action-delete-item">x</a>
            <div>${work.imageUrl}</div>
            <div>${work.title}</div>
            <div>${work.id}</div>
        </div>
    `));
}

function renderAddWorkForm(options) {
    return `
    <form id="modal__form" class="modal__form" action="#">
    <div class="modal__form__imgDiv">
        <!-- i want to change the name displayed in the input type file -->
        <label for="add-photo-input" class="material-symbols-outlined add-photo-label">
            imagesmode
            <span class="add-photo-button">+ Ajouter photo</span>
            <span class="add-photo-specs">jpg, png: 4mo max</span>
        </label>
        <input id="add-photo-input"class="add-photo-input"  type="file" accept=".png, .jpg, .jpeg" name="+ Ajouter photo">
    </div>
    <div class="file-input-info">
        <label for="img-title">Titre</label>
        <input type="text" name="img-title" id="img-title">
    </div>
    <div class="file-input-info">
        <label for="img-category">Catégorie</label>
        <select id="img-category">
            <!-- here we add the category options using the API response and category availables -->
        </select>
    </div>  
</form>
    `;
}

function renderEditWorkForm(options) {
    return `
        <form>
            <input name="title" placeholder="Titre" />
            <button type="submit" class="modal-action-edit">Valider</button>
        </div>
    `;
}

function renderModalContent(type = MODAL_TYPE.GALLERY, options) {
    let modalContent;
    switch (type) {
        case MODAL_TYPE.ADD_FORM:
            modalContent = renderAddWorkForm(options);
            break;
        case MODAL_TYPE.EDIT_FORM:
            modalContent = renderEditWorkForm(options);
            break;
        case MODAL_TYPE.GALLERY:
        default:
            modalContent = renderWorksCards(options);
            break;
    }
    return modalContent;
}


export function openModal(type = MODAL_TYPE.GALLERY, options = {}) {
    console.log('===> openModal', type, options);
    previouslyFocusedElement = document.querySelector(':focus');
    modal = document.querySelector('#myModal');
    const modalBody = document.querySelector('.modal__body');
    modalBody.innerHTML = renderModalContent(type, options);
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.style.display = "";



    const modalActionAddButton = document.querySelector('.modal-action-add');
    modalActionAddButton && modalActionAddButton.addEventListener('click', function() {
        // fire add action
    });

    const modalActionEditButton = document.querySelector('.modal-action-edit');
    modalActionEditButton && modalActionEditButton.addEventListener('click', function(event) {
        // fire edit action
        event.preventDefault();
        console.log('===> modalActionEditButton', event)
    });

    const modalActionDeleteButton = document.querySelector('.modal-action-delete-item');
    modalActionDeleteButton && modalActionDeleteButton.addEventListener('click', function(event) {
        // fire delete action
        console.log('===> modalActionDeleteButton', event.target.href)
    });


    getFocusables();
    focusables[2].focus();

    // When the user clicks anywhere outside of the modal, it closes
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    closeModalLinks = closeModalLinkSetup(closeModalLinks, modal);
}

export function closeModal() {
    if (modal === null) return;
    modal = document.querySelector('#myModal');
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
