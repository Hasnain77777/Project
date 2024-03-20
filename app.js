let collectionsDiv = document.querySelector('#collections');
let preProduct=[];
let finalProduct=[]

let getProduct = async () => {
    let product = await fetch('https://fakestoreapi.com/products');
    finalProduct = await product.json();
    getProdutFromAbove()
}
getProduct()

if(window.location.href == "http://127.0.0.1:5500/collections.html"){
  document.querySelector('.inner-container h1').innerHTML="collections"
  function getProdutFromAbove(){
    finalProduct.forEach(element => {
      if(!preProduct.includes(element.category)){
        preProduct.push(element.category)
        collectionsDiv.innerHTML +=`<a href="collections.html?cat=${element.category}" data-category="${element.category}" onclick="storeD(this)">
        <img src="${element.image}" alt="">
        <h3>${element.category}</h3>
        </a>`
        console.log(element.category);
      }
    });
  }
  function storeD(get){
    localStorage.setItem('Category',get.getAttribute('data-category'));
  }
}
else if(decodeURI(window.location.search) == `?cat=${localStorage.getItem('Category')}`){
  function getProdutFromAbove(){
    const queryString = window.location.search;
    const decoded = decodeURI(queryString);
    console.log(decoded);
    const newDecode = decoded.replace('?cat=','')
    finalProduct.forEach(element => {
    if(element.category == newDecode){
      const decoded = decodeURI(queryString);
      preProduct.push(element.category)
      collectionsDiv.innerHTML +=`<a href="products.html?id=${element.id}" class="collections" onclick="storeD(this)" data-category=${element.category}>
      <img src="${element.image}" alt="">
      <div class='productContent'>
        <h3>${element.title}</h3>
        <div class="priceRate">
          <h5>Price: <span>${element.price}$</span></h5>
          <h5>Rating:${element.rating.rate}</h5>
        </div>
      </div>
      </a>` 
    }
    
  });
  } 
}
else{
  console.log(localStorage.getItem('Category'));
  document.querySelector('.collectionsContainer').innerHTML=''
  document.querySelector('.pageNotFound').innerHTML =`
  <h1>page not found</h1>
  <div class="backButton">
  <a href="collections.html">Back to Collections</a>
  </div>` 
}



localStorage.setItem("lastname", "Sm ith");



