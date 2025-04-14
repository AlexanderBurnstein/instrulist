/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

const LES_PAUL_URL =
  "https://upload.wikimedia.org/wikipedia/commons/1/1c/Full_front_R9_Les_Paul.jpg";
const JAZZ_BASS_URL =
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Fender_Jazz_Bass.jpg";
const YAMAHA_GRAND_PIANO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/c/c4/Piano_for_2_Players_Outside.jpg";

// This is an array of Objects(instruments)
let instruments = [
  {
    name: "Gibson Les Paul",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Full_front_R9_Les_Paul.jpg",
    features: ["Electric Guitar", "Mahogany Body"]
  },
  {
    name: "Fender Jazz Bass",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Fender_Jazz_Bass.jpg",
    features: ["4-string Bass", "Smooth Tone"]
  },
  {
    name: "Yamaha Grand Piano",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Piano_for_2_Players_Outside.jpg",
    features: ["88 Keys", "Classic Grand"]
  }
];
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
// Look into diff ways of doing this forloop ***
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < instruments.length; i++) {
    let instrument = instruments[i];

    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let imageURL = "";
    if (i == 0) {
      imageURL = LES_PAUL_URL;
    } else if (i == 1) {
      imageURL = JAZZ_BASS_URL;
    } else if (i == 2) {
      imageURL = YAMAHA_GRAND_PIANO_URL;
    }

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, instrument.name, instrument.image); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newInstrument, newImageURL) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newInstrument;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newInstrument + " Poster";

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newInstrument, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  instruments.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}