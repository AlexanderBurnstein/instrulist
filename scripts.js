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

// This is an array of Objects(instruments)
let instruments = [
  // Guitars
  {
    name: "Gibson Les Paul",
    image: "InstrulistImages/LesPaul.png",
    instrumentType: "Guitar"
  },
  {
    name: "Taylor Acoustic Guitar",
    image: "InstrulistImages/TaylorAcoustic.png",
    instrumentType: "Guitar"
  },
  {
    name: "Fender Stratocaster",
    image: "InstrulistImages/FenderStrat.png",
    instrumentType: "Guitar"
  },

  // Synthesizers
  {
    name: "Moog Minimoog",
    image: "InstrulistImages/MiniMoog.png",
    instrumentType: "Synthesizer"
  },
  {
    name: "ARP 2600",
    image: "InstrulistImages/ARP2600.png",
    instrumentType: "Synthesizer"
  },
  {
    name: "Roland Juno-106",
    image: "InstrulistImages/Juno106.png",
    instrumentType: "Synthesizer"
  },

  // Pianos
  {
    name: "Yamaha Upright Piano",
    image: "InstrulistImages/UprightPiano.png",
    instrumentType: "Piano"
  },
  {
    name: "Steinway Grand Piano",
    image: "InstrulistImages/SteinwayGrand.png",
    instrumentType: "Piano"
  },
  {
    name: "Wurlitzer 200",
    image: "InstrulistImages/Wurlitzer200.png",
    instrumentType: "Piano"
  },
  {
    name: "Fender Rhodes",
    image: "InstrulistImages/Fender Rhodes.png",
    instrumentType: "Piano"
  },

  // Bass
  {
    name: "Fender Jazz Bass",
    image: "InstrulistImages/FenderJazzBass.png",
    instrumentType: "Bass"
  },
  {
    name: "Fender Precision Bass",
    image: "InstrulistImages/PBass.png",
    instrumentType: "Bass"
  },
  {
    name: "Upright Bass",
    image: "InstrulistImages/UprightBass.png",
    instrumentType: "Bass"
  },

  // Drums
  {
    name: "Roland V-Drums",
    image: "InstrulistImages/ElectricDrums.png",
    instrumentType: "Drums"
  },
  {
    name: "DW Drum Kit",
    image: "InstrulistImages/DWDrums.png",
    instrumentType: "Drums"
  },
  {
    name: "Ludwig Drum Kit",
    image: "InstrulistImages/LudwigDrums.png",
    instrumentType: "Drums"
  },
];
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// This function adds cards the page to display the data in the array
function showCards() {
  const allInstrumentsContainer = document.getElementById("all-instruments-cards");
  const guitarCardsContainer = document.getElementById("guitar-cards");
  const synthesizerCardsContainer = document.getElementById("synthesizer-cards");
  const pianoCardsContainer = document.getElementById("piano-cards");
  const bassCardsContainer = document.getElementById("bass-cards");
  const drumCardsContainer = document.getElementById("drum-cards");

  // Clear existing cards
  allInstrumentsContainer.innerHTML = "";
  guitarCardsContainer.innerHTML = "";
  synthesizerCardsContainer.innerHTML = "";
  pianoCardsContainer.innerHTML = "";
  bassCardsContainer.innerHTML = "";
  drumCardsContainer.innerHTML = "";

  // Shuffle the instruments array for the All Instruments section
  const shuffledInstruments = shuffleArray([...instruments]);

  // Loop through the instruments array and add cards to the appropriate category
  instruments.forEach((instrument) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Add the image
    const img = document.createElement("img");
    img.src = instrument.image;
    img.alt = instrument.name;
    card.appendChild(img);

    // Add the instrument name
    const name = document.createElement("h3");
    name.classList.add("instrument-name");
    name.textContent = instrument.name;
    card.appendChild(name);

    // Add the instrument type
    const type = document.createElement("p");
    type.classList.add("instrument-type");
    type.textContent = instrument.instrumentType;
    card.appendChild(type);

    // Append the card to the appropriate category
    if (instrument.instrumentType === "Guitar") {
      guitarCardsContainer.appendChild(card);
    } else if (instrument.instrumentType === "Synthesizer") {
      synthesizerCardsContainer.appendChild(card);
    } else if (instrument.instrumentType === "Piano") {
      pianoCardsContainer.appendChild(card);
    } else if (instrument.instrumentType === "Bass") {
      bassCardsContainer.appendChild(card);
    } else if (instrument.instrumentType === "Drums") {
      drumCardsContainer.appendChild(card);
    }
  });

  // Add shuffled cards to the All Instruments section
  shuffledInstruments.forEach((instrument) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Add the image
    const img = document.createElement("img");
    img.src = instrument.image;
    img.alt = instrument.name;
    card.appendChild(img);

    // Add the instrument name
    const name = document.createElement("h3");
    name.classList.add("instrument-name");
    name.textContent = instrument.name;
    card.appendChild(name);

    // Add the instrument type
    const type = document.createElement("p");
    type.classList.add("instrument-type");
    type.textContent = instrument.instrumentType;
    card.appendChild(type);

    // Append the card to the All Instruments section
    allInstrumentsContainer.appendChild(card);
  });
}

function editCardContent(card, newInstrument, newImageURL, newType) {
  card.style.display = "block";

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newInstrument;

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newInstrument;

  const cardList = card.querySelector("ul");
  cardList.innerHTML = ""; // Clear existing list items
  const typeItem = document.createElement("li");
  typeItem.textContent = newType; // This should show the type, not name!
  cardList.appendChild(typeItem);

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newInstrument, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

/* function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
} */

function removeLastCard() {
  instruments.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}