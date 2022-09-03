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

loadCategory();