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
    function productId(value) {
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
      );
    }
  }
  else if (window.location.search == `?id=${localStorage.getItem('Id')}`) {
    let update = 0;
    function getProdutFromAbove() {
      finalProduct.forEach(element => {
        if (window.location.search.replace('?id=', '') == element.id) {
          document.querySelector('.productContianer').innerHTML += `
          <div class="contentRow">
            <p>Rating: ${element.rating.rate}</p>
            <h2>${element.title}</h2>
            <h4>${element.description}</h4>
            <h3 class="price">$${element.price}</h3>
            <div class="counterCart">
                <div class="counter">
                    <h3 class="subtract" onclick="subtract()">-</h3>
                    <h3 class="update">0</h3>
                    <h3 class="add" onclick="add()">+</h3>
                </div>
                <a href="#" class="addToCart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>
                    <h3>Add to cart</h3>
                </a>
            </div>
        </div>`
        }
      }
      );
    }
    function subtract() {
      
      if(update>0){
        update--;
        document.querySelector('.update').innerHTML='';
        document.querySelector('.update').innerHTML=update;
      }  
    }
    function add() {
      if(update<5){
        update++;
        document.querySelector('.update').innerHTML='';
        document.querySelector('.update').innerHTML=update;
      }
      
    }
  }
}
function imageFirst(src){
    document.querySelector('.mainImage').src=src
}