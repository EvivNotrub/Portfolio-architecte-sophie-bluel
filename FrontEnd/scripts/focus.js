import { modal } from "./modal.js";
import { alert } from "./alerts.js";

export let focusables = [], alertFocusables = [];
export const focusableSelector = "button, a, input, textarea, select";

export function getModalFocusables(arrow = false) {
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    if (!arrow) {
        focusables = focusables.filter(f => !f.classList.contains("modal__arrow"));
    }
}
export function getAlertFocusables(){
    alertFocusables = Array.from(alert.querySelectorAll(focusableSelector));
    alertFocusables = alertFocusables.filter(element => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.display !== 'none';
      })
    return alertFocusables;
}
export const focusInModal = function (event, container = modal, array = focusables) {
    event.preventDefault();
    let index = array.findIndex(f => f === container.querySelector(':focus'));
    if (event.shiftKey === true){
        index--
    }else{
        index++
    }
    if (index >= array.length) {
        index = 0;
    }
    if (index < 0 ) {
        index = array.length - 1;
    }
    array[index].focus();
}

