
/*search function */ /*referenced from Copilot */
const data = [
    { name: "Spaghetti and Meatballs", link: "meatball_spaghetti.html", categories: ["noodle", "western"] },
    { name: "Shrimp Salad", link: "shrimp_salad.html", categories: ["western"] }, //assign in array so I can access multiple
    { name: "POACHED SALMON", link: "poached_salmon.html", categories: ["western"] }, //more flexible
    { name: "Blueberry Pancakes", link: "blueberry_pancake.html", categories: ["western", "dessert"] },
]; //data storage for search function

/* jump to random recipe page */ //learnt from copilot
function randomiseRecipe() { 
    // Generate a random index based on the length of the data array (from 'data' variable we have upside)
    const randomIndex = Math.floor(Math.random() * data.length); 
    // Return the link property at the random index from data
    return data[randomIndex].link; 
} 

function getRandomRecipe(event) { 
    // Prevent default anchor behaviour
    event.preventDefault();    
    // Get a random page URL 
    const randomRecipe = randomiseRecipe(); // call to grab the random link
    // Navigate to the random page 
    window.location.href = randomRecipe;
}

/* random category recipe */
function randomiseRecipeByCategory(category) {
    // Filter the data based on the category
    const filteredData = data.filter(item => item.categories.includes(category));
    // Generate a random index based on the length of the filtered data array
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    // Return the link property at the random index from filtered data
    return filteredData[randomIndex].link;
}

function getRandomRecipeByCategory(event, category) {
    // Prevent default anchor behaviour
    event.preventDefault();
    // Get a random page URL from randomiseRecipeByCategory function
    const randomRecipe = randomiseRecipeByCategory(category);
    // Navigate to the random page
    window.location.href = randomRecipe;
}


// Function to handle the search
function searchFunction() {
    const input = document.getElementById('searchInput'); //retrieve element with searchInput id
    const filter = input.value.toLowerCase(); //grab current value of input var(which is from searchInput) and converts to lowercase.
    //converting to lowercase makes the search case-insensitive
    const resultList = document.getElementById('resultList'); //retrieve the resultList ID for search result display
    resultList.innerHTML = ''; //clear previous search results by setting it to empty string

    // Filter the data array based on the input (include only items that satisfy name property's data(convert to lowercase as well so it can match with input))
    const filteredData = data.filter(item => item.name.toLowerCase().includes(filter)); //includes check if it's present, maybe.

/* the function below already covered the result list display part. No need to put dy, else redundant

    // Display the filtered results
    filteredData.forEach(item => { //iterates over each item in the filtered data array
        const li = document.createElement('li'); //creates a new <li> (list item) element for each item in the filtered data (to get ready to be stored inside <ul id="resultList"></ul>)
        li.textContent = item.name; //sets the text content of the list item to the name property of the matched item
        resultList.appendChild(li); //appends the list item to <ul id="resultList"></ul>, effectively displaying the search result
    });
*/
    resultList.innerHTML = filteredData.map(item => ` <li class="result-item" onclick="window.location.href='${item.link}'">${item.name}</li> `).join('');
    //creates a new array(almost like cloning the array with .map) by transforming each element in the filteredData array using the provided function
    //1. creates <li> element with the class result-item, 2. sets an onclick attribute that, when the item is clicked, navigates the browser to the URL specified in item.link
    //Displays the name of the item (${item.name}) as the content of the list item
    //.join(''): Joins all the strings in the array into a single string without any separators. This is necessary because innerHTML expects a string of HTML, not an array
}

/*recommended food slideshow */ /*reference: Copilot */
let slideIndex = 0; 
showSlides(); //calling function?

function showSlides() { //defining function
    let i;
    const slides = document.getElementsByClassName("slides");
    for (i = 0; i < slides.length; i++) { 
        slides[i].style.display = "none"; //loop through all slides and set display property to "none" 
    }
    slideIndex++; //+1
    if (slideIndex > slides.length) {slideIndex = 1} //if slideIndex excees no. of slides, resets to 1 
    slides[slideIndex-1].style.display = "block"; //shows the current slide by setting its display property to "block"
    setTimeout(showSlides, 3000); // Change image every 3 seconds
} 

