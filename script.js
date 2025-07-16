const myLibrary = [];

function Book (title, author, pageCount, has_read=false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount
    this.has_read  = has_read;
    this.info = function() {
        const has_read_string = has_read ? 'has read' : 'not read yet'
        console.log(`${title} by ${author}, ${pageCount} pages, ${has_read_string} `)
    }
}

Book.prototype.toggleRead = function() {
    this.has_read = ! this.has_read;
}

const addBookToLibrary = (book) => {
    myLibrary.push(book);
}

const book1 = new Book("Atomic Habits", "James Clear", 320, true);
const book2 = new Book("Deep Work", "Cal Newport", 304);
const book3 = new Book("Brief Answers to Big Quesions", "Stephen Hawking", 350);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

const bookContainer = document.querySelector(".book-container")

function renderBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("h4");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("p");
    bookPages.textContent = `${book.pageCount} pages`;

    const hasRead = document.createElement("p");
    hasRead.textContent = book.has_read ? "Read" : "Not Read";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Read";
    toggleButton.addEventListener("click", () => {
        book.toggleRead();
        hasRead.textContent = book.has_read ? "Read" : "Not Read";
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", () => {
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
        bookCard.remove();
    });

    buttonContainer.appendChild(toggleButton);
    buttonContainer.appendChild(removeButton);

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(hasRead);
    bookCard.appendChild(buttonContainer);

    bookContainer.appendChild(bookCard);
}



for (const book of myLibrary) {
    renderBookCard(book);
    // book.info();
}

const addBookBtn = document.getElementById("add-book-btn");
const bookForm = document.getElementById("book-form");

addBookBtn.addEventListener("click", () => {
    bookForm.style.display = "flex";
    bookContainer.classList.add("bg-filter")
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const hasRead = document.getElementById("has-read").checked;

    const newBook = new Book(title, author, pages, hasRead);
    addBookToLibrary(newBook);
    renderBookCard(newBook);

    bookForm.reset();
    bookForm.style.display = "none";
    bookContainer.classList.remove("bg-filter");
});