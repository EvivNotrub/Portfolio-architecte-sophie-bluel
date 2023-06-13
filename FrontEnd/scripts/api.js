export async function getWorks() {    
    const worksResponse = await fetch('http://localhost:5678/api/works');
    const works = await worksResponse.json();
    return works;
};

export async function getCategories() {
    const categoriesResponse = await fetch('http://localhost:5678/api/categories');
    const categories = await categoriesResponse.json();
    return categories;
};

export async function deleteWork(id, token){
    const url = `http://localhost:5678/api/works/${id}`;
    const request = {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
              }
        };
    const response = await fetch( url, request);
    console.log(response);
    return response
}

export async function addWork(bodyData, token) {
    const url = "http://localhost:5678/api/works";      
    const request = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
              },
            body: bodyData
          };
    const response = await fetch( url, request);
    console.log(response);
    return response
}
