let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 304,
        read: false
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R Tolkien",
        pages: 1178,
        read: false
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookToLibrary = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('isRead').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// UI

const bookModal = document.getElementById("form-modal");
const addBookBtn = document.getElementById("add-book-btn");
const closeModalBtn = document.getElementById("close-btn");
const addBookForm = document.getElementById("add-book-form");
const bookGrid = document.getElementById("book-grid");
const overlay = document.querySelector(".overlay");


const openAddBookModal = () => {
    bookModal.classList.add('active');
    overlay.classList.add('active');
}

const closeBookModal = () => {
    bookModal.classList.remove('active');
    overlay.classList.remove('active');
}


addBookBtn.onclick = openAddBookModal
closeModalBtn.onclick = closeBookModal




