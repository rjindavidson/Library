let myLibrary = [];

function Book(title, author, pages, readBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
}

/* IDs selectors */
const newBookForm = document.getElementById("newBookForm");
const bookGrid = document.getElementById("bookGrid");
const addBookButton = document.getElementById("addBookButton");
const dialogForm = document.getElementById("dialogForm")

const getBook = (bookTitle) => {
    return myLibrary.find((book) => book.title === bookTitle);
}

const submitBookForm = (e) => {
    e.preventDefault();
    try {
        const titleInput = document.getElementById("title").value;
        const authorInput = document.getElementById("author").value;
        const pagesInput = document.getElementById("pages").value;
        const isReadInput = document.getElementById("isRead").checked;

        if (myLibrary.some((book) => book.title === titleInput)) {
            throw new Error();
        }

        addBookToLibrary(new Book(titleInput, authorInput, pagesInput, isReadInput))
        dialogForm.close();
    } catch(e) {
        console.log(e)
    }

    newBookForm.reset();
}

const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML;

    const book = getBook(title);
    book.readBook = !book.readBook;
    updateLibrary();
}

const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML;
    
    myLibrary = myLibrary.filter((book) => book.title !== title);
    updateLibrary();
}

const clearLibrary = () => {
    bookGrid.innerHTML = '';
}

const updateLibrary = () => {
    clearLibrary()
    for (let book of myLibrary) {
        createBookCard(book);
    }
}

const createBookCard = (book) => {
    const newCard = document.createElement("div");
    const cardTitle = document.createElement("p");
    const cardAuthor = document.createElement("p");
    const cardPages = document.createElement("p");
    const cardButtons = document.createElement("div");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    newCard.classList.add('book-card');
    cardButtons.classList.add('book-card-buttons');
    readButton.onclick = toggleRead;
    removeButton.onclick = removeBook;
    
    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPages.textContent = `${book.pages} Pages`;
    readButton.textContent = book.readBook ? 'Read' : 'Not Read';
    removeButton.textContent = 'Remove';

    newCard.appendChild(cardTitle);
    newCard.appendChild(cardAuthor);
    newCard.appendChild(cardPages);
    cardButtons.appendChild(readButton);
    cardButtons.appendChild(removeButton);
    newCard.appendChild(cardButtons);
    bookGrid.appendChild(newCard);
}

const addBookToLibrary = (book) => {
    myLibrary.push(book);
    createBookCard(book);
}

/* ID selector function */
newBookForm.onsubmit = submitBookForm;
addBookButton.addEventListener("click", () => {
    dialogForm.showModal();
});

const onClickOutsideDialog = (e) => {
    if (e.target === dialogForm) {
        dialogForm.close();
    }
}
dialogForm.addEventListener("click", onClickOutsideDialog)
