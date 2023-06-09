import { openModal, closeModal, MODAL_TYPE } from './modal.js';



export function openModalLinkSetup (openModalLinks, works, container) {
    if (openModalLinks !== undefined || openModalLinks !== null) {
        console.log(openModalLinks);
        openModalLinks.forEach( link => {
            link.removeEventListener('click', openModal);
        })
    };

    openModalLinks = Array.from(container.querySelectorAll('.js-modal'));
    console.log(openModalLinks);
    openModalLinks.forEach( link => {
        link.removeEventListener('click', openModal);
        link.addEventListener('click', () => openModal(MODAL_TYPE.EDIT_FORM, { data: works }), {once: true})
    });
}

export function closeModalLinkSetup (closeModalLinks, container) {
    if (closeModalLinks !== undefined || closeModalLinks !== null) {
        console.log(closeModalLinks);
        closeModalLinks.forEach( link => {
            link.removeEventListener('click', closeModal);
        })
    };
    closeModalLinks = Array.from(container.querySelectorAll('.js-modal-close'));
    console.log(closeModalLinks);
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
        console.log('===> link', link);
        link.addEventListener('click', closeModal)
    });
}