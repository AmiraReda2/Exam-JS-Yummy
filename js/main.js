// !------------loading-------------// 
$(document).ready(function () {
    $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
    });
});
//! ----------------------get API----------------// 
async function getMeal(){    
 const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
 const finalResult = await apiResponse.json();
 displayMeal(finalResult.meals,0);  
 getMealDetail() 
}
getMeal();
//!-----------get data in API---------------- // 
   function displayMeal(meal,mealNo){
     let container = ``;
     for(let i=0;i<meal.length;i++){
        container +=
        `<div class="col-md-3" id="${meal[i].idMeal}"> 
        <div class="meal rounded-2" id="meal">
       <img class="w-100" src="${meal[i].strMealThumb}" alt="">
       <div class="layer text-black p-2 rounded-2">
        <h3>${meal[i].strMeal}</h3>
       </div>
       </div>
      </div>` 
     }
    $('.meals').eq(mealNo).html(`${container}`);
}
//! --------------------get MealDetails--------------------//
function getMealDetail(){
    document.querySelectorAll('.col-md-3').forEach(item => {
        item.addEventListener('click', event => {
        detalis(item.id);
        $('#loading').fadeIn(50);
        $('#displayDetail').removeClass("nonActive")
        $('#displayDetail').siblings().addClass("nonActive");
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        closeSlide();
        })
      })
    })
}
//! -------------get Details in ApI-------------------//
    async function detalis(idValue){
       const detali = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
       const deresult= await detali.json();
        displayDetails(deresult); 
       
    }
//! -------------------Data every meal------------------------//
   function displayDetails(dataAPI) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (dataAPI.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${dataAPI.meals[0][`strMeasure${i}`]} ${dataAPI.meals[0][`strIngredient${i}`]}</li>`
        }
    }
    let tags=dataAPI.meals[0].strTags;
    let tagesword=``;
    if(tags){
        let tagessplit=tags.split(",");
        for(let i=0;i<tagessplit.length;i++){
            tagesword+=`
            <li class="alert alert-danger m-2 p-1">${tagessplit[i]}</li> `
        }
    }else{
            tags=[];
    }
    const cartona = `
    <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${dataAPI.meals[0].strMealThumb}" alt="image meal">
                        <h2>${dataAPI.meals[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${dataAPI.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${dataAPI.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${dataAPI.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagesword}
                </ul>
                <a target="_blank" href="${dataAPI.meals[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${dataAPI.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `;
    document.getElementById('mealDetails').innerHTML=cartona;
  
}
//!--------------Nav Bars----------------------//  
function openSlide(){
    $('.overlay').animate({left:'0px'},500);
    $('.open-close-icon').removeClass('fa-align-justify');
    $('.open-close-icon').addClass('fa-x');
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: '0px'},(i + 5) * 100);
    }
}
function closeSlide(){
    let sideBarWidth = $('.side-nav').innerWidth();
    $('.overlay').animate({left:-sideBarWidth},500);
    $('.open-close-icon').removeClass('fa-x');
    $('.open-close-icon').addClass('fa-align-justify');
    $('.links li').animate({top:'300px'},500);
}
$('.nav-header i').click(function (e) { 
        if($('.overlay').css('left') == '0px'){
            closeSlide();
        }else{
            openSlide();
        }
    });
closeSlide();
//! -----------------------input search---------------------//
function showSearchInput(){
    $('#searchInput').click(()=>{
       openSearch();
       $('#loading').fadeIn(50);
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        getTerm();
    });
    let searchContainer = document.getElementById('searchContainer');
    let container =``;
    container +=`<div class="row py-4">
            <div class="col-md-6">
            <input type="text" placeholder="Search By Name" class="search form-control text-white bg-transparent" id="searchName">
            </div>
            <div class="col-md-6">
            <input type="text" maxlength="1" placeholder="Search By First Letter"class="search form-control text-white bg-transparent" id="searchLetter">
            </div>
        </div>` 
        searchContainer.innerHTML = container;
    })
}
showSearchInput();

function openSearch(){
    $(function () {
        closeSlide();
        console.log('hello');
        $('#search').removeClass("nonActive")
        $('#search').siblings().addClass("nonActive");
    });
}
async function searchByName(term){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let finalResult = await apiResponse.json();
    // let meals = finalResult.meals;
    displayMeal(finalResult.meals,1);
    console.log(finalResult.meals);
}
async function searchByLetter(letter){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let finalResult = await apiResponse.json();
    displayMeal(finalResult.meals,1);
}
function getTerm(){
$('#searchName').keyup(function (eventInfo) {
    $('#loading').fadeIn(50);
    $('#loading').fadeOut(1000);
    searchByName(eventInfo.target.value);
});

$('#searchLetter').keyup(function (eventInfo) {
    $('#loading').fadeIn(50);
    $('#loading').fadeOut(1000);
    searchByLetter(eventInfo.target.value);
});
}

//!---------------------Categories--------------------//
function showCategoryInput(){
    $('#Category').click(()=>{
        opencategory();
       $('#loading').fadeIn(50);
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        showCategory();
    });
})
}
showCategoryInput();

function opencategory(){
    $(function () {
        closeSlide();
        $('#categoryBox').removeClass("nonActive")
        $('#categoryBox').siblings().addClass("nonActive");
    });
}

