import { modal } from "./modal.js";

export let focusables = [];
export const focusableSelector = "button, a, input, textarea, select";

export function getFocusables(arrow = false) {
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    console.log(focusables);
    if (arrow) {
        focusables = focusables.filter(f => !f.classList.contains("modal__arrow"));
        console.log(focusables);
    }
}

export const focusInModal = function (event) {
    event.preventDefault();
    console.log(focusables);
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    console.log(index);
    if (event.shiftKey === true){
        index--
    }else{
        index++
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0 ) {
        index = focusables.length - 1;
    }
    console.log(index);
    focusables[index].focus();
}

