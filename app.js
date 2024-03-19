// let headerHeight = document.querySelector('header').offsetHeight;
// document.querySelector('#slider').style.height = `calc(100vh - ${headerHeight}px)`;
// let box = $(".inner-container"), x;

// $(".arrow").click(function() {
//   if ($(this).hasClass("forward")) {
//     x = ((box.width() / 4)) + box.scrollLeft();
//     box.animate({
//       scrollLeft: x,
//     },200)
//     console.log(box.scrollLeft());
//   } else {
//     x = ((box.width() / 2)) - box.scrollLeft();
//     box.animate({
//       scrollLeft: -x,
//     })
//   }
// })
let innerContainerDiv = document.querySelector('.inner-container');
let preProduct=[];
let finalProduct=[]
let collectionDiv; 
let getProduct = async () => {
    innerContainerDiv.innerHTML=""
    let product = await fetch('https://fakestoreapi.com/products');
    finalProduct = await product.json();
    collectionDiv=document.querySelector('.inner-container .collections')
    getProdutFromAbove()
}
getProduct()

if(window.location.href == "http://127.0.0.1:5500/collections.html"){
  function getProdutFromAbove(){
    finalProduct.forEach(element => {
      console.log('fd');
      if(!preProduct.includes(element.category)){
        preProduct.push(element.category)
        innerContainerDiv.innerHTML +=`<a href="collections.html?cat=${element.category}" onclick="storeD(this)" class="collections" data-category=${element.category}>
        <img src="${element.image}" alt="">
        <h3>${element.category}</h3>
        </a>`
      }
    });
  }
}
else{
  function getProdutFromAbove(){
    finalProduct.forEach(element => {
    if(finalProduct.includes(element.category) == dataCategory){
      preProduct.push(element.category)
      innerContainerDiv.innerHTML +=`<a href="collections.html?cat=${element.category}"onclick="storeD(this)" class="collections" data-category=${element.category}>
      <img src="${element.image}" alt="">
      <h3>${element.category}</h3>
      </a>` 
    }
    
  });
  console.log('fdsf');
  } 
  
}



// var myObj  = {}



// var getData =  async () => {
//   let product = await fetch('https://fakestoreapi.com/products');
//    let lfinalProduct = await product.json();
//   //  console.log(lfinalProduct)
//    myObj = lfinalProduct
//    setdata(myObj)
//   return lfinalProduct
 
// }

// const setdata = (myObj) => {
//   console.log(myObj)
//   for(let el in myObj) {
//     console.log(el)
//   }
//   return myObj
 
// }
// document.addEventListener("DOMContentLoaded", function(event) {
  
//   console.log("DOM fully loaded and parsed");
//   myObj = getData();
//   console.log(myObj)
// });


