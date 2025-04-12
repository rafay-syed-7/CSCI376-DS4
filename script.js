//*** TO DO: Add a 'genre' tag for each book title
const books = [
  //Nonfiction titles
  { title: "Pride and Prejudice", 
    author: "Jane Austen", 
    genre: "Nonfiction", 
    summary: "A witty and romantic novel following Elizabeth Bennet as she navigates love, class, and misunderstandings in 19th-century England, particularly with the proud yet intriguing Mr. Darcy.",
    imageLink: "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF1000,1000_QL80_.jpg"
  },
  { title: "A Short History of Nearly Everything", 
    author: "Bill Bryson", 
    genre: "Nonfiction", 
    summary: "A humorous and engaging exploration of science and the universe, where Bryson explains everything from the Big Bang to the rise of humans, making complex topics accessible and entertaining.",
    imageLink: "https://upload.wikimedia.org/wikipedia/en/e/ed/Bill_bryson_a_short_history.jpg"
  },
  { 
    title: "The Diary of a Young Girl", 
    author: "Anne Frank", 
    genre: "Nonfiction", 
    imageLink: "https://images.booksense.com/images/097/643/9781417643097.jpg"
  },
  { title: "Outliers: The Story of Success", 
    author: "Malcolm Gladwell", 
    genre: "Nonfiction", 
    imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1344266315i/3228917.jpg"
  },
  { title: "Night", 
    author: "Elie Wiesel", 
    genre: "Nonfiction", 
    imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1709507006i/1617.jpg"
  },
  { 
    title: "The Immortal Life of Henrietta Lacks", 
    author: "Rebecca Skloot", 
    genre: "Nonfiction", 
    imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327878144i/6493208.jpg"
  },
  { title: "Blink: The Power of Thinking Without Thinking", 
    author: "Malcolm Gladwell",
    genre: "Nonfiction", 
    imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1440763417i/40102.jpg"
  },
  { title: "Midnight in the Garden of Good and Evil", 
    author: "John Berendt", genre: "Nonfiction", 
    imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1427166915i/386187.jpg"
  },
  { title: "Sapiens: A Brief History of Humankind", 
    author: "Yuval Noah Harari", 
    genre: "Nonfiction", 
    imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg"
  },
  { title: "The God Delusion", 
    author: "Richard Dawkins", 
    genre: "Nonfiction", 
    imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347220693i/14743.jpg"
  },

  //Fiction Titles
  { title: "Adventures of Huckleberry Finn", 
    author: "Mark Twain", 
    genre: "Fiction", 
    imageLink: "https://www.ucpress.edu/_next/image?url=https%3A%2F%2Fwebfiles.ucpress.edu%2Fcoverimage%2Fisbn13%2F9780520343641.jpg&w=1920&q=90"
  },
  { title: "The God of the Woods", 
    author: "Liz Moore", 
    genre: "Fiction", 
    imageLink: "https://m.media-amazon.com/images/I/81gHfeKi+9L.jpg"
  },
  { title: "Fourth Wing", 
    author: "Rebecca Yarros", 
    genre: "Fiction", 
    imageLink: "https://m.media-amazon.com/images/I/71bXcusLgJL.jpg"
  },
  { title: "The God of the Woods", 
    author: "Liz Moore", 
    genre: "Fiction", imageLink: ""
  }
  

  //Horror Titles

  //Mystery Titles

  //Romance Titles
  
];

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
    const genreHeading = document.createElement("h3");
    genreHeading.textContent = `${genre}`;
    genreContainer.appendChild(genreHeading);

    //Add the genre container to the main container
    container.appendChild(genreContainer);

    //Store the container for later use
    genreContainers[genre] = genreContainer;
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
    summary.textContent = book.summary;

    //adds summary to overlayContent
    overlayContent.append(summary);
    overlay.appendChild(overlayContent);

    //Adds the image, title, and author of the book to the card
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
