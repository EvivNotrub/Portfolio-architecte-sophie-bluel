import { openModal, closeModal, MODAL_TYPE } from './modal.js';
// import { openModal, MODAL_TYPE } from './modal.js';



export function openModalLinkSetup (openModalLinks, works, container) {
    if (!!openModalLinks) {
        console.log("openModalLinks setup EL before :");
        console.log(openModalLinks);
        openModalLinks.forEach( link => {
            link.removeEventListener('click', openModal);
        })
    };

    openModalLinks = Array.from(container.querySelectorAll('.js-modal'));
        console.log("openModalLinks setup EL after :");
        console.log(openModalLinks);
    openModalLinks.forEach( link => {
        link.removeEventListener('click', openModal);
        link.addEventListener('click', () => openModal(MODAL_TYPE.EDIT_FORM, { data: works }))
    });
    return openModalLinks;
}

export function closeModalLinkSetup (closeModalLinks, container) {
    if (!!closeModalLinks) {
        console.log("closeModalLinks set EL before:");
        console.log(closeModalLinks);
        closeModalLinks.forEach( link => {
            link.removeEventListener('click', closeModal);
        })
    };
    closeModalLinks = Array.from(container.querySelectorAll('.js-modal-close'));
    console.log("closeModalLinks set EL after:");
    console.log(closeModalLinks);
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
        console.log('===> link', link);
        link.addEventListener('click', closeModal)
    });
    return closeModalLinks;
}
export function removeCloseModalLinkSetup (closeModalLinks, container) {
    console.log("==> removeCloseModalLinkSetup");
    console.log("closeModalLinks rmvEL before :");
    console.log(closeModalLinks);
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
    });
    return closeModalLinks;
}