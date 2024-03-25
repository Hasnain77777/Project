document.querySelector('header').innerHTML = `
<nav>
  <h1 class="logo"> LOGO</h1><!-- <img src="\" alt=""> -->
  <ul>
    <li><a href="collections.html">Collections</a></li>
    <li><a href="product.html">Products</a></li>
    <li><a href="#" class="listCart">Cart<span><span></a></li>
  </ul>
</nav>`
let collectionsDiv = document.querySelector('#collections');
let preProduct = [];
let finalProduct = []
let update = 0;
let getProduct = async () => {
  let product = await fetch('https://fakestoreapi.com/products');
  finalProduct = await product.json();
  afterAsync()
}
getProduct()
function afterAsync(){
  function findItemAndCompare(value) {
    const decodedValue = decodeURI(window.location.search).replace(`?${value}=`, '');
    const foundItem = finalProduct.find(item => item[value] == decodedValue);
    return foundItem ? decodedValue == foundItem[value] : false;
  }
if (window.location.pathname == "/collections.html") {
  if (window.location.search == '') {
    document.querySelector('.inner-container h1').innerHTML = "collections"
      finalProduct.forEach(element => {
        if (!preProduct.includes(element.category)) {
          preProduct.push(element.category)
          collectionsDiv.innerHTML += `<a href="collections.html?cat=${element.category}">
          <img src="${element.image}" alt="">
          <h3 class="categoryName">${element.category}</h3>
          </a>`
        }
      });
  }
  else if (findItemAndCompare('category')) {
    const queryString = decodeURI(window.location.search.replace('?cat=', ''));
    document.querySelector('.inner-container h1').innerHTML = `${queryString}`

      finalProduct.forEach(element => {
        if (element.category == queryString) {
          collectionsDiv.innerHTML += `<a href="product.html?id=${element.id}" class="collections"  data-category=${element.id} onclick="productId(this)">
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

    function productId(value) {
      localStorage.setItem('Id', value.getAttribute('data-category'));
    }
  }
  else {
    document.querySelector('.collectionsContainer').innerHTML = ''
    document.querySelector('.pageNotFound').innerHTML = `
    <h1>page not found</h1>
    <div class="backButton">
    <a href="collections.html">Back to Collections</a>
    `
  }
}
if (window.location.pathname == '/product.html') {  
  
  if (window.location.search == '') {
    console.log('er');
    document.querySelector('.inner-container h1').innerHTML = "Products"
    finalProduct.forEach(element => {
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
    });
    // function productId(value) {
    //   localStorage.setItem('Id', value.getAttribute('data-category'));
    // }
  }
  else if (findItemAndCompare('id')) {
    console.log('fd');
    finalProduct.forEach(element => {
      if (window.location.search.replace('?id=', '') == element.id) {
        let contentRow = document.querySelector('.contentRow');
        let newHTML = `
            <p>Rating: ${element.rating.rate}</p>
            <h2>${element.title}</h2>
            <h4>${element.description}</h4>
            <h3 class="price">$${element.price}</h3>
        `;
        contentRow.insertAdjacentHTML('afterbegin', newHTML);
      }
    });
    function subtract() {
      if (update > 0) {
        update--;
        document.querySelector('.update').innerHTML = update;
        document.querySelector('.addToCart').classList.add("disableCursor")
      }
    }
    function add() {
      if (update < 5) {
        update++;
        document.querySelector('.update').innerHTML = update;
        document.querySelector('.addToCart').classList.remove("disableCursor")
      }
    }
  }
}
function changeImage(src) {
  document.querySelector('.mainImage').src = src
}
function updateCart() {
  if (update != 0) {
    localStorage.setItem('cartValue', update);
    document.querySelector('.listCart span').innerHTML = localStorage.getItem('cartValue')
  }
}
}