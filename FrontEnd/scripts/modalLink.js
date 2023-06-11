import { openModal, closeModal, MODAL_TYPE } from './modal.js';
// import { openModal, MODAL_TYPE } from './modal.js';



function setModalTyp(link) {
        let type;
        console.log('===> link', link);
        const version = link.dataset.version; 
        console.log('===> version', version);
        for (const [key, value] of Object.entries(MODAL_TYPE)) {
            if (version == value) {
                type = MODAL_TYPE[key];
                console.log('===> type in linkSetup function: ', type);
            }
        }
        return type;
}

function setModalOptions(link, type, works) {
    let id = link.dataset.id ? link.dataset.id : null;
    let options;
    if(type === "gallery") {
        console.log(works);
        options = { data: works,
                    arrow: false  };
    } else if (type === "edit_work") {
        options = { id: link.dataset.id,
                    category : link.dataset.cat,
                    title : link.dataset.title,
                    arrow: true
                };
    } else if (type === "edit_text") {
        options = { arrow: false };
    } else if (type === "edit_image") {
        options = { arrow: false };
    } else if (type === "add_form") {
        options = { arrow: true };
    }

    console.log('===> options in linkSetup function: ', options);
    return options;
}

export function openModalLinkSetup (openModalLinks, works, container) {
    console.log("==> openModalLinkSetup\n", "openModalLinks setup EL before :", openModalLinks);
    if (!!openModalLinks) {
        openModalLinks.forEach( link => {
            link.removeEventListener('click', openModal);
            console.log('===> link', link, 'removed EL openModal', );
        })
    };
    console.log("input works", works, "input container", container);
    openModalLinks = Array.from(container.querySelectorAll('.js-modal'));
        console.log("openModalLinks setup EL after :", openModalLinks);
        openModalLinks.forEach( link => {

            const type = setModalTyp(link);
            console.log('===> type in linkSetup function: ', type);
            const options = setModalOptions(link, type, works);
            console.log('===> options in linkSetup function: ', options);
            link.removeEventListener('click', openModal);
            link.addEventListener('click', () => {
                console.log("==>> link click fired");
                openModal(type, options, openModalLinks)
            })
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