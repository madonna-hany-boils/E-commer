var products = JSON.parse(localStorage.getItem("Products"))||[];

if (products) {
    console.log(products);
}
var div2 = document.getElementsByClassName("container")[0];

let Prices={};
var totalspan=document.getElementById("total");
var total=document.getElementsByClassName("total")[0];

// total.innerHTML="Total: ";
products.forEach((product, index) => {
  
    var div = document.createElement("div");
    var trash = document.createElement("div");
    var div_price = document.createElement("div");
    var input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = product.stock; 
    var title = document.createElement("h3");
    var img = document.createElement("img");
    var price = document.createElement("p");

    div_price.append(price);
    trash.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    div.classList.add("divProduct");
    img.src = `${product.images[0]}`;
    title.innerHTML = product.title;
    price.innerHTML = product.price + `$`;

    input.onchange = () => {
      let p=product.price * input.value ;
      Prices[`${product.id}`]=p;
        price.innerHTML = p+ `$`;
       
    };

    div_price.append(price);
    div.append(img, title, input, div_price, trash);
    div2.append(div);

    trash.onclick = () => {
        products.splice(index, 1); // Use the correct index
        localStorage.setItem("Products", JSON.stringify(products));
        div.remove(); // Removes the product div from the UI
        location.reload();
    };
});
totalspan.classList.add("total")
total.addEventListener("click",()=>{
   let sum=0;
   console.log(Prices)
 for(let i in Prices){
  sum+=Prices[i];

 }


 totalspan.innerHTML=sum;
})

function Buy(){
   var cond=confirm("Are you sure you to buy this product");
   let user=localStorage.getItem("loggedInUser");
console.log(JSON.parse(user))
   if(user){
    localStorage.removeItem("Products");
    window.open("/order.html");
    
    }
      else{
        alert("You should Log in first ");
        window.location.href='/login2.html'
      }
   


}
document.addEventListener("DOMContentLoaded", function() {
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
