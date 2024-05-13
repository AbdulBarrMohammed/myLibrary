
//buttons
const addBtn = document.querySelector('.add-btn');

//book shelf
const bookShelf = document.querySelector('.book-shelf');


const myLibrary = [];
let count = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

bookShelf.addEventListener("click", function(e) {
    if(e.target.id == 'read-btn') {
        if (e.target.textContent == 'Read') {
            e.target.textContent = 'Not Read'
        }
        else {
            e.target.textContent = 'Read';
        }

    }
    if(e.target.id == 'remove-btn') {
        const index = myLibrary.indexOf(e.target.parentElement);
        console.log(myLibrary);
        console.log(index);

        myLibrary.splice(index, 1);
        e.target.parentElement.remove();
    }
})


const createBookCard = function(book) {
    const cardDiv = document.createElement('div');
    cardDiv.id = count;
    count = count + 1;
    const pTitle = document.createElement('p');
    const pAuthor = document.createElement('p');
    const pPages = document.createElement('p');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    //style card div
    cardDiv.style.backgroundColor = 'white';
    cardDiv.style.padding = '50px';
    cardDiv.style.boxShadow = 'rgba(0, 0, 0, 0.26) 0px 1px 4px';
    cardDiv.style.borderRadius = '5px';
    cardDiv.style.display = 'flex';
    cardDiv.style.flexDirection = 'column';
    cardDiv.style.gap = '10px';

    //style p tags
    pTitle.style.fontWeight = 'bold';
    pTitle.style.fontSize = '24px';
    pAuthor.style.fontWeight = 'bold';
    pAuthor.style.fontSize = '24px';
    pPages.style.fontWeight = 'bold';
    pPages.style.fontSize = '24px';

    //style buttton
    readBtn.style.paddingLeft = '30px';
    readBtn.style.paddingRight = '30px';
    readBtn.style.backgroundColor = '#0ea5e9';
    readBtn.style.color = 'white';
    readBtn.id = 'read-btn';

    removeBtn.style.backgroundColor = 'hsl(0, 72%, 51%)';
    removeBtn.id = 'remove-btn';



    pTitle.textContent = book.title;
    pAuthor.textContent = book.author;
    pPages.textContent = `${book.pages} pages`;
    removeBtn.textContent = 'Remove'
    if (book.read) {
        readBtn.textContent = 'Read';

    }
    else {
        readBtn.textContent = 'Not Read';
    }

    cardDiv.appendChild(pTitle);
    cardDiv.appendChild(pAuthor);
    cardDiv.appendChild(pPages);
    cardDiv.appendChild(readBtn);
    cardDiv.appendChild(removeBtn);


    addBookToLibrary(cardDiv);

}

function addBookToLibrary(book) {
    myLibrary.push(book);

}

function displayBooks(bookArray) {
    for (let i = 0; i < bookArray.length; i++) {
        bookShelf.appendChild(bookArray[i]);
    }
}

//dialog button
const showButton = document.querySelector('.add-btn');
const favDialog = document.getElementById("favDialog");
const confirmBtn = favDialog.querySelector(".submit-button");
const cancelBtn = favDialog.querySelector(".cancel-button");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    favDialog.close();
    document.querySelector('#author').value = "";
    document.querySelector('#title').value = "";
    document.querySelector('#pages').value = "";
});


// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (e) => {
  event.preventDefault(); // We don't want to submit this fake form
  const form = favDialog.querySelector('form');
  if (!form.checkValidity()) {
    // Form is not valid, so we let the browser show the validation message
    alert("fill in required fields");
    return;
  }
  const newAuthor = document.querySelector('#author').value;
  const newTitle = document.querySelector('#title').value;
  const newPages = document.querySelector('#pages').value;
  const didRead = document.querySelector('#read').checked;

  console.log(`Author ${newAuthor} Title ${newTitle} Pages${newPages}  Read?: ${didRead}`);
  const book = new Book(newTitle, newAuthor, newPages, didRead);
  createBookCard(book);
  displayBooks(myLibrary);

  document.querySelector('#author').value = "";
  document.querySelector('#title').value = "";
  document.querySelector('#pages').value = "";
  favDialog.close();

});
