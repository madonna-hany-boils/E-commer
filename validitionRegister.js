let usersArray =[]; 
if(localStorage.getItem("Users")!=null)
{
    usersArray = JSON.parse(localStorage.getItem("Users"));
}


document.getElementById("myFormRegister").addEventListener("submit", function(event) {
    event.preventDefault();  

    let formValid = true;

    let user = {
        id: usersArray.length + 1 
    };

    const inputs = document.querySelectorAll(".inputValid");
    const spans = document.querySelectorAll(".error");

    inputs.forEach((input, index) => {
        let value = input.value.trim();

        if (value === "") {
            showError(input, spans[index], `${input.name} is required`);
            formValid = false;
        } else {
            if (input.name === "firstName" || input.name === "lastName") {
                if (value.length < 2) {
                    showError(input, spans[index],` ${input.name} must be at least 2 characters`);
                    formValid = false;
                } else {
                    hideError(input, spans[index]);
                    user[input.name] = value; 
                }
            } else if (input.name === "userName" && !validateEmail(value)) {
                showError(input, spans[2], "Please enter a valid email address");
                formValid = false;
            } else if (input.name === "password" && !validatePassword(value)) {
                showError(input, spans[3], "Password must be at least 8 characters, including a number and a special character");
                formValid = false;
            } else if (input.name === "confirmPassword" && value !== document.getElementById("password").value) {
                showError(input, spans[4], "Passwords do not match");
                formValid = false;
            } else {
                hideError(input, spans[index]);
                user[input.name] = value; 
            }
        }
    });

    if (formValid) {
        usersArray.push(user); 
        // localStorage.getItem(,user)
        console.log("Users array:", usersArray);
        usersArray.push(user);
      localStorage.setItem("isLoggedIn",true);
localStorage.setItem("loggedInUser",JSON.stringify(user));
localStorage.setItem("Users",JSON.stringify(usersArray));

      window.location.href="/Home.html";
         clearForm();
    } else {
        console.log("Form is not valid.");
    }

   
});

function showError(input, span, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    span.textContent = message;
    span.style.display = "block"; 
}

function hideError(input, span) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    span.style.display = "none"; 
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
}



document.querySelectorAll(".inputValid").forEach(input=> {
    input.addEventListener("input", function() {
        let value = input.value.trim();
        let span = input.nextElementSibling;
        if (value === "") {
            hideError(input, span);
        } else if (input.name === "firstName" || input.name === "lastName") {
            if (value.length >= 2) {
                hideError(input, span);
            } else {
                showError(input, span, `${input.name} must be at least 2 characters`);
            }
        } else if (input.name === "userName" && validateEmail(value)) {
            console.log(input)

            let isDuplicate = usersArray.some((item) =>{ 
                // console.log(usersArray[index].userName);
                // console.log(item)
                // console.log(input)

                console.log(item.userName)
                return input.value === item.userName;
            }); 


            console.log(isDuplicate); 
        console.log("================================")
        console.log(input.value)
            if (isDuplicate) {
                showError(input, span, "This email is already in use."); 
                alert("Error: Duplicate email detected."); 
            } else {
                hideError(input, span); 
            }
       
            
        } else if (input.name === "password" && validatePassword(value)) {
            hideError(input, span);
        } else if (input.name === "confirmPassword" && value === document.getElementById("password").value) {
            hideError(input, span);
        } else {
            hideError(input, span);
        }
    });
});

function clearForm() {
    const inputs = document.querySelectorAll(".inputValid");

    inputs.forEach(input => {
        input.value = "";  
        input.classList.remove("valid", "invalid"); 
    });

    
    const spans = document.querySelectorAll(".error");
    spans.forEach(span => {
        span.style.display = "none"; 
    });
}