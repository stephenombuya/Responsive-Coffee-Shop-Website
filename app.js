let search = document.querySelector('.search-box');
let searchIcon = document.querySelector('#search-icon');
let searchInput = document.querySelector('#search-input');

// Toggle search box visibility
searchIcon.addEventListener('click', () => {
    search.classList.toggle('active');
});

// Close search box when clicking outside of it
document.addEventListener('click', (event) => {
    if (!search.contains(event.target) && !searchIcon.contains(event.target)) {
        search.classList.remove('active');
    }
});

// Close search box when pressing the Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        search.classList.remove('active');
    }
});

// Submit search on pressing Enter
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();

        if (query) {
            console.log(`Searching for: ${query}`);

            // Get all the product names (assuming they're in <h3> elements)
            const products = document.getElementsByTagName('h3');

            let foundProduct = null;

            // Loop through all <h3> elements and check if any match the query
            for (let i = 0; i < products.length; i++) {
                const productName = products[i].innerText.trim().toLowerCase();

                if (productName === query) {
                    foundProduct = products[i].innerText; // Store the matching product name
                    break;
                }
            }

            // If a product is found, redirect to index.html with the product name in the URL
            if (foundProduct) {
                window.location.href = `index.html?product=${encodeURIComponent(foundProduct)}`;
            } else {
                alert('Product not found! Please search for an available product.');
            }
        }
    }
});



// On index.html page
window.addEventListener('DOMContentLoaded', (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get('product');

  if (productName) {
      console.log(`Looking for product: ${productName}`);

      // Find the product item in the HTML (assuming each product is in a <div class="product-item">)
      const productItems = document.getElementsByClassName('product-item');
      let foundProductItem = null;

      // Loop through all product items to find the one matching the product name
      for (let i = 0; i < productItems.length; i++) {
          const productTitle = productItems[i].querySelector('h3').innerText.trim().toLowerCase();
          if (productTitle === productName.toLowerCase()) {
              foundProductItem = productItems[i]; // Store the matching product item
              break;
          }
      }

      // If the product is found, display its details on a new blank page
      if (foundProductItem) {
          // Gather product details
          const productTitle = foundProductItem.querySelector('h3').innerText;
          const productDescription = foundProductItem.querySelector('p').innerText;
          const productPrice = foundProductItem.querySelector('.price').innerText;
          const productImages = foundProductItem.querySelectorAll('.product-image-container img');

          // Open a new blank page and write the product details
          const newWindow = window.open('', '_blank');
          newWindow.document.write(`<h1>${productTitle}</h1>`);
          newWindow.document.write(`<p>${productDescription}</p>`);
          newWindow.document.write(`<p><strong>Price: </strong>${productPrice}</p>`);
          newWindow.document.write(`<h3>Product Images:</h3>`);

          // Loop through all images and display them in the new window
          productImages.forEach((image) => {
              newWindow.document.write(`<div style="margin: 10px;"><img src="${image.src}" alt="${productTitle}" style="max-width: 200px; max-height: 200px;"></div>`);
          });

      } else {
          console.log('Product not found on index.html.');
      }
  }
});



// Smooth scrolling for anchor links (optional)
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = this.getAttribute('href');

    // Check if the target is not just '#'
    if (target !== "#") {
      const section = document.querySelector(target);

      if (section) {
        const sectionTop = section.offsetTop;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth"
        });
      }
    }
  });
});



// Select the hamburger icon and the mobile navbar
const menuIcon = document.getElementById('menu-icon');
const mobileNavbar = document.querySelector('.navbar-mobile');

// Add a click event listener to the hamburger icon
menuIcon.addEventListener('click', function () {
    // Toggle the visibility of the mobile navbar
    mobileNavbar.classList.toggle('active');
});


// const loginForm = document.getElementById('login-form');
// const signupForm = document.getElementById('signup-form');

// loginForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   // Handle login logic here, e.g., send form data to a server-side script
//   console.log('Login form submitted');
// });

// signupForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   // Handle signup logic here, e.g., send form data to a server-side script
//   console.log('Signup form submitted');
// });

// Simulated user authentication status
// Change this to your actual logic for checking if a user is logged in
var isLoggedIn = false; // This should be replaced with actual logic, e.g., checking a token

function loginOrSignup() {
    document.getElementById('shop-now-btn').addEventListener('click', function() {
        // alert("Button clicked!");
        if (isLoggedIn) {
            // If the user is logged in, redirect to the shop page
            window.location.href = 'index.html'; // Replace with your actual shop page
        } else {
            // If the user is not logged in, ask them to log in or sign up
            let userChoice = confirm('Are you a registered customer? Press OK to login, Cancel to sign up.');
    
            if (userChoice) {
                // User chose to login
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                // User chose to sign up
                window.location.href = 'signup.html'; // Redirect to signup page
            }
        }
    });
    
}


