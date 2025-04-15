// Array to hold the instrument data
let instruments = [];
// Loads my data.json file and displays the instrument cards on the website
document.addEventListener("DOMContentLoaded", function () { // Waits for the DOM to load then run the code
  fetch("data.json") // Fetches the data from the JSON file
    .then(response => response.json()) // Converts data to JavaScript object
    .then(data => { // Now we can use the data as it's a JavaScript object
      instruments = data.instruments; // Stores the instruments data in the instruments array
      showInstruments(instruments); // Run showCards function to display the instrument cards on webpage
    });
});

// Add an input event listener to the search bar for real-time filtering
document.getElementById('search-bar').addEventListener('input', function() {
  const searchInput = this.value.toLowerCase();
  // Check instrument array for matches on keywords
  const filtered = instruments.filter(inst =>
    inst.name.toLowerCase().includes(searchInput) ||
    inst.instrumentType.toLowerCase().includes(searchInput) ||
    (inst.yearReleased && inst.yearReleased.toString().includes(searchInput)) ||
    (inst.price && inst.price.toLowerCase().includes(searchInput)) ||
    (inst.genres && inst.genres.some(genre => genre.toLowerCase().includes(searchInput))) ||
    (inst.artists && inst.artists.some(artist => artist.toLowerCase().includes(searchInput)))
  );
  // Show filtered instruments if we hit matches in our search
  showInstruments(filtered);
});

// Add a button to clear instrument search bar and return to showing all instruments
document.getElementById('clear-search-btn').addEventListener('click', function() {
  document.getElementById('search-bar').value = "";
  showInstruments(instruments);
});

// Add filters by instrument type, can multi select, except reset filter button
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  // Skip the reset button
  if (btn.id === 'reset-filters-btn') return;
  btn.addEventListener('click', function() {
    btn.classList.toggle('active');

    // Get all active filter buttons
    const activeFilterButtons = Array.from(document.querySelectorAll('.filter-btn.active')).map(btn => btn.textContent);

    // If no filter buttons are active, show all instruments
    if (activeFilterButtons.length === 0) {
      showInstruments(instruments);
      return;
    }

    // Filter instruments by any active filter buttons
    const filtered = instruments.filter(inst => activeFilterButtons.includes(inst.instrumentType));
    showInstruments(filtered);
  });
});

// Reset Filters button clears all filters and search on click
document.getElementById('reset-filters-btn').addEventListener('click', function() {
  document.getElementById('search-bar').value = "";
  document.querySelectorAll('.filter-btn.active').forEach(btn => btn.classList.remove('active'));
  showInstruments(instruments);
});

// Toggle filter dropdown menu on click
document.getElementById('filter-menu-btn').addEventListener('click', function() {
  document.getElementById('filter-menu').classList.toggle('show');
});

// Card Pop Up elements by thier names in html file
const cardPopUp = document.getElementById('card-pop-up');
const closeCardPopUpBtn = document.getElementById('close-card-pop-up-btn');
const popUpImg = document.getElementById('pop-up-img');
const popUpName = document.getElementById('pop-up-name');
const popUpType = document.getElementById('pop-up-type');
const popUpDetails = document.getElementById('pop-up-details');

// Show card pop up with instrument data
function showCardPopUp(instrument) {
  // Set image source and alt text
  popUpImg.src = instrument.image;
  popUpImg.alt = instrument.name;
  // Set name and type text
  popUpName.textContent = instrument.name;
  popUpType.textContent = instrument.instrumentType;
  // Start building the details list
  let details = "<ul class='modal-details-list'>";
  // Only show each item if the data exists
  if (instrument.price) {
    details += "<li><strong>Price:</strong> " + instrument.price + "</li>";
  }
  if (instrument.yearReleased) {
    details += "<li><strong>Year Released:</strong> " + instrument.yearReleased + "</li>";
  }
  if (instrument.genres && instrument.genres.length > 0) {
    details += "<li><strong>Genres:</strong> " + instrument.genres.join(", ") + "</li>";
  }
  if (instrument.artists && instrument.artists.length > 0) {
    details += "<li><strong>Artists:</strong> " + instrument.artists.join(", ") + "</li>";
  }
  // Close the list
  details += "</ul>";
  // Show the instrument details in the popup
  popUpDetails.innerHTML = details;
  // Add event listener to for mouseclick to close the popup
  closeCardPopUpBtn.addEventListener('click', function() {
    cardPopUp.style.display = 'none';
  });
  // Make the popup show
  cardPopUp.style.display = 'block';
}

// Close instrument pop up if you click outside the content
cardPopUp.addEventListener('click', function(event) {
  if (event.target === cardPopUp) {
    cardPopUp.style.display = 'none';
  }
});

