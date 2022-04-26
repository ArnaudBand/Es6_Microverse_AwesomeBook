import {
  displayList, displayBookForm, displayContact, listBtn, addBtn1, contactBtn,
} from './modules/menuClass.js';

import { clockDisplay } from './modules/variables.js';

import { DateTime } from './modules/luxon.js';

listBtn.addEventListener('click', displayList);

addBtn1.addEventListener('click', displayBookForm);

contactBtn.addEventListener('click', displayContact);

const timer = () => {
  const today = DateTime.now();
  clockDisplay.innerText = `${today.toLocaleString(DateTime.DATETIME_FULL)}`;
};

setInterval(timer, 1000);