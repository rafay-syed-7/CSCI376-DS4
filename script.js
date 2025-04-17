import { books, fakeSummary } from './booklist.js';

//Render books dynamically into the DOM
function renderBooks(bookList, showGenres = true) {
  const container = document.getElementById("bookContainer");
  container.innerHTML = ""; 

  //the books should be grouped by genre
  if(showGenres) {
    //Creates div containers for each genre and appends them to the container
    const genresList = ["Nonfiction", "Fiction", "Horror", "Mystery", "Romance"];
    const genreContainers = createGenreContainers(container, genresList);

    //creates the book cards themselves
    bookList.forEach(book => {
      const bookCard = createBookCard(book);
      const genreContainer = genreContainers[book.genre];
      genreContainer.appendChild(bookCard);
    });
  }
  //show the flat layout (for when users use the search function)
  else {
    const flatGrid = document.createElement("div");
    flatGrid.className = "book-grid flat";

    //create the book cards
    bookList.forEach(book => {
      const bookCard = createBookCard(book);
      flatGrid.appendChild(bookCard);
    });

    container.append(flatGrid);
  }
}

//helper function for creating all the book cards
function createBookCard(book) {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "book card h-100 p-3";

  // Book image
  const imgEl = document.createElement("img");
  imgEl.className = "img";
  imgEl.src = book.imageLink;
  imgEl.alt = book.title;

  // Book title
  const titleEl = document.createElement("h2");
  titleEl.className = "book-title fs-4";
  const link = document.createElement("a");
  link.textContent = book.title;
  titleEl.appendChild(link);

  // Book author
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
  summary.innerHTML = `
    <h2 style="padding-top: 30px"><a href="#">${book.title}</a></h2>
    <p> <i> by ${book.author} </i> </p>
    <summary>${fakeSummary}</summary>
  `;

  //adds summary to overlayContent
  overlayContent.append(summary);
  overlay.appendChild(overlayContent);

  // Assemble card
  card.appendChild(imgEl);
  card.appendChild(titleEl);
  card.appendChild(authorEl);
  card.appendChild(overlay);

  col.appendChild(card);

  return col;
}

//helper function for render books to create the genre containers
function createGenreContainers(container, genreList) {
  const genreContainers = {};

  genreList.forEach(genre => {
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
  return genreContainers;
}

// Filter books by search input
function filterBooks(query) {
  return books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
}

function search() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query === "") {
      renderBooks(books, true);  // Show genres
    } else {
      const filteredBooks = filterBooks(query);
      renderBooks(filteredBooks, false); // Flat layout
    }
  });
}

function scrollWithOffset(event, id) {
  event.preventDefault();
  const headerOffset = document.querySelector('header').offsetHeight;
  const element = document.getElementById(id);
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerOffset - 15;

  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}


// Setup event listeners
// existing DOMContentLoaded setup...
document.addEventListener("DOMContentLoaded", () => {
  renderBooks(books);
  search();

  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearButton");

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderBooks(books);
  });


  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  navLinks.forEach(link => {
    const id = link.getAttribute("href").substring(1);
    link.addEventListener("click", event => scrollWithOffset(event, id));
  });
});
