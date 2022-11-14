const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const facebookBtn = document.getElementById("facebook");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote //

function newQuotes() {
  loading();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author is blanck, replace it to 'Unknown'

  if (!quote.author) {
    author.text.textContent = "Master";
  } else {
    authorText.textContent = quote.author;
  }

  // Check if Quotes length to determine styling

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote and hidde loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API //
async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    alert(error);
  }
}

// Post Quote

function postQuote() {
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(facebookURL, "_blank");
}

// Event Listener

newQuoteBtn.addEventListener("click", newQuotes);
facebookBtn.addEventListener("click", postQuote);

// On load

getQuotes();
