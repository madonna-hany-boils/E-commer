

// Image Slider
window.onload = ()=> {
  Play();
  
  localStorage.removeItem("Products")
  if(localStorage.getItem("Products")!=null)
    {

      getCartItem()
    }

};
var arr = ["/images/pexels-n-voitkevich-8939806.jpg", "/images/pexels-nietjuh-934070 (1).jpg", "images/pexels-pixabay-264636.jpg", "images/pexels-karolina-grabowska-5632371.jpg", "images/pexels-lum3n-44775-322207.jpg"];
var currentIndex = 0;
var image = document.images[0];
var count = 0; // Store the interval ID

// Go to next image in the slider
function Next() {
  currentIndex = (currentIndex + 1) % arr.length;
  image.src = arr[currentIndex];
}

// Go to previous image in the slider
function Previous() {
  currentIndex = (currentIndex - 1 + arr.length) % arr.length; // Fix potential negative index
  image.src = arr[currentIndex];
}

// Start the slideshow
function Play() {
  if (!count) { // Prevent multiple intervals running
    count = setInterval(function () {
      currentIndex = (currentIndex + 1) % arr.length;
      image.src = arr[currentIndex];
    }, 2000);
  }
}


// Stop the slideshow
function Stop() {
  clearInterval(count);
  count = 0; // Reset interval ID
}

// Product Display and Cart Functions
var div_products = document.querySelector(".products");

const categoryButtons = [
  document.getElementById("cat1"),
  document.getElementById("cat2"),
  document.getElementById("cat3"),
  document.getElementById("cat4")
];

// Fetch Products
async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

// Initialize the product display and categories
getProducts().then((result) => {
  const categories = Array.from(new Set(result.map(product => product.category))); // Extract unique categories
  categoryButtons.forEach((button, index) => {
    if (categories[index]) {
      button.textContent = categories[index];
      button.onclick = () => filterByCategory(categories[index], result);
    }
  });
  createCard(result); // Display all products initially
  document.getElementById("all").addEventListener("click", function () {
    createCard(result); // Display all products
});
});

// Create product cards
function createCard(products) {
  div_products.innerHTML = ""; // Clear previous products
  products.forEach((product) => {
    // card container
    const div = document.createElement("div");
    //div contain details button and cart icon
    const div2 = document.createElement("div");
    //title of product
    const title = document.createElement("h3");
    // product image
    const img = document.createElement("img");
    //product price
    const price = document.createElement("p");
    //p contain cart icon
    const cart = document.createElement("p");
    const detailbtn = document.createElement("button");

    img.src = product.images[0];
    title.innerHTML = product.title;
    price.innerHTML = `$${product.price}`;
    cart.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
    detailbtn.innerHTML = "Details";

    div.classList.add("card");
    div2.classList.add("cartDetailDiv");
    cart.classList.add("cartStyle")
    div2.append(detailbtn, cart);
    div.append(img, title, price, div2);
    div_products.appendChild(div);

    // Product detail page redirection
    detailbtn.onclick = () => {
     
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      location.assign("/productDetails.html");
    };

    // Add to cart functionality
    cart.onclick = () => {
      // console.log(product)
      // console.log("######################################")
       let cartList = JSON.parse(localStorage.getItem("Products")) || [];

      console.log(cartList)
      if (!cartList.some((item) => item.id === product.id)) {
        let confirm=window.confirm("Are you sure you want to add this product to cart?");
        if(confirm){
          cartList.push(product);
          localStorage.setItem("Products", JSON.stringify(cartList));
         
        }
      

      }else{
        alert("You added this product arleady");
      }
      getCartItem();
    };
  });
}

// Filter products by category
function filterByCategory(category, products) {
  const categoryData = products.filter((product) => product.category === category);
  div_products.innerHTML = ""; // Clear products
  createCard(categoryData); // Display filtered products
}

// Display items in the cart
function getCartItem() {
   cartList = JSON.parse(localStorage.getItem("Products")) || [];
  let cartContainer = document.querySelector(".item-in-card");
  cartContainer.innerHTML = ""; // Clear previous cart items
  let count=document.getElementById("count")
  count.innerHTML=cartList.length+"Products"

  cartList.forEach((item,index) => {
    let c = `
      <div class="items" id="items">
        <img src="${item.images[0]}" alt="${item.title}" />
        <div class="content">
          <h2>${item.title}</h2>
          <p class="price_card">${item.price} $</p>
          <i style="color:red" class="fa-solid fa-trash" id="trash"></i>
        </div>
      </div>
    `;
 
    cartContainer.innerHTML += c; // Add product to cart view
    let trash=document.getElementById("trash");
    let div=document.getElementById("items");

    trash.onclick = () => {
      cartList.splice(index, 1); // Use the correct index
      localStorage.setItem("Products", JSON.stringify(cartList));
      div.remove(); // Removes the product div from the UI
      location.reload();
  };
  });

}
function deleteUser(){
  
  localStorage.removeItem("loggedInUser");
  location.href=`/login2.html`
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
var card = document.querySelector(".card1")
function openCard(){
    card.classList.add("active")
}
function closeCard(){
card.classList.remove("active");
}