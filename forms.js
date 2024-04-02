const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



function validateSignIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch('./json/accounts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var users = data.users;
            var user = users.find(function(user) {
                return user.email === email;
            });
			console.log(user);
            if (user) {
            
                if (user.password === password) {
                    alert("Sign in successful!");
                } else {
                    alert("Incorrect password. Please try again.");
                }
            } else {
                alert("User with this email does not exist. Please sign up.");
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            alert("Error: Unable to fetch user data. Please try again later.");
        });

    return false;
}

function saveSignUpData() {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	// Fetch existing data from accounts.json
	fetch('accounts.json')
		.then(response => response.json())
		.then(data => {
			// Append new user data
			data.users.push({
				name: name,
				email: email,
				password: password
			});

			// Write updated data back to accounts.json
			fetch('./json/accounts.json', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(data => {
				alert("Account created successfully!");
				// Optionally, redirect the user to another page
				// window.location.href = "success.html";
			})
			.catch(error => console.error('Error:', error));
		})
		.catch(error => console.error('Error:', error));

	// Prevent default form submission
	return false;
}

