let getUser = JSON.parse(localStorage.getItem("Users"));

// console.log(getUser);
// console.log("ahhhhhhhhhhhhhhhhhh")
var form = document.getElementById("myFormLogin");
var inputs = document.querySelectorAll(".inputValid");
var spans = [
    document.getElementById("errorUserNameLogin"),
    document.getElementById("errorPasswordLogin")
];

function showError(input, span, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    span.textContent = message;
    span.style.display = "block";
    input.style.border = "1px solid red";  
}

function hideError(input, span) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    span.style.display = "none";
    input.style.border = "1px solid green";  
}

inputs.forEach((input, index) => {
    input.addEventListener("focus", function () {
        this.style.border = "1px solid blue"; 
        spans[index].style.display = "none";  
    });

    input.addEventListener("blur", function () {
        let value = this.value.trim();
        if (this.name === "userNameLogin" && !validateEmail(value)) {
            showError(this, spans[0], "Please enter a valid email address"); 
        } else if (this.name === "passwordLogin" && !validatePassword(value)) {
            showError(this, spans[1], "Please enter a valid password"); 
        } else {
            hideError(this, spans[index]); 
        }
    });

    input.addEventListener("input", function () {
        let value = this.value.trim();
        if (this.name === "userNameLogin" && !validateEmail(value)) {
            this.style.border = "1px solid red";  
        } else if (this.name === "passwordLogin" && !validatePassword(value)) {
            this.style.border = "1px solid red";  
        } else {
            this.style.border = "1px solid green";  
        }
    });
});

form.addEventListener("submit", function (event) {
    let formValid = true;

    inputs.forEach((input, index) => {
        let value = input.value.trim();
        if (value === "") {
            showError(input, spans[index], "This field is required");
            formValid = false;
        } else {
            if (input.name === "userNameLogin" && !validateEmail(value)) {
                showError(input, spans[0], "Please enter a valid email address");
                formValid = false;
            } else if (input.name === "passwordLogin" && !validatePassword(value)) {
                showError(input, spans[1], "Please enter a valid password");
                formValid = false;
            } else {
                hideError(input, spans[index]);
            }
        }
    });
    if (!formValid) {
        event.preventDefault(); 
    } else {
        let email = inputs[0].value.trim();
        let password = inputs[1].value.trim();

        let user = getUser.find(input => input.userName === email);

        if (!user) {
            event.preventDefault(); //

            alert("You are not registered. Please register first.");
            window.location.href = "./validitionRegister.html"; // 
        } else if (user.password === password) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.open("./Home.html"); // 
        } else {
            showError(inputs[0], spans[0], "Invalid email or password");
            event.preventDefault();  
        }
    }
});


const submitBtn = document.getElementById("submitBtn");


submitBtn.addEventListener("mouseover", function() {
    submitBtn.classList.add("submit-btn-hover");  // 
});

submitBtn.addEventListener("mouseout", function() {
    submitBtn.classList.remove("submit-btn-hover");
});

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);  
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);  
}
