const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const socialBtn = document.getElementById("social");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote //

function newQuotes() {
  showLoadingSpinner();
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
  hideLoadingSpinner();
}

// Get Quotes From API //
async function getQuotesFromAPI() {
  showLoadingSpinner();
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
  const socialURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(socialURL, "_blank");
}

// Event Listener

newQuoteBtn.addEventListener("click", newQuotes);
socialBtn.addEventListener("click", postQuote);

// On load

getQuotesFromAPI();
