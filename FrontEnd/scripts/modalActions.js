
export function actionAdd() {
    // fire add action
}

export function actionEdit(event) {
    // fire edit action
    event.preventDefault();
    console.log('===> modalActionEditButton', event)
}

export function actionEditImage(event) {
    // fire edit image action
    console.log('===> modalActionEditImageButton', event)
}

export function actionDelete(event) {
    // fire delete action
    event.stopPropagation();
    alert('delete item !');
    console.log('===> modalActionDeleteButton', event.target.href)
}

export function actionEditTxt(event) {
    // fire edit text action
    console.log('===> modalActionEditTextButton', event.target.href)
}