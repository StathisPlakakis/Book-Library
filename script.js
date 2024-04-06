const myLibrary = [];
const addButton = document.querySelector(".add");


function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let output = `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        return output;
    }
}

function addBookToLibrary(title, author, pages, read) {
   let newBook = new Book(title, author, pages, read);
   myLibrary.push(newBook);
}

addButton.addEventListener("click", () => {
    const title = prompt("Give me title");
    const author = prompt("Give me author");
    const pages = prompt("Give me pages");
    const read = prompt("Read (y/n)");
    addBookToLibrary(title, author, pages, read);
})