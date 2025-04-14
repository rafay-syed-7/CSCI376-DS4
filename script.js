import { books, fakeSummary } from './booklist.js';

//Render books dynamically into the DOM
function renderBooks(bookList) {
  const container = document.getElementById("bookContainer");
  container.innerHTML = ""; 

  //Creates div containers for each genre and appends them to the container
  const genresList = ["Nonfiction", "Fiction", "Horror", "Mystery", "Romance"];
  const genreContainers = {};

  genresList.forEach(genre => {
    const genreContainer = document.createElement("div");
    genreContainer.className = "genre-container";
    //The ID of each container is the genre it displays
    genreContainer.id = genre;

    //Adds the proper heading to the div
    // const genreHeading = document.createElement("h3");
    // genreHeading.textContent = `${genre}`;
    // genreContainer.appendChild(genreHeading);
    
    //creates a labelHeading div and addes the genre to it
    const labelHeading = document.createElement("div")
    labelHeading.className = "genre-label";

    const genreHeading = document.createElement("h3");
    genreHeading.textContent = genre; 
    labelHeading.appendChild(genreHeading);

    //creates a book card container, for each of the books in the genre
    const bookGrid = document.createElement("h3");
    bookGrid.className = "book-grid"

    //Add each container to the genre container
    genreContainer.appendChild(labelHeading);
    genreContainer.appendChild(bookGrid);

    //Store the container for later use
    genreContainers[genre] = bookGrid;

    //add container to main container
    container.appendChild(genreContainer);
  });

  bookList.forEach(book => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "book card h-100 p-3 border border-2";

    //Image of the book
    const imgEl = document.createElement("img");
    imgEl.src = book.imageLink;       
    imgEl.alt = book.title;
    imgEl.height = 250;
    imgEl.width = 164;

    //Title of the book (anchor element, clickable)
    const titleEl = document.createElement("h2");
    titleEl.className = "book-title";
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = book.title;
    titleEl.appendChild(link);

    //Author of the book
    const authorEl = document.createElement("p");
    authorEl.className = "card-text";
    authorEl.textContent = `by ${book.author}`;

    //overlay for the summary
    const overlay = document.createElement("div");
    overlay.className = "book-overlay";

    //overlay content (the summary)
    const overlayContent = document.createElement("div");

    //summary 
    const summary = document.createElement("summary");
    summary.textContent = fakeSummary;

    //adds summary to overlayContent
    overlayContent.append(summary);
    overlay.appendChild(overlayContent);

    //Adds the image, title, overlay, and author of the book to the card
    card.appendChild(imgEl);
    card.appendChild(titleEl);
    card.appendChild(authorEl);
    card.appendChild(overlay);

    col.appendChild(card);

    //Appends the 'col' element to the appropriate genre container
    const genreContainer = genreContainers[book.genre];
    genreContainer.appendChild(col);
  });
}

// Filter books by search input
function filterBooks(query) {
  return books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
}

function scrollWithOffset(event, id) {
  event.preventDefault();
  const yOffset = 70;
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.scrollY - yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}

// Reset border styling
function resetBorders() {
  const cards = document.querySelectorAll(".book");
  cards.forEach(card => card.classList.remove("border-danger"));
}

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderBooks(books);

  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearButton");
  const highlightButton = document.getElementById("highlightButton");
  const resetButton = document.getElementById("resetButton");

  searchInput.addEventListener("input", () => {
    const filtered = filterBooks(searchInput.value);
    renderBooks(filtered);
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderBooks(books);
  });
});