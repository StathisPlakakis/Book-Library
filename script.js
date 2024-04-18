const myLibrary = [];
const addButton = document.querySelector(".add");
const tableBody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("#submit");
const cancelButton = document.querySelector("#cancel");


class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        let output = `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        return output;
    }
}



Book.prototype.changeReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
   let newBook = new Book(title, author, pages, read);
   myLibrary.push(newBook);
}


function checkArray(titl, autho) {
    for (let i = 0; i < myLibrary.length; ++i) {
        if (myLibrary[i].title === titl && myLibrary[i].author === autho) {
            return true;
        } 
    }
    return false;

}

function removeBook (index) {
    myLibrary.splice(index, 1);
    render();
}

function changeReadSta(index) {
    myLibrary[index].changeReadStatus();
    render();
}

function render () {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    myLibrary.forEach((book, index) => {
        let tr = document.createElement("tr");

        let td0 = document.createElement("td");
        td0.textContent = `${parseInt(index + 1)})`;

        let td1 = document.createElement("td");
        td1.textContent = book.title;

        let td2 = document.createElement("td");
        td2.textContent = book.author;

        let td3 = document.createElement("td");
        td3.textContent = parseInt(book.pages);

        let readStatus = document.createElement("td");
        readStatus.textContent = (book.read) ? "Read" : "Not Read";
        readStatus.setAttribute("index", index);
        readStatus.addEventListener("click", (e) => {
            let inde = e.target.getAttribute("index");
            changeReadSta(inde);
        })
        readStatus.addEventListener("mouseenter", () => {
            readStatus.style.cursor = "pointer";
        })
        readStatus.style.backgroundColor = (book.read) ? "rgba(130, 249, 140, 0.599)" : "rgba(249, 74, 74, 0.599)";

        let delButton = document.createElement("td");
        delButton.setAttribute("index", index);
        delButton.textContent = "Delete";
        delButton.addEventListener("click", (e) => {
            let ind = e.target.getAttribute("index");
            removeBook(ind);
        })
        delButton.addEventListener("mouseenter", () => {
            delButton.style.cursor = "pointer";
            delButton.style.color = "rgba(249, 74, 74, 0.599)";
        })
        delButton.addEventListener("mouseleave", () => {
            delButton.style.color = "black";
        })

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(readStatus);
        tr.appendChild(delButton);
        tbody.appendChild(tr);
    })
}

addButton.addEventListener("click", () => {
    dialog.showModal();
})

cancelButton.addEventListener("click", () => {
    dialog.close();
})

submitButton.addEventListener("click", (e) => {
    let bookTitle = document.querySelector("#title");
    let bookAuthor = document.querySelector("#author");
    let bookPages = document.querySelector("#pages");
    let bookRead = document.querySelector("#read");

    

    if (bookAuthor.value.length !== 0 && bookTitle.value.length !== 0 && parseInt(bookPages.value) >= 1) {

        e.preventDefault()
        document.querySelector("#error").textContent = (checkArray(bookTitle.value, bookAuthor.value)) ? "This Book exists!" : "";

        if (document.querySelector("#error").textContent === "") {
            let title = bookTitle.value;
            let author = bookAuthor.value;
            let pages = parseInt(bookPages.value);
            let read = bookRead.checked;
            addBookToLibrary(title, author, pages, read);
            document.querySelector("form").reset();
            dialog.close();
            render();
        }
        
    }
})
