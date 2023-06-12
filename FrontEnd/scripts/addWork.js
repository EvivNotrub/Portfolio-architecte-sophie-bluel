export async function actionAdd() {
    console.log("===> action add validation");
    // console.log( addPhotoInput, titleInput, categoryInput);
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(photoForm);
    const files = addPhotoInput.files;
    const file = files[0];
  
    if(photoForm.reportValidity() && validFileType(files) && validFileSize(files)){      
        console.log("form valid")
       }else{
        // await customAlert("error", {headers:"Erreur de formulaire !", body: "Merci de bien renseigner tous les champs et de vérifier si l'image est au bon format.."});
        if(!validFileType(files)){
          console.log("file type not valid");
        }
        if(!validFileSize(files)){
          console.log("file size not valid");
        }
        if(!titleInput.valid){
          console.log("Please enter a title");
        }
        if(!categoryInput.valid){
          console.log("Please choose a category");        
        }
        return;
       }
  
       const formDataAdd = new FormData();
          formDataAdd.append("image", file);
          formDataAdd.append("title", titleInput.value);
          formDataAdd.append("category", categoryInput.value);
          console.log(formDataAdd);      
            url = "http://localhost:5678/api/works";      
            request = {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`
                },
              body: formDataAdd
            };
            // if(!await customAlert("warning", {headers: "Action requise !" , body: "Êtes-vous sûr de vouloir ajouter cette photo ?"})){
            //   return;
            // }
            if(confirm("Êtes-vous sûr de vouloir ajouter cette photo ?")){
                const response = await fetch( url, request);
                    if(response.ok){
                        // await customAlert("success", {body: "Votre photo a bien été ajoutée !"});
                    
                    Promise.resolve(response);
                    }else{
                    console.log("not ok");
                    Promise.reject(response.status);
                    return
                    }
            }else{
                alert("Annulation de l'ajout de la photo");
                return;
            }
  }