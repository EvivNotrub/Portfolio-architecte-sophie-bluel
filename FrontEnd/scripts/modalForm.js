// import { getWorks } from "./works.js";




// async function createModalGallery (containerId) {
//     const works = await getWorks();
//     console.log(works);

//     for (let i in works) {

//         const gallery = document.querySelector(containerId);

//         const work = document.createElement("figure");
//         const workImage = document.createElement("img")
//         const workTitle = document.createElement("figcaption");
//         work.dataset.id = works[i].category.id;
//         workImage.src = works[i].imageUrl;
//         workTitle.textContent = "éditer";

//         gallery.appendChild(work);
//         work.appendChild(workImage);
//         work.appendChild(workTitle);
//     }
// // };
// const gallery2 = document.createElement("div");
// gallery2.id = "gallery2";
// document.querySelector("modal__content").appendChild(gallery2);
// await createModalGallery ("#gallery2")
console.log("bob");

document.querySelector("#add-photo-input").addEventListener('change', function() {
  console.log("bob");
    console.log(this.files[0]);
    filename = this.files[0].name;
    console.log(filename);
  });