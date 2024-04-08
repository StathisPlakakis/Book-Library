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

        let td1 = document.createElement("td");
        td1.textContent = book.title;

        let td2 = document.createElement("td");
        td2.textContent = book.author;

        let td3 = document.createElement("td");
        td3.textContent = parseInt(book.pages);

        let readStatus = document.createElement("button");
        readStatus.textContent = (book.read) ? "Read" : "Not Read";
        readStatus.setAttribute("index", index);
        readStatus.addEventListener("click", (e) => {
            let inde = e.target.getAttribute("index");
            changeReadSta(inde);
        })

        let delButton = document.createElement("button");
        delButton.setAttribute("index", index);
        delButton.textContent = "Delete";
        delButton.addEventListener("click", (e) => {
            let ind = e.target.getAttribute("index");
            removeBook(ind);
        })

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