// Function to create and display instrument cards
function showInstruments(instrumentsToShow) {
  // Clear all instrument card containers before adding new cards so old cards don't stay
  document.getElementById('guitar-cards').innerHTML = "";
  document.getElementById('synthesizer-cards').innerHTML = "";
  document.getElementById('piano-cards').innerHTML = "";
  document.getElementById('bass-cards').innerHTML = "";
  document.getElementById('drum-cards').innerHTML = "";

  instrumentsToShow.forEach(instrument => { // Loop through each instrument in the array
    const cardContainer = document.createElement('div'); // Create a new div for the card
    cardContainer.className = 'card'; // Give the div a class name for CSS styling

    // Add Image
    const img = document.createElement('img'); // Create an image element
    img.src = instrument.image; // Set the image source to the instrument's image
    img.alt = instrument.name; // Set alt text for accessibility
    cardContainer.appendChild(img); // Add the image to the card

    // Add Name
    const name = document.createElement('h3'); // Create a heading for the instrument name
    name.className = 'instrument-name'; // Give it a class for CSS
    name.textContent = instrument.name; // Set the text to the instrument's name
    cardContainer.appendChild(name); // Add the name to the card

    // Add Type
    const type = document.createElement('p'); // Create a paragraph for the instrument type
    type.className = 'instrument-type'; // Give it a class for CSS
    type.textContent = instrument.instrumentType; // Set the text to the instrument type
    cardContainer.appendChild(type); // Add the type to the card

    // Decide which category to put the instrument card in based on instrument type
    if (instrument.instrumentType === "Guitar") {
      document.getElementById('guitar-cards').appendChild(cardContainer);
    } else if (instrument.instrumentType === "Synthesizer") {
      document.getElementById('synthesizer-cards').appendChild(cardContainer);
    } else if (instrument.instrumentType === "Piano") {
      document.getElementById('piano-cards').appendChild(cardContainer);
    } else if (instrument.instrumentType === "Bass") {
      document.getElementById('bass-cards').appendChild(cardContainer);
    } else if (instrument.instrumentType === "Drums") {
      document.getElementById('drum-cards').appendChild(cardContainer);
    }

    // Add mouse click event to add instrument to build band
    cardContainer.addEventListener('click', function(event) {
      // Prevent build band shift-click from opening card pop up
      if (event.shiftKey) return;
      if (buildBandBtn.classList.contains('active')) {
        // Add to Build a Band
        if (!buildBandInstruments.includes(instrument)) {
          buildBandInstruments.push(instrument);
          updateBuildBand();
        }
        return;
      }
      showCardPopUp(instrument);
    });
  });

  // After adding cards, hide categories with no cards
  // Need this array so I can loop through each category and check if cards should be displayed
  const categories = [
    { categoryId: 'guitar-category', cardsId: 'guitar-cards' },
    { categoryId: 'synthesizer-category', cardsId: 'synthesizer-cards' },
    { categoryId: 'piano-category', cardsId: 'piano-cards' },
    { categoryId: 'bass-category', cardsId: 'bass-cards' },
    { categoryId: 'drum-category', cardsId: 'drum-cards' }
  ];

  // Loop through each category and check if there are any instrument cards in it
  categories.forEach(categoryGroupTitle => {
    const categoryDiv = document.getElementById(categoryGroupTitle.categoryId);
    const cardsDiv = document.getElementById(categoryGroupTitle.cardsId);
    // If there are no cards in the category, hide the categoryDiv (Category title on homepage)
    if (cardsDiv.children.length === 0) {
      categoryDiv.style.display = "none";
    } else {
      categoryDiv.style.display = "";
    }
  });
}

// Build Band functionality
const buildBandBtn = document.getElementById('build-band-btn');
const buildBandCategory = document.getElementById('build-band-category');
const buildBandCards = document.getElementById('build-band-cards');
// Create an empty array to hold the instruments added to Build a Band
let buildBandInstruments = [];

// Create the Build a Band category on the homepage
buildBandBtn.addEventListener('click', function() {
  buildBandBtn.classList.toggle('active');
  if (buildBandBtn.classList.contains('active')) {
    buildBandCategory.style.display = "block";
  } else {
    // If Build a Band is not active, hide the category
    buildBandCategory.style.display = "none";
  }
});
  
// Function to update the Build a Band category with the instruments added to it
function updateBuildBand() {
  buildBandCards.innerHTML = "";
  buildBandInstruments.forEach((instrument, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    // Add Image
    const img = document.createElement('img');
    img.src = instrument.image;
    img.alt = instrument.name;
    card.appendChild(img);

    // Add Name
    const name = document.createElement('h3');
    name.className = 'instrument-name';
    name.textContent = instrument.name;
    card.appendChild(name);

    // Add Type
    const type = document.createElement('p');
    type.className = 'instrument-type';
    type.textContent = instrument.instrumentType;
    card.appendChild(type);

    // Shift-click to remove from Build a Band
    card.addEventListener('click', function(shiftKeyEvent) {
      if (shiftKeyEvent.shiftKey) {
        // Remove shift-clicked instrument from Build a Band
        buildBandInstruments.splice(index, 1);
        // Update the Build a Band
        updateBuildBand();
      }
    });

    buildBandCards.appendChild(card);
  });
}

// Soundbar EQ functionality
// Do not fully understand this code but it is just for a cool visual effect
document.addEventListener('DOMContentLoaded', () => {
  const barCount = 128;
  const soundbar = document.getElementById('soundbar-eq');
  if (soundbar) {
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'bar';
      // Randomize delay and duration for each bar
      bar.style.animationDelay = `${(Math.random() * 1.7).toFixed(2)}s`;
      bar.style.animationDuration = `${(1.2 + Math.random() * 1.5).toFixed(2)}s`;
      soundbar.appendChild(bar);
    }
  }
});