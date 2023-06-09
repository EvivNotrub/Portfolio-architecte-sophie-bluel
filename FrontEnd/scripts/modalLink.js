import { openModal, closeModal, MODAL_TYPE } from './modal.js';
// import { openModal, MODAL_TYPE } from './modal.js';



export function openModalLinkSetup (openModalLinks, works, container) {
    console.log("==> openModalLinkSetup\n", "openModalLinks setup EL before :", openModalLinks);
    if (!!openModalLinks) {
        openModalLinks.forEach( link => {
            link.removeEventListener('click', openModal);
        })
    };

    openModalLinks = Array.from(container.querySelectorAll('.js-modal'));
        console.log("openModalLinks setup EL after :", openModalLinks);
    openModalLinks.forEach( link => {
        link.removeEventListener('click', openModal);
        link.addEventListener('click', () => openModal(MODAL_TYPE.EDIT_FORM, { data: works }))
    });
    return openModalLinks;
}

export function closeModalLinkSetup (closeModalLinks, container) {
    console.log("==> closeModalLinkSetup\n", "closeModalLinks set EL before :\n", closeModalLinks);
    if (!!closeModalLinks) {
        closeModalLinks.forEach( link => {
            link.removeEventListener('click', closeModal);
        })
    };
    closeModalLinks = Array.from(container.querySelectorAll('.js-modal-close'));
    console.log("closeModalLinks set EL after:\n", closeModalLinks);
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
        console.log('===> link', link);
        link.addEventListener('click', closeModal)
    });
    return closeModalLinks;
}
export function removeCloseModalLinkSetup (closeModalLinks, container) {
    console.log("==> removeCloseModalLinkSetup\n", "closeModalLinks rmvEL before :\n", closeModalLinks);
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
    });
    return closeModalLinks;
}