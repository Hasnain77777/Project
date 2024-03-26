document.querySelector('header').innerHTML = `
<nav>
  <h1 class="logo"> LOGO</h1><!-- <img src="\" alt=""> -->
  <ul>
    <li><a href="collections.html">Collections</a></li>
    <li><a href="product.html">Products</a></li>
    <li><a href="./cart.html" class="listCart">Cart<span><span></a></li>
  </ul>
</nav>`
let collectionsDiv = document.querySelector('#collections');
let preProduct = [];
let finalProduct = []
let update = 0;
let globalI=0;
let getProduct = async () => {
  let product = await fetch('https://fakestoreapi.com/products');
  finalProduct = await product.json();
  afterAsync()
}
getProduct()

function afterAsync() {
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
          collectionsDiv.innerHTML += `<a href="collections.html?category=${element.category}">
          <img src="${element.image}" alt="">
          <h3 class="categoryName">${element.category}</h3>
          </a>`
        }
      });
    }
    else if (findItemAndCompare('category')) {
      const queryString = decodeURI(window.location.search.replace('?category=', ''));
      document.querySelector('.inner-container h1').innerHTML = `${queryString}`
      finalProduct.forEach(element => {
        if (element.category == queryString) {
          collectionsDiv.innerHTML += `<a href="product.html?id=${element.id}" class="collections">
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
      document.querySelector('.inner-container h1').innerHTML = "Products"
      finalProduct.forEach(element => {
        collectionsDiv.innerHTML += `<a href="product.html?id=${element.id}" class="collections">
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
    }
    else if (findItemAndCompare('id')) {
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
    }
  }
  if (window.location.pathname == '/cart.html') {

    let storedData = JSON.parse(localStorage.getItem('Product_selet')) || [];
    let keyIdArray = JSON.parse(localStorage.getItem('key_id')) || [];
    let numericArray = keyIdArray.map(Number);
    finalProduct.forEach(element => {
      let valueToCheck = element.id;
      let elementExists = numericArray.includes(valueToCheck);
      if (elementExists) {
        let cartHTML = `<div class="purchase-row"" id="none${globalI}">
        <div class="row-top-img">
            <img src="./assets/sports-shoe-pair-design-illustration-generated-by-ai_188544-19642.avif" alt="White upholstered chair accompanied by a cushion with light wooden legs" class="item-img">
        </div>
        <div class="row-wrap">
            <div class="row-top row">
                <div class="row-top-title">
                    <h3 class="item-name">${element.title}</h3>
                </div>
                <div class="row-top-remove">
                    <h4 class="item-remove" id="${globalI}" onclick="itemRemove(this.id)">X</h4>
                </div>
            </div>
            <div class="row-down row">
                <div class="row-down-price">
                    <h3 class="item-price">$${element.price}</h3>
                </div>
                <div class="row-down-amount">
                    <input type="button" value="-" class="item-sign minun-sign" onclick="minus('${globalI}')">
                    <h3 class="change" id='${globalI}'>${storedData[globalI].value}</h3>
                    <input type="button" value="+" class="item-sign plus-sign" onclick="plus('${globalI}')">
                </div>
            </div>
        </div>
        </div>`
        
        document.querySelector('.purchase').insertAdjacentHTML('beforeend', cartHTML);
        document.querySelector('.noItens').classList.add('display')
        document.querySelectorAll('.display').forEach(function (element) {
          element.classList.remove('display');
        });
        globalI++;
      }
    });
  }

}
let existingArray = JSON.parse(localStorage.getItem('key_id')) || [];
let storedData = JSON.parse(localStorage.getItem('Product_selet')) || Product_selet;

function subtract() {
  if (update > 0) {
    update--;
    document.querySelector('.update').innerHTML = update;
  }
  if (update == 0) {
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
function changeImage(src) {
  document.querySelector('.mainImage').src = src
}
function updateCart() {
  if (update !== 0) {
    let getID = window.location.search.replace('?id=', '');
    const condition = !existingArray.includes(getID);
    if (condition) {
      existingArray.push(getID);
      localStorage.setItem('key_id', JSON.stringify(existingArray));
    }

    let seletedProduct = JSON.parse(localStorage.getItem('Product_selet')) || [];
    const productCondition = !seletedProduct.some(element => element.id === getID);

    if (productCondition) {
      seletedProduct.push({ id: getID, value: update });
      localStorage.setItem('Product_selet', JSON.stringify(seletedProduct));
    }
  }

}
function itemRemove(get) {
  document.getElementById(`none${get}`).remove()
}

function minus(get) { 
    if(storedData[get].value > 0){
      console.log(globalI);
      storedData[get].value--; 
      localStorage.setItem('Product_selet', JSON.stringify(storedData));
      document.getElementById(`${get}`).innerHTML=storedData[get].value
      if(storedData[get].value == 0){
        document.getElementById(`none${get}`).remove()
        storedData[get]='';
        localStorage.setItem('Product_selet', JSON.stringify(storedData));
        existingArray[get]='';
        localStorage.setItem('key_id', JSON.stringify(storedData));
      }
    }
    if (storedData.every(item => item === '')) {
      localStorage.removeItem('Product_selet');
      document.querySelector('.main').remove();
    }
    if(existingArray.every(item => item === '')){
      localStorage.removeItem('key_id');
    }
}
function plus(get) {
  if(storedData[get].value < 5){
    storedData[get].value++; 
    localStorage.setItem('Product_selet', JSON.stringify(storedData));
    document.getElementById(`${get}`).innerHTML=storedData[get].value
  }
}
function noting(getID) {
  
  for (let i = 0; i < storedData.length; i++) {
    if (storedData[i].id === getID) {
      let a = storedData[i].value;
      return a;
    }
  }
  return 0;
}