async function showCategory(){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalResult = await apiResponse.json();
    displayList(finalResult.categories);
    getCategoryType();
    $('#listCategry').removeClass("nonActive")
    $('#listCategry').siblings().addClass("nonActive");
}
function displayList(category){
    let container = ``;
    for(let i=0;i<category.length;i++){
       container +=
       `<div class="col-md-3">
       <div class="meal rounded-2" id="meal">
      <img class="w-100" src="${category[i].strCategoryThumb}" alt="">
      <div class="layer position-absolute text-center text-black p-2 d-block" id="layer1">
         <h3>${category[i].strCategory}</h3>
         <p>${category[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
          </div>
         </div>
     </div>` 
    }
   $('#listCategry').html(`${container}`);
}
function getCategoryType(){
document.querySelectorAll('.layer').forEach(item => {
    item.addEventListener('click', event => {
        getType(item.querySelector('h3').textContent);
    })
  })
}

async function getType(catId){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`);
    let finalResult = await apiResponse.json();
    displayMeal(finalResult.meals,2);
    $('#specificCategory').removeClass("nonActive")
    $('#specificCategory').siblings().addClass("nonActive");
    $('#loading').fadeIn(50);
    $('#loading').fadeOut(1000,()=>{
    $("body").css('overflow','visible');})
    getCategoryDetail();
}

function getCategoryDetail(){
    document.querySelectorAll('.col-md-3').forEach(item => {
        item.addEventListener('click', event => {
        categoryDetalis(item.id);
        $('#loading').fadeIn(50);
        $('#displayCategoryDetail').removeClass("nonActive")
        $('#displayCategoryDetail').siblings().addClass("nonActive");
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        closeSlide();
        })
      })
    })
}
async function categoryDetalis(idValue){ 
    let detali = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
    let deresult= await detali.json();
    displayCategoryDetails(deresult); 
}

function displayCategoryDetails(dataAPI) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (dataAPI.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${dataAPI.meals[0][`strMeasure${i}`]} ${dataAPI.meals[0][`strIngredient${i}`]}</li>`
        }
    }
    let tags=dataAPI.meals[0].strTags;
    let tagesword=``;
    if(tags){
        let tagessplit=tags.split(",");
        for(let i=0;i<tagessplit.length;i++){
            tagesword+=`
            <li class="alert alert-danger m-2 p-1">${tagessplit[i]}</li>
            `
        }
    }else{
            tags=[];
    }
    const cartona = `
    <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${dataAPI.meals[0].strMealThumb}" alt="image meal">
                        <h2>${dataAPI.meals[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                <h2>Instructions</h2>
                
                <p>${dataAPI.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${dataAPI.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${dataAPI.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagesword}
                </ul>
                <a target="_blank" href="${dataAPI.meals[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${dataAPI.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `;
    document.getElementById('categoryDetails').innerHTML=cartona;
 
}
//!--------------------------------Area---------------------
$('#AreaInput').click(function(){      
    openAria()
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(2000, function(){
     $('body').css("overflow", "visible");
     arealist();  
    });
   
   
})                              
function openAria()
{ $(function () {
    closeSlide()
    $("#area").removeClass("nonActive");
    $("#area").siblings().addClass("nonActive");
});
}

async function arealist()
{
    const aresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const aresult= await aresponse.json();
    displyAreaList(aresult.meals,aresult.meals.length,1);
    areaName();
}


function areaName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getArea(item[i].querySelector("h3").textContent);
        })
    }
}
async function getArea(Areaname){
    let arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Areaname}`);
    let arfinalResult = await arResponse.json();
    displayMeal(arfinalResult.meals,3);
    $('#Areameals').removeClass("nonActive")
    $('#Areameals').siblings().addClass("nonActive");
    getMealDetail();

}
function displyAreaList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val; i++) {
        cartoona += `
        <div class="col-md-3">
          <div class="meallist rounded-2  cursor-pointer text-center">
            <i class="fa-solid fa-house-laptop fa-4x "></i>
                <h3>${arr[i].strArea}</h3>
          </div>
        </div> `
    }
       $('.list').eq(num).html(`${cartoona}`);
}
//! ----------------------------Ingredients----------------------//
$('#IngredientsInput').click(function(){      
    openInteg()
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(2000, function(){
     $('body').css("overflow", "visible");
     Integlist();  
    });
})  

function openInteg()
{ $(function () {
    closeSlide()
    $("#Ingredients").removeClass("nonActive");
    $("#Ingredients").siblings().addClass("nonActive");
});
}
async function Integlist()
{
    const aresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const aresult= await aresponse.json();
    displyIntegList(aresult.meals,aresult.meals.length,2);
    integName();

}
function integName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getInteg(item[i].querySelector("h3").textContent);
            console.log(item[i].querySelector("h3").textContent);
        })
    }
}
async function getInteg(IntegName){
    const arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IntegName}`);
    const arfinalResult = await arResponse.json();
    displayMeal(arfinalResult.meals,4);
    $('#IntergatesMeals').removeClass("nonActive")
    $('#IntergatesMeals').siblings().addClass("nonActive");
    getMealDetail();

}
function displyIntegList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val && i<20; i++) {
        cartoona += `
        <div class="col-md-3">
          <div class="meallist rounded-2  cursor-pointer text-center">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${arr[i].strIngredient}</h3>
          <p>${`${arr[i].strDescription}`.split(" ").slice(0,20).join(" ")}</p>
          </div>
        </div>`
    }
       $('.list').eq(num).html(`${cartoona}`);
}