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
        innerContainerDiv.innerHTML +=`
        <div data-category=${element.category}  onclick="storeD(this)">
        <img src="${element.image}" alt="">
        <h3>${element.category}</h3>
        </div>`
      }
    });
  }
  function storeD(get){
    storeCategory.push(get.getAttribute('data-category'))
    window.location.search=`?cat=${get.getAttribute('data-category')}`
  }
}
else if(window.location.href == `http://127.0.0.1:5500/collections.html${storeCategory[0]}`){
  storeCategory=[]
  function getProdutFromAbove(){
    const queryString = window.location.search;
    const decoded = decodeURI(queryString);
    const newDecode = decoded.replace('?cat=','')
    finalProduct.forEach(element => {
    if(element.category == newDecode){
      const decoded = decodeURI(queryString);
      preProduct.push(element.category)
      innerContainerDiv.innerHTML +=`<a href="products.html?id=${element.id}"onclick="storeD(this)" class="collections" data-category=${element.category}>
      <img src="${element.image}" alt="">
      <h3>${element.category}</h3>
      <h3>${element.price}$</h3>
      </a>` 
    }
    
  });
  } 
}
else{
  innerContainerDiv.innerHTML =`<div id="back">
  <h1>PAGE NOT FOUND</h1>
  <div class="backButton">
  <a href="collections.html">Back to Collections</a>
  </div>
  </div>` 
}







