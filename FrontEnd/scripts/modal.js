import { closeModalLinkSetup, removeCloseModalLinkSetup } from "./modalLink.js";

let closeModalLinks = [];

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
        <div>
            <input name="title" placeholder="Titre" />
            <button class="modal-action-add">Valider</button>
        </div>
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
    const modal = document.querySelector('#myModal');
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = renderModalContent(type, options);
    modal.style.display = 'block';

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

    // When the user clicks anywhere outside of the modal, it closes!
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    closeModalLinks = closeModalLinkSetup(closeModalLinks, modal);
}

export function closeModal() {
    const modal = document.querySelector('#myModal');
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    closeModalLinks = removeCloseModalLinkSetup(closeModalLinks, modal);
    modal.style.display = 'none';

}

const stopPropagation = function (event) {
    event.stopPropagation();
};