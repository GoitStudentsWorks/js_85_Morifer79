import { loader } from './loader.js';
import { imgSrcs } from './pop-up.js';

const BOOKS_DATA_KEY = 'books-data';
const bookArray = JSON.parse(sessionStorage.getItem(BOOKS_DATA_KEY)) || [];

const cartTitle = `<h2>Shopping <span class="">List</span></h2>`;
const shoppingListContainer = document.querySelector(
  '.shopping-list-container'
);

function renderShoppingList() {
  shoppingListContainer.innerHTML = '';
  if (!bookArray.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Ваш список покупок порожній.';
    shoppingListContainer.appendChild(emptyMessage);
    loader.classList.add('hide');
		return;
  }
  loader.classList.add('hide');
  return (shoppingListContainer.innerHTML = createMarkupShop(bookArray));
}

if (window.location.href.includes('cart.html')) {
  loader.classList.remove('hide');
	renderShoppingList();
	shoppingListContainer.addEventListener('click', event => {
    if (event.target.classList.contains('shopping-list-card__remove-btn')) {
      const bookIndex = bookArray.find(
        el => el._id === event.target.getAttribute('id')
      );
      if (bookIndex !== -1) {
        bookArray.splice(bookIndex, 1);
        sessionStorage.setItem(BOOKS_DATA_KEY, JSON.stringify(bookArray));
        renderShoppingList(bookArray);
      }
    }
  });
}

function createMarkupShop(arr) {
  const markup =
    cartTitle +
    arr
      .map(
        book => `
    <div class="shopping-list-card">
      <img src="${book.book_image}" alt="${book.title}" class="shopping-list-card__image">
      <h2 class="shopping-list-card__title">${book.title}</h2>
      <p class="shopping-list-card__category">${book.list_name}</p>
      <p class="shopping-list-card__description">${book.description}</p>
      <p class="shopping-list-card__author">Автор: ${book.author}</p>
      <div class="shopping-list-card__links">
        <ul>
          <li><a href="${book.buy_links[0].url}" target="_blank"><img src="${imgSrcs.amazonSrcX1}" alt="${book.buy_links[0].name}" srcset="${imgSrcs.amazonSrcX1} 1x, ${imgSrcs.amazonSrcX2} 2x"></a></li>
          <li><a href="${book.buy_links[1].url}" target="_blank"><img src="${imgSrcs.appleBooksSrcX1}" alt="${book.buy_links[1].name}" srcset="${imgSrcs.appleBooksSrcX1} 1x, ${imgSrcs.appleBooksSrcX2} 2x"></a></li>
          <li><a href="${book.buy_links[2].url}" target="_blank"><img src="${imgSrcs.barnesAndNobleSrcX1}" alt="${book.buy_links[2].name}" srcset="${imgSrcs.barnesAndNobleSrcX1} 1x, ${imgSrcs.barnesAndNobleSrcX2} 2x"></a></li>
        </ul>
      </div>
      <button class="shopping-list-card__remove-btn" id="${book._id}">Видалити зі списку</button>
    </div>
  `
      )
      .join('');
  return markup;
}
