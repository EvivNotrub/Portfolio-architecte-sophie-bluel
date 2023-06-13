import { openModal, closeModal, MODAL_TYPE } from './modal.js';
// import { openModal, MODAL_TYPE } from './modal.js';
import { getWorks } from './api.js';

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

async function setModalOptions(link, type) {
    let id = link.dataset.id ? link.dataset.id : null;
    let options;
    if(type === "gallery") {
        const works = await getWorks();
        console.log("works from setModalOptions : ",works);
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

export function openModalLinkSetup (works, container = document) {
    console.log("==> openModalLinkSetup\n" );
   
    console.log( "input container", container);
    const openModalLinks = Array.from(container.querySelectorAll('.js-modal'));
        console.log("openModalLinks setup EL after :", openModalLinks);
        openModalLinks.forEach( async link => {

            const type = setModalTyp(link);
            console.log('===> type in linkSetup function: ', type);
            const options = await setModalOptions(link, type);
            console.log('===> options in linkSetup function: ', options);
            link.addEventListener('click', () => {
                console.log("==>> link click fired");
                openModal(type, options)
            })
        });
    return openModalLinks;
}

export function removeOpenModalLinkSetup (modal) {
    console.log("==> removeOpenModalLinkSetup\n");
    const openModalLinks = modal.querySelectorAll(".js-modal");
    console.log("openModalLinks rmvEL before :\n", openModalLinks);
    openModalLinks && openModalLinks.forEach( link => {
        link.classList.remove("js-modal");
        link.removeEventListener('click', () => {
            console.log("==>> link click fired");
            openModal(type, options)
        });
    });
    console.log("openModalLinks rmvEL after :\n", openModalLinks);
}
// export function removeOpenModalLinkSetup (openModalLinks) {
//     console.log("==> removeOpenModalLinkSetup\n", "openModalLinks rmvEL before :\n", openModalLinks);
//     openModalLinks.forEach( link => {
//         link.removeEventListener('click', () => {
//             console.log("==>> link click fired");
//             openModal(type, options)
//         });
//     });
//     return openModalLinks;
// }

export function closeModalLinkSetup (closeModalLinks, container) {
    console.log("==> closeModalLinkSetup\n", "closeModalLinks set EL before :\n", closeModalLinks);
    if (!!closeModalLinks) {
        console.log("closeModalLinks set EL before :\n", closeModalLinks);
        closeModalLinks.forEach( link => {
            console.log('===> link in closeModalLinkSetup', link);
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
export function removeCloseModalLinkSetup (closeModalLinks) {
    console.log("==> removeCloseModalLinkSetup\n", "closeModalLinks rmvEL before :\n", closeModalLinks);
    closeModalLinks.forEach( link => {
        link.removeEventListener('click', closeModal);
    });
    return closeModalLinks;
}