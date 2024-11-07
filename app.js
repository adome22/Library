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
    const isRead = document.getElementById('isRead').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}







