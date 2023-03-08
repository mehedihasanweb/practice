const mealButton = document.getElementById('food-name')
mealButton.addEventListener('keyup', function (event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        getMealFetchData()
    }
})
/* get meal data function */


const getMealFetchData = (limit) => {
    const foodName = document.getElementById('food-name').value
    console.log(foodName);
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.meals === null){
            alert('NOT FOUND')
            return;
        }
        else{
            showMealData(data.meals, limit)
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}
// console.log(foodName);


/* show meal details function */
const showMealData = (data, limit) => {
    console.log(data.length);
    document.getElementById('food-container').innerHTML = ''
    const foodContainer = document.getElementById('food-container')
    const seeMoreBtn = document.getElementById('see-more-btn')
    

    if(data.length > 9 && limit === 9){
        data = data.slice(0, 9)
        seeMoreBtn.classList.remove('d-none')
    }else{
        seeMoreBtn.classList.add('d-none')
    }
    data.map(details => {
        // console.log(details);
        foodContainer.innerHTML += `
        <div class="col">
        <div class="card h-100">
        <img src="${details.strMealThumb}" class="p-2 rounded image-fluid card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title fs-3">${details.strMeal}</h5>
        <p class="card-text">${details.strInstructions.slice(0,100)}...</p>
        <button onclick="showFoodDetails('${details.idMeal}')" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
        </div>
        </div>
        `
    })
}
/* show food details */
const showFoodDetails = (id) =>{
    // console.log(id);
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(URL)
    .then(res => res.json())
    .then(data =>{
        showFoodDetailsData(data.meals[0]);
    })
}

const showFoodDetailsData = (detailsData) =>{
    console.log(detailsData);
    const {strMealThumb, strCategory,strArea, strInstructions,strYoutube} = detailsData
    document.getElementById('modal-container').innerHTML = '';
    const foodModalContainer = document.getElementById('modal-container');
    const div = document.createElement('div')
    div.classList.add('modal-content')
    div.innerHTML = `

    <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${detailsData.strMeal}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${strMealThumb}" class="img-fluid" alt="">
        <p class="m-0 pt-3"><span class="fw-semibold">Category:</span> ${strCategory}</p>
        <p class="m-0 pt-2"><span class="fw-semibold">Area:</span> ${strArea}</p>
        <p class="m-0 pt-2"><span class="fw-semibold">Instruction:</span> ${strInstructions}</p>
        <p class="m-0 pt-2"><span class="fw-semibold">Youtube:</span><a href="${strYoutube}">${strYoutube}</a></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    `
    foodModalContainer.appendChild(div)
}



// click see all data  show all meals data
document.getElementById('see-more-btn').addEventListener('click', function(){
    console.log('click');
    document.getElementById('food-container').innerHTML = '';
    const food = document.getElementById('food-name').value
    getMealFetchData(food)
})



getMealFetchData(9)