// Retrieve the product details from localStorage
const productData = localStorage.getItem("selectedProduct");

// Parse the JSON string back into an object
if (productData) {
  const product = JSON.parse(productData);

  // Populate details on the page
  document.getElementById("productName").innerText += product.title;
  document.getElementById("productPrice").innerText += `${product.price}$`;
  document.getElementById("productcategory").innerText += product.category;
  document.getElementById("productQuntatiy").innerText += product.stock;

  document.getElementById("productBrand").innerText += product.brand||"";
  document.querySelector("img").src = product.images[0];
  let btn=document.getElementsByClassName("btn")[0];
  btn.addEventListener("click",()=>{
   console.log("hi");
   let arr = JSON.parse(localStorage.getItem("Products")) || [];
   
       // Add the current product to the cart
       if (!arr.some((item) => item.id === product.id)) {
       arr.push(product);
   
       // Save the updated cart back to localStorage
       localStorage.setItem("Products", JSON.stringify(arr));
   
       // Redirect to the cart page
       location.assign("/cart.html");}else{
        alert("this item is alredy in cart")
       }
   
  })
} else {
  alert("this item is alredy in cart")
}
function deleteUser(){
  
  localStorage.removeItem("loggedInUser");
  location.href=`/login2.html`
}document.addEventListener("DOMContentLoaded", function() {
  var flag = JSON.parse(localStorage.getItem("isLoggedIn"));
  var user = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log(flag);
  var login = document.getElementById("getLogin");
  var iUser = document.getElementById("getLoginUser");
  iUser.innerHTML=user.firstName+" "+user.lastName;

  
  console.log(login);
  if (login) {
      flag ? login.innerText = "Log Out" : login.innerHTML = "Log In";
  } else {
      console.error("Element with id 'getLogin' not found in the DOM.");
  }
});
