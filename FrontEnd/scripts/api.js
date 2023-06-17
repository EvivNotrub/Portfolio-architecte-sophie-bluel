export async function getWorks() {    
  try {
    const worksResponse = await fetch('http://localhost:5678/api/works');
    if (!worksResponse.ok) throw new Error(`Backend responded with ${worksResponse.status} error: ${await worksResponse.text()}`);
    const works = await worksResponse.json();
    return works;
  } catch (error) {
    throw new Error('Could not reach backend', {cause: error});
  }  
};

export async function getCategories() {
  try {
    const categoriesResponse = await fetch('http://localhost:5678/api/categories');
    const categories = await categoriesResponse.json();
    return categories;
  } catch (error){
    throw new Error('Could not reach backend', {cause: error});
  }
};

export async function deleteWork(id, token){
  try {
    const url = `http://localhost:5678/api/works/${id}`;
    const request = {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
              }
        };
    const response = await fetch( url, request);
    if (!response.ok) throw new Error(`Backend responded with ${response.status} error: ${await response.text()}`);
    return response
  } catch (error) {
    throw new Error('Could not reach backend', {cause: error});
  }
}

export async function addWork(bodyData, token) {
  try {
    const url = "http://localhost:5678/api/works";      
    const request = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
              },
            body: bodyData
          };
    const response = await fetch( url, request);
    if (!response.ok) throw new Error(`Backend responded with ${response.status} error: ${await response.text()}`);
    return response
  } catch (error) {
    throw new Error('Could not reach backend', {cause: error});
  }
}
