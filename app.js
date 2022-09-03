const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategory = categories => {
    console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryList = document.createElement('div');
        categoryList.innerHTML = `
     <button id = "spinner" type="button" class="btn btn-outline-primary list-group-item m-2 rounded" onclick = "loadNewsDetails('${category.category_id}') ">${category.category_name}</button> 
    `
        categoryContainer.appendChild(categoryList);
        
    })
    
}

const loadNewsDetails = async (newsId) => {
    // console.log(newsId);
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    } catch (error) {
        console.log(error);
    }

}

const displayNewsDetails = details => {
    console.log(details);

    //sorting all the fetching data by total_view
    details.sort((a, b) => {
        return b.total_view - a.total_view;
    })

    //items found massage
    const noPhoneMeassage = document.getElementById('message');
    if (details.length !== 0) {
        noPhoneMeassage.innerHTML = `<h4 class = "ms-3">${details.length} items found for this category</h4>`
    } else {
        noPhoneMeassage.innerHTML = `<h2>No items found for this category</h2>`
    }

    const displayNewsContainer = document.getElementById('display-news-container');
    displayNewsContainer.innerHTML = ``;

    details.forEach(detail => {
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

        <p class = "ms-2 mt-2 d-inline"><i class="fa-solid fa-eye"></i> ${detail.total_view ? detail.total_view : '0'}M </p>
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
   
   toggleSpinner(false);
}






// spinner function
const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    } else {
        loadingSpinner.classList.add('d-none');
    }
}


//display modal
const displayModal = (img, title, author, authorImg, view, pDate) => {
    console.log(img, title, author, authorImg, view, pDate);
    const modalContainer = document.getElementById('exampleModalLabel');
    modalContainer.innerText = title;
    const modalDetail = document.getElementById('modalDetail');
    modalDetail.innerHTML = ` 
    <img " class = "img-fluid" src="${img}" alt="">
    <div>
    <img style="width: 50px; height: 50px;" class = "mt-1 border-radious" src ="${authorImg}">
    <span class = "">${author ? author : 'No name found'}</span>
    <span class = "ms-5"> <i class="fa-solid fa-eye"></i> ${view} </span>
    <span class = "ms-5">
    <i class="fa-solid fa-star-half-stroke"></i>
    <i class="fa-regular fa-star"></i>
    <i class="fa-regular fa-star"></i>
    <i class="fa-regular fa-star"></i>
    <i class="fa-regular fa-star"></i>
    </span>
    <p class = "mt-3 ms-5 ps-5"> <span class = "fw-bolder">Published Date:</span> ${pDate}</p>
    </div>
    
    `
}
loadNewsDetails('08');
loadCategory();
