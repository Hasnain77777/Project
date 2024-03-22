document.querySelector('header').innerHTML = '<nav><h1 class="logo"> LOGO</h1><!-- <img src="\" alt=""> --><ul><li><a href="collections.html">Collections</a></li><li><a href="product.html">Products</a></li><li><a href="#">Cart</a></li></ul></nav>'
let collectionsDiv = document.querySelector('#collections');
let preProduct = [];
let finalProduct = []

let getProduct = async () => {
  let product = await fetch('https://fakestoreapi.com/products');
  finalProduct = await product.json();
  if (window.location.pathname == "/collections.html" || window.location.pathname == '/product.html') {
    getProdutFromAbove()
  }
}
getProduct()

if (window.location.pathname == "/collections.html") {
  if (window.location.search == '') {
    document.querySelector('.inner-container h1').innerHTML = "collections"
    function getProdutFromAbove() {
      finalProduct.forEach(element => {
        if (!preProduct.includes(element.category)) {
          preProduct.push(element.category)
          collectionsDiv.innerHTML += `<a href="collections.html?cat=${element.category}" data-category="${element.category}" onclick="storeCategory(this)">
          <img src="${element.image}" alt="">
          <h3 class="categoryName">${element.category}</h3>
          </a>`
        }
      });
    }
    function storeCategory(value) {
      localStorage.setItem('Category', value.getAttribute('data-category'));
    }
  }
  else if (decodeURI(window.location.search) == `?cat=${localStorage.getItem('Category')}`) {
    const queryString = window.location.search;
    const decoded = decodeURI(queryString);
    const newDecode = decoded.replace('?cat=', '')
    document.querySelector('.inner-container h1').innerHTML = `${newDecode}`
    function getProdutFromAbove() {
      finalProduct.forEach(element => {
        if (element.category == newDecode) {
          const decoded = decodeURI(queryString);
          preProduct.push(element.category)
          collectionsDiv.innerHTML += `<a href="product.html?id=${element.id}" class="collections" data-category=${element.id} onclick="productId(this)">
        <img src="${element.image}" alt="">
        <div class='productContent'>
          <h3>${element.title}</h3>
          <div class="priceRate">
            <h5>Price: <span> ${element.price}$</span></h5>
            <h5>Rating: ${element.rating.rate}</h5>
          </div>
        </div>
        </a>`
        }
      });
    }
    function productId(value){
      localStorage.setItem('Id', value.getAttribute('data-category'));
    }
  }
  else {
    console.log(localStorage.getItem('Category'));
    document.querySelector('.collectionsContainer').innerHTML = ''
    document.querySelector('.pageNotFound').innerHTML = `
    <h1>page not found</h1>
    <div class="backButton">
    <a href="collections.html">Back to Collections</a>
    </div>`
  }
}
if (window.location.pathname == '/product.html') {
  if (window.location.search == '') {
    document.querySelector('.inner-container h1').innerHTML = "Products"
    function getProdutFromAbove() {
      finalProduct.forEach(element => {
        preProduct.push(element.category)
        collectionsDiv.innerHTML += `<a href="collections.html?cat=${element.category}" data-category="${element.category}">
        <img src="${element.image}" alt="">
        <h3 class="categoryName">${element.category}</h3>
        </a>`
      }
      );
    }
  }
  else if(window.location.search == `?id=${localStorage.getItem('Id')}`){
    function getProdutFromAbove() {
      finalProduct.forEach(element => {
        if(window.location.search.replace('?id=','') == element.id){
          console.log('er');
          collectionsDiv.innerHTML += `<a href="collections.html?cat=${element.category}" data-category="${element.category}">
          <img src="${element.image}" alt="">
          <h3 class="categoryName">${element.category}</h3>
          </a>`
        }
      }
      );
    }
  }
  
}