/*image showcase */
let currentImageIndex = 0;
const images = document.querySelectorAll('.img-box'); //selects all elements with the class name img-box and stores them in the images variable, which is a NodeList(A NodeList object is a list (collection) of nodes extracted from a document) of image elements
//node is any individual element in a DOM(Document Object Model) tree
function showImage(index) {
    images.forEach((image, i) => { //Iterates over each image in the NodeList
    // => { ... }: This syntax represents an arrow function, a concise way to write functions in JavaScript
    // i represents index of current element in NodeList
        image.classList.remove('active'); //Removes the active class from each image, hiding it
        if (i === index) {
            image.classList.add('active');
        } //Adds the active class to the image that matches the specified index, making it visible
    });
}

function nextImg() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex); //Increments the currentImageIndex by 1. The modulus operator % ensures that the index wraps around to 0 when it exceeds the length of the images array, creating a circular navigation
} //increments the currentImageIndex to show the next image in the list

function prevImg() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex); //Decrements the currentImageIndex by 1. The addition of images.length ensures that the index wraps around to the last image if it becomes negative, maintaining circular navigation
} //decrements the currentImageIndex to show the previous image in the list

// Initialize the showcase by showing the first image
showImage(currentImageIndex);

/*More on Feedback (footer)*/
function redirectToLink(url) { /*redirectToLink function takes a URL as its parameter and uses window.location.href to navigate to that URL. */
    window.location.href ="feedback.html"; /*insert the url? */
    //alert("Redirecting to Feedback Form.");
}

/*like count for individual page */ /*stripped from ChatGPT */

// Get the page's title (or any unique identifier for the page)
const pageTitle = document.title;  // This will be unique to each page

// Get the like button and like count display elements
const likeBtn = document.getElementById('likeBtn');
const likeCountDisplay = document.getElementById('likeCount');

// Retrieve the stored like count for the page from localStorage, or default to 0
let likeCount = parseInt(localStorage.getItem(pageTitle)) || 0; //If the retrieved value is null or not a number, it defaults to 0
//pageTitle is presumably a unique identifier for each page, typically set to document.title
//Converts the retrieved value from a string to an integer.
likeCountDisplay.textContent = likeCount; 
//Sets the text content of the likeCountDisplay element to the retrieved like count

// Update the like count when the Like button is clicked
likeBtn.addEventListener('click', function(event) { //By including event as a parameter in the event handler function, you ensure that the event object is properly passed and accessible within the function
    event.preventDefault(); //prevent default action could prevent the page from scrolling to the top, form submission, or other default behaviors depending on the context.
    likeCount++;
    likeCountDisplay.textContent = likeCount;

    // Store the updated like count in localStorage for this page
    localStorage.setItem(pageTitle, likeCount);
});

/*share button*/ /*stripped from ChatGPT */

// Share Button Functionality (same as before)
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', function(event) {
    event.preventDefault(); //prevent default action and now share function is accessible
    const url = window.location.href;  // Get current page URL
    const shareText = "Check out this page!";  // Custom text for sharing

    // Open share dialog (basic version)
    if (navigator.share) { //navigator.share: Checks if the browser supports the Web Share API
        navigator.share({ //Opens the share dialog with the current page's title, the custom share text, and the current URL
            title: document.title,
            text: shareText,
            url: url, 
        }).then(() => { //if function executes successfully
            console.log("Successfully shared");
        }).catch((error) => { //if error occurs
            console.error("Error sharing", error);
        });
    } else {
        // Fallback for browsers that don't support the Web Share API
        const shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`; //Constructs a share URL using encodeURIComponent to safely encode the URL and text for the query parameters
        //any share links for browser that doesn't support Web Share API as an alternative share medium
        window.open(shareLink, '_blank');
    } //Opens the constructed share link in a new tab
});

