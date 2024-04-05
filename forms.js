const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
if(!localStorage.getItem('key')){
    function validateSignIn(){
        var email = document.getElementById("lemail").value;
        var password = document.getElementById("lpassword").value;
    
        fetch('./json/accounts.json')
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
    
        .then(data => {
            let users = data.users
            let user = users.find(function(user){
                return user.email === email;
            });
            if(user){
                if(user.password === password){
                    localStorage.setItem('key','login')
                    if(localStorage.getItem('from')){
                        window.location.href = localStorage.getItem('from')   
                    }
                    else {
                        window.location.pathname =''
                    }
                }
                else{
                    console.log("Incorrect password. Please try again.")
    
                }
            }
            else{
                alert('User with this email does not exist. Please sign up.')
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error.message);
            alert("Error: Unable to fetch user data. Please try again later.");
        })
        return false;   
    }
}
else {
    alert('You alerdy Login')
}



if(window.location.pathname === '/checkout_form.html'){
    let storedData = JSON.parse(localStorage.getItem('Product_selet'));
    let getClass = document.querySelector('.data');
    storedData.forEach((element, index) => {
        let newHTML =`
        <p><a>Product ${++index}</a> <span class="price">$${element.price}</span></p>
        `
        getClass.insertAdjacentHTML('afterbegin', newHTML);
    });
}
function totalPrice(){

    let storedData = JSON.parse(localStorage.getItem('Product_selet')) || Product_selet;
    let t_price = 0
    
    storedData.forEach(element => {
      t_price=Number(t_price)+Number(element.price);
    })
    let finalPrice = t_price.toFixed(2)
    document.querySelector('p .price b').innerHTML=`$${finalPrice}`;
  }
  totalPrice()
