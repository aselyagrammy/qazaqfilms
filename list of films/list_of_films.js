// Function to update the date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();

    const options = { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    
    dateTimeElement.textContent = `Current Date and Time: ${formattedDate}`;
}

setInterval(updateDateTime, 1000);

// Function to change the background color and store it in local storage
function changeBackgroundColor(color) {
    // Play sound
    const clickSound = document.getElementById('clickSound');
    clickSound.play();
    
    // Change background color
    document.body.style.backgroundColor = color;

    // Save the selected color to local storage
    localStorage.setItem('backgroundColor', color);
}

// Initialize background color from local storage
document.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }
});

// Button click event
document.getElementById('change-bg-btn').addEventListener('click', () => {
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#34495e', '#1abc9c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    changeBackgroundColor(randomColor);
});

// Event listener for keydown
document.addEventListener('keydown', (event) => {
    const clickSound = document.getElementById('clickSound');

    if (event.key === 'ArrowRight') {
        // Play sound and change color to light red
        clickSound.play();
        changeBackgroundColor('#ff9999'); // Light red
    } else if (event.key === 'ArrowLeft') {
        // Play sound and change color to light blue
        clickSound.play();
        changeBackgroundColor('#9999ff'); // Light blue
    }
});

// Sorting films
const filmList = document.querySelector('.film-list');
const sortBtn = document.getElementById('sort-btn');

// Variable to track sort order (true for descending, false for ascending)
let isDescending = true;

// Function to sort films and save the order in local storage
function sortFilms() {
    const filmItems = Array.from(filmList.querySelectorAll('.film-item'));

    // Sort film items by year
    filmItems.sort((a, b) => {
        const yearA = parseInt(a.getAttribute('data-year'));
        const yearB = parseInt(b.getAttribute('data-year'));
        return isDescending ? yearB - yearA : yearA - yearB; // Toggle sort order
    });

    // Clear the film list and re-append sorted items
    filmItems.forEach(film => filmList.append(film));

    // Save the sorted order to local storage
    localStorage.setItem('sortedOrder', filmItems.map(film => film.getAttribute('data-year')).join(','));
}

// Add event listener for sorting
sortBtn.addEventListener('click', () => {
    sortFilms();
    isDescending = !isDescending; // Toggle the sort order for the next click
});

// Load sorted order from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    // Check if there's a sorted order in local storage
    const sortedOrder = localStorage.getItem('sortedOrder');
    if (sortedOrder) {
        const years = sortedOrder.split(',');
        const filmItems = Array.from(filmList.querySelectorAll('.film-item'));

        // Sort film items based on the saved order
        filmItems.sort((a, b) => years.indexOf(a.getAttribute('data-year')) - years.indexOf(b.getAttribute('data-year')));

        // Clear the film list and re-append sorted items
        filmItems.forEach(film => filmList.append(film));
    }
});

// Rating system
document.querySelectorAll('.rating').forEach(ratingSection => {
    const stars = ratingSection.querySelectorAll('.star');
    const message = ratingSection.querySelector('.rating-message');

    // Function to set the rating
    function setRating(rating) {
        // Update the style for each star
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
        // Update the message based on the selected rating
        message.textContent = `You rated this ${rating} stars!`;
    }

    // Add click event listeners to each star
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            setRating(rating);
        });
    });
});
