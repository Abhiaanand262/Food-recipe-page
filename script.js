const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipieContainer = document.querySelector(".recipie-container");
const recipeDetailsContents = document.querySelector(".recipe-details-contents");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");





// Function to get recepie
const fetchRecepie = async (query)=>{
    recipieContainer.innerHTML = "<h2>Fetching recipes....</h2>"
    try {
        
    
const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response = await data.json();


recipieContainer.innerHTML= "";
response.meals.forEach(meal=>{
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `<img src ="${meal.strMealThumb}">
                            <h3>${meal.strMeal}</h3>    
                            <p><span>${meal.strArea}</span> Dish</p>    
                            <p>Belongs to <span>${meal.strCategory}</span> Category</p>    `



      const button = document.createElement('button');
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

        // Adding evenetListner to recipie button

        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });


      
      
    recipieContainer.appendChild(recipeDiv);
});

} catch (error) {
    recipieContainer.innerHTML = "<h2>Error in Fetching recipes....</h2>"   
}



}


// Function to ingredents and measurment
const fetchIngredents =(meal)=>{
    let ingredientslist = "";
    for(let i=1; i<20; i++){
        const ingredient = meal[`strIngredent${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientslist += `<i>${measure} ${ingredient}</i>`
        }
        else{
            break;
        }
        return ingredientslist;
    }
}
const openRecipePopup = (meal)=>{
    recipeDetailsContents.innerHTML =
    ` <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="ingredientList">${fetchIngredents(meal)}</ul>
        <div class="recipeInstuctions">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
        </div>
    `

                    

    recipeDetailsContents.parentElement.style.display= "block";
}


recipeCloseBtn.addEventListener("click", ()=>{
    recipeDetailsContents.parentElement.style.display= "none";
});




searchBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipieContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecepie(searchInput);
});