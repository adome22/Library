class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }
    getBook(title) {
        return this.books.find((book) => book.title === title);
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }
}

const library = new Library();


// UI

const bookModal = document.getElementById("addBookModal");
const addBookBtn = document.getElementById("addBookBtn");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("booksGrid");
const overlay = document.querySelector(".overlay");


const openAddBookModal = () => {
    addBookForm.reset();
    bookModal.classList.add('active');
    overlay.classList.add('active');
}

const closeBookModal = () => {
    bookModal.classList.remove('active');
    overlay.classList.remove('active');
}

const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') closeBookModal();
}

const updateBooksGrid = () => {
    resetBooksGrid();
    for (let book of library.books) {
        createBookCard(book);
    }
}

const resetBooksGrid = () => {
    booksGrid.innerHTML = '';
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttons = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book-card');
    buttons.classList.add('buttons');
    readBtn.classList.add('btn');
    removeBtn.classList.add('btn');
    readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    removeBtn.textContent = 'Remove';

    if (book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.classList.add('btn-light-green')
    } else {
        readBtn.textContent = 'Not read'
        readBtn.classList.add('btn-light-red');
    }
    
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttons.appendChild(readBtn);
    buttons.appendChild(removeBtn);
    bookCard.appendChild(buttons);
    booksGrid.appendChild(bookCard);

}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
  }

const addBook = (e) => {
    e.preventDefault();
    const newBook = getBookFromInput();
    
    if (library.isInLibrary(newBook)) {
        errorMsg.textContent = 'Book already exists'
        errorMsg.classList.add('active');
        return
    }

    library.addBook(newBook);
    saveLocal();
    updateBooksGrid()
    closeBookModal();
}

const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.
    firstChild.innerHTML.replaceAll('"', '');

    library.removeBook(title);
    saveLocal();
    updateBooksGrid();
}

const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
    );
    const book = library.getBook(title);
    
    book.isRead = !book.isRead;
    saveLocal();
    updateBooksGrid();
}


addBookBtn.onclick = openAddBookModal
overlay.onclick = closeBookModal
addBookForm.onsubmit = addBook
window.onkeydown = handleKeyboardInput

// Local Storage

const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
}

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'));
    if (books) {
        library.books = books.map((book) => JSONToBook(book));
    } else {
        library.books = [];
    }
}

// Utils

const JSONToBook = (book) => {
    return newBook(book.title, book.author, book.pages, book.isRead);
}