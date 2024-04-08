let existingArray = JSON.parse(localStorage.getItem('key_id')) || [];
let storedData = JSON.parse(localStorage.getItem('Product_selet')) || [];

/*<li><a href="./login.html" >Login</a></li>*/
document.querySelector('header').innerHTML = `
<nav>
  <h1 class="logo"> LOGO</h1><!-- <img src="\" alt=""> -->
  <ul>
    <li><a href="collections.html">Collections</a></li>
    <li><a href="product.html">Products</a></li>
    <li><a href="./cart.html" class="listCart">Cart<span class="cartValue"><span></a></li>
  </ul>
</nav>`

function cartNumber() {
  let count = existingArray.filter(element => element !== '').length;
  if(count !== 0){
    
    document.querySelector('.listCart span').innerHTML = count;
  }
  if(count == 0){
    document.querySelector('.listCart span').innerHTML = '';
    document.querySelector('.listCart span').classList.remove('cartValue')
  }
}
cartNumber()
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
              <h3 class="price">$ <span id="sendPrice">${element.price}</span></h3>
          `;
          contentRow.insertAdjacentHTML('afterbegin', newHTML);
        }
      });
    }
  }
  if (window.location.pathname == '/cart.html') {
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
                    <h4 class="item-remove" id="remove${globalI}" onclick="itemRemove(${globalI})">X</h4>
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
        document.querySelectorAll('.display').forEach(function (element) {
          element.classList.remove('display');
        });
        globalI++;
      }
    });
  }

}



for (let index = existingArray.length - 1; index >= 0; index--) {
  const element = existingArray[index];
  if (element === '') {
    existingArray.splice(index, 1);
    storedData.splice(index, 1);
    localStorage.setItem('key_id', JSON.stringify(existingArray));
    localStorage.setItem('Product_selet', JSON.stringify(storedData));
  }
}
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
      document.querySelector('.listCart span').classList.add('cartValue');
      document.querySelector('.listCart span').innerHTML=existingArray.length
    }

    let seletedProduct = JSON.parse(localStorage.getItem('Product_selet')) || [];
    const productCondition = !seletedProduct.some(element => element.id === getID);

    if (productCondition) {
      let sendPriceText = document.getElementById('sendPrice').textContent;
      seletedProduct.push({ id: getID, value: update, price: update*sendPriceText});
      localStorage.setItem('Product_selet', JSON.stringify(seletedProduct));
    }
  }

}
function itemRemove(get) {
  document.getElementById(`none${get}`).remove();
  console.log(typeof(storedData));
  storedData.splice(get, 1);
  localStorage.setItem('Product_selet', JSON.stringify(storedData));
  totalPrice()
  existingArray[get]='';
  localStorage.setItem('key_id', JSON.stringify(existingArray));
  cartNumber()
  if (storedData.every(item => item === '')) {
    document.querySelector('.main').remove();
  }
  updateCartDisplay()
  
}
function minus(get) { 
  let getPrice = storedData[get].price
  let productPrice = getPrice/storedData[get].value;
  getPrice-=productPrice
  storedData[get].price=getPrice.toFixed(2)
  localStorage.setItem('Product_selet', JSON.stringify(storedData));
  totalPrice();
  if(storedData[get].value > 0){
    storedData[get].value--; 
    localStorage.setItem('Product_selet', JSON.stringify(storedData));
    document.getElementById(`${get}`).innerHTML=storedData[get].value
    if(storedData[get].value == 0){
      document.getElementById(`none${get}`).remove()
      storedData[get]='';
      localStorage.setItem('Product_selet', JSON.stringify(storedData));
      existingArray[get]='';
      localStorage.setItem('key_id', JSON.stringify(existingArray));
      cartNumber()
    }
  }
  if (storedData.every(item => item === '')) {
    document.querySelector('.main').remove();
  }
  updateCartDisplay() 
}
function plus(get) {
  if(storedData[get].value < 5){
    let getPrice = storedData[get].price
    let unitPrice = getPrice/storedData[get].value;
    getPrice=Number(getPrice)+Number(unitPrice);
    storedData[get].price=getPrice.toFixed(2)
    localStorage.setItem('Product_selet', JSON.stringify(storedData));
    totalPrice()
    storedData[get].value++; 
    localStorage.setItem('Product_selet', JSON.stringify(storedData));
    document.getElementById(`${get}`).innerHTML=storedData[get].value
  }
}
// if (window.location.pathname == '/cart.html') {
  function totalPrice(){
    let t_price = 0
    
    storedData.forEach(element => {
      t_price=Number(t_price)+Number(element.price);
    })
    let finalPrice = t_price.toFixed(2)
    document.querySelector('h3.total-price').innerHTML=`$${finalPrice}`;
    return finalPrice;
  }
  totalPrice();
  
  function updateCartDisplay(){
    if(storedData.length !== 0){
      document.querySelector('.main').removeAttribute('id');
      document.querySelector('.noItens').id = "display"
    }
    else {
      document.querySelector('.noItens').removeAttribute('id');
      document.querySelector('.main').id = "display";  
    }
  }
  updateCartDisplay()
// }
function gotto(){
  if(localStorage.getItem('key')){
    document.querySelector('a.total-btn').href="./checkout_form.html" 
  }
  else {
    window.location.pathname = './login.html'    
  }
  let store = totalPrice();
  return store
}

if (window.location.pathname !== "/login.html") {
  console.log('fasdfadsfad');
  localStorage.setItem('from', window.location.href);
}
