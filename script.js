const myLibrary = [];
const addButton = document.querySelector(".add");
const tableBody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("#submit");
const cancelButton = document.querySelector("#cancel");




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
   console.log(newBook);
}

function arrayTraversal (array) {
    array.forEach(element => {
        let titleContent = element.title;
        let authorContent = element.author;
        let pagesContent = element.pages;
        let readContent = element.read;
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        td1.textContent = `${titleContent}`;
        td2.textContent = `${authorContent}`;
        td3.textContent = `${pagesContent}`;
        td4.textContent = `${readContent}`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tableBody.appendChild(tr);
    });
}

addButton.addEventListener("click", () => {
    dialog.showModal();
})

cancelButton.addEventListener("click", () => {
    dialog.close();
})
// const title = prompt("Give me title");
//     const author = prompt("Give me author");
//     const pages = prompt("Give me pages");
//     const read = prompt("Read (y/n)");
//     addBookToLibrary(title, author, pages, read);
//     arrayTraversal(myLibrary);