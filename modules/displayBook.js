// eslint-disable-next-line import/no-cycle
import Library from './menuClass.js';
import { bookList } from './variables.js';

export default class UI {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

    displayBook = (newBook) => {
      Library.collection.forEach((book, index) => {
        if (book.title === newBook.title) {
          if (index % 2 === 0) {
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

      deleteInput = (book1, book2) => {
        book1.value = '';
        book2.value = '';
      };

      deleteBook = (target) => {
        target.parentElement.remove();
      };
}
