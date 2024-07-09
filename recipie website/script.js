const searchbox=document.querySelector('.searchbox');
const searchbutton=document.querySelector('.searchbutton');
const recipiecontainer = document.querySelector('.recipie-container');
const recipiedetailscontent = document.querySelector('.recipie-details-content');
const recipieclosebutton=document.querySelector('.recipie-closebutton')

//function to get recipies
const fetchRecipies=async (query)=>{
    recipiecontainer.innerHTML="<h2>fetching recipies...</h2>";
    try{

    
const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response=await data.json();

recipiecontainer.innerHTML="";
response.meals.forEach(meal => {
    const recipieDiv=document.createElement('div');
    recipieDiv.classList.add('recipie');
    recipieDiv.innerHTML=`
       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p> <span>${meal.strArea} </span> Dish</p>
       <p>belongs to <span>${meal.strCategory}</span> category</p>
    `

    const button = document.createElement('button');
    button.textContent="view recipie";
    recipieDiv.appendChild(button);

//adding eventlistenenr  to recipie button
button.addEventListener('click', ()=>{
    openrecipiepopup(meal);
})
 
    recipiecontainer.appendChild(recipieDiv);

});
    }
    catch(error){
        recipiecontainer.innerHTML="<h2>fetching recipies...</h2>";
    }
}

//function to fetch ingredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientslist = " ";
    for(let i=1;i<=20;i++){
       const ingredient = meal[`stringredient${i}`];
       if(ingredient){
        const measure=meal[`strMeasure${i}`]; 
            ingredientslist+=`<li>${measure}${ingredient}</li>`
       }
       else{
        break;
       }
    }
    return ingredientslist;
}

const openrecipiepopup =(meal)=>{
 recipiedetailscontent.innerHTML=`
 <h2 class="recipiename"> ${meal.strMeal}</h2>
 <h3>Ingredients:</h3>
 <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
 
 <div class="recipieinstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
 </div>
 ` 
  recipiedetailscontent.parentElement.style.display="block";
}

recipieclosebutton.addEventListener('click',()=>{
recipiedetailscontent.parentElement.style.display="none";
});

searchbutton.addEventListener('click',(e)=>{
   e.preventDefault();
   const searchinput= searchbox.value.trim();
   if(!searchinput){
    recipiecontainer.innerHTML=`<h2>type meal in search box.</h2>`;
    return;
   }
   fetchRecipies(searchinput);
    //console.log("button clicked");
});