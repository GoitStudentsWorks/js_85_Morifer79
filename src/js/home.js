import Notiflix from 'notiflix';
import { getTopBooks } from './api';
export const container = document.querySelector('.js-home-markup');

getTopBooks()
  .then(data => {
    return container.innerHTML = createMarkupHome(data);
  })
  .catch(() =>
    Notiflix.Notify.failure('Failed to load books. Please try again later.')
  );
function createMarkupHome(data) {
  const markup = data
    .map(
      data => `
    <div class="home-card-container">
      <h3 class="home-category-title">${data.list_name}</h3>
      <ul class="home-category-cards">
      ${data.books
        .map(
          book => `<li class="home-card" id="${book._id}">
          <div class="home-card-wrap">
          <img src="${book.book_image}" alt="${book.title} loading="lazy" width="335">
          <p class="home-card-overlay">quick view</p>
          </div>
          <h2 class="home-card-title">${book.title}</h2>
          <p class="home-card-author">${book.author}</p>
        </li>`
        )
        .join('')}
      </ul>
      <button type="button" class="home-category-btn js-seemore-btn" data-category="${data.list_name}">see more</button>
    </div>`
    )
    .join('');
  return markup;
}
console.log();