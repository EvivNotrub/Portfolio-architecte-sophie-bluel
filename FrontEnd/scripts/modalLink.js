import { openModal, closeModal } from './modal.js';
import { getWorks } from './api.js';

async function setModalOptions(link, type) {
    let id = link.dataset.id ? link.dataset.id : null;
    let options;
    if(type === "gallery") {
        const works = await getWorks();
        options = { data: works,
                    arrow: false  };
    } else if (type === "edit_work") {
        options = { id: link.dataset.id,
                    categoryId : link.dataset.catid,
                    title : link.dataset.title,
                    url : link.dataset.url,
                    arrow: true
                };
    } else if (type === "edit_text") {
        options = { arrow: false };
    } else if (type === "edit_image") {
        options = { arrow: false };
    } else if (type === "add_form") {
        options = { arrow: true };
    }
    return options;
}

export function openModalLinkSetup ( container = document) {

    const openModalLinks = Array.from(container.querySelectorAll('.js-modal'));
        openModalLinks.forEach( async link => {

            const type = link.dataset.version;
            link.classList.remove("js-modal");
            link.addEventListener('click', async () => {
                const options = await setModalOptions(link, type);
                openModal(type, options)
            })
        });
    return openModalLinks;
}

export function removeOpenModalLinkSetup (modal) {
    const openModalLinks = modal.querySelectorAll(".js-modal");
    openModalLinks && openModalLinks.forEach( link => {
        link.classList.remove("js-modal");
        link.removeEventListener('click', () => {
            openModal(type, options)
        });
    });
}

export function closeModalLinkSetup (closeModalLinks, container) {
    if (!!closeModalLinks) {
        closeModalLinks.forEach( link => {
            link.removeEventListener('click', closeModal);
        })
    };
    closeModalLinks = Array.from(container.querySelectorAll('.js-modal-close'));
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
        link.addEventListener('click', closeModal)
    });
    return closeModalLinks;
}
export function removeCloseModalLinkSetup (closeModalLinks) {
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
    });
    return closeModalLinks;
}