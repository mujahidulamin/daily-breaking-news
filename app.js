const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
}

const displayCategory = categories =>{
    console.log(categories);
    
     const categoryContainer = document.getElementById('category-container');
     categories.forEach(category => {
     const categoryList = document.createElement('div'); 
    categoryList.innerHTML = `
     <button type="button" class="btn btn-outline-primary list-group-item m-2 rounded" onclick = "loadNewsDetails('${category.category_id}')">${category.category_name}</button> 
    `
    categoryContainer.appendChild(categoryList);
     }) 
     
}

const loadNewsDetails = async(newsId) => {
    // console.log(newsId);
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`

    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }catch(error){
        console.log(error);
    }
 
}

const displayNewsDetails = details => {
    console.log(details);

    const displayNewsContainer = document.getElementById('display-news-container');
    displayNewsContainer.innerHTML = ``;
    
    details.forEach(detail =>{
    const displayDiv = document.createElement('div');
    displayDiv.classList.add('col');
    displayDiv.innerHTML = `
    <div class="card h-100 p-3">
    <img src="${detail.thumbnail_url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title fw-bolder">${detail.title}</h5>
      <p class="card-text">${detail.details.slice(0, 200)}...</p>
      <div>
        <img style="width: 50px; height: 50px;" class = " border-radious" src ="${detail.author.img}">
        <span">${detail.author.name ? detail.author.name : 'No name Found'}</span> 

        <p class = "ms-2 mt-2 d-inline"><i class="fa-solid fa-eye"></i> ${detail.total_view ? detail.total_view : '0' }M </p>
        <p class = "ms-5 ps-5">
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </p>

        <button onclick = "displayModal('${detail.image_url}', '${detail.title}', '${detail.author.name ? detail.author.name : 'No name Found'}', '${detail.author.img}', '${detail.total_view ? detail.total_view : '0'}M', '${detail.author.published_date}')" class = "border-0 bg-white ms-auto d-flex justify-content-end" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa-sharp fa-solid fa-arrow-right text-primary fw-bolder fs-3"></i> </button>
        
      </div>
    </div>
    `
    displayNewsContainer.appendChild(displayDiv);
    
    })
    
}

loadCategory();