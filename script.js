const myLibrary = [];

function Book(title, author, pages, readBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
}

/* IDs selectors */
const newBookForm = document.getElementById("newBookForm");

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const isReadInput = document.getElementById("isRead");
    console.log(titleInput);
    console.log(authorInput);
    console.log(pagesInput);
    console.log(isReadInput);
})

function addBookToLibrary(book) {
    // on form submit add book to myLibrary
    myLibrary.push(book);
}