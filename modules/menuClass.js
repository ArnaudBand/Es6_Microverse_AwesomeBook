import {
  blockDisplay, formSection, contactSection, bookTitle, bookAuthor, form, bookList,
} from './variables.js';

export const listBtn = document.querySelector('.list-btn');
export const addBtn1 = document.querySelector('.adde-btn-1');
export const contactBtn = document.querySelector('.contact-btn');
export const displayList = () => {
  blockDisplay.style.display = 'flex';
  formSection.style.display = 'none';
  contactSection.style.display = 'none';
};

export const displayBookForm = () => {
  blockDisplay.style.display = 'none';
  formSection.style.display = 'flex';
  contactSection.style.display = 'none';
};

export const displayContact = () => {
  contactSection.style.display = 'flex';
  blockDisplay.style.display = 'none';
  formSection.style.display = 'none';
};

/* eslint-disable keyword-spacing */

class Library {
  constructor() {
    this.collection = [];
  }

  static addCollection(newBook) {
    this.collection.push(newBook);
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  static removeABook(target) {
    const removeBook = target.previousElementSibling.firstElementChild.textContent;

    this.collection.filter((book, index) => {
      if (book.title === removeBook) {
        this.collection.splice(index, 1);
      }
      return this.collection;
    });
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  static getBook() {
    if (localStorage.getItem('collection') === null) {
      this.collection = [];
    } else {
      this.collection = JSON.parse(localStorage.getItem('collection'));
    }
    return this.collection;
  }
}

function Book(title, author) {
  this.title = title;
  this.author = author;
}

//  Class UI helps to display and remove books

function UI() {}

UI.prototype.displayBook = (newBook) => {
  Library.collection.forEach((book, index) => {
    if (book.title === newBook.title) {
      if(index % 2 === 0) {
        bookList.innerHTML += `
        <div class="book-class back-gray">
          <div class="books_store">
            <p>${newBook.title}</p>
            <p>&nbsp by ${newBook.author}</p>
          </div>
          <button class='remove' type='button'>Remove</button>
        </div>
        
        `;
      } else {
        bookList.innerHTML += `
        <div class="book-class">
          <div class="books_store">
            <p>${newBook.title}</p>
            <p>&nbsp by ${newBook.author}</p>
          </div>
          <button class='remove' type='button'>Remove</button>
        </div>
        
        `;
      }
    }
  });
};

UI.prototype.deleteInput = (book1, book2) => {
  book1.value = '';
  book2.value = '';
};

UI.prototype.deleteBook = (target) => {
  target.parentElement.remove();
};

const newDisplay = new UI();

// AddBook function: to add books to our page in the storage and change them into objects.

const addBook = (e) => {
  const title = bookTitle.value;
  const author = bookAuthor.value;

  const newBook = new Book(title, author);

  Library.addCollection(newBook);

  newDisplay.displayBook(newBook);
  newDisplay.deleteInput(bookTitle, bookAuthor);

  e.preventDefault();
};

// RemoveBook function: This function was build to remove a book added by the function below

const removeBook = (e) => {
  if (e.target.className === 'remove') {
    newDisplay.deleteBook(e.target);
    Library.removeABook(e.target);

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
};

// AddEventListener

form.addEventListener('submit', addBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', () => {
  const allBooks = Library.getBook();
  allBooks.forEach((book) => newDisplay.displayBook(book));
});
