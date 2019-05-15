import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  // This will delete all the HTML in the element
  elements.searchResultList.innerHTML = '';
};

// Private Function
//  'Pasta with tomato and spinach'
// acc: 0 /acc + current.length = 5 / newTitle = ['Pasta']
// acc: 5 /acc + current.length = 9 / newTitle = ['Pasta', 'with']
// acc: 9 /acc + current.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
// acc: 15 /acc + current.length = 18 / newTitle = ['Pasta', 'with', 'tomato'] BREAK;
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  if(title.length > limit){
    title.split(' ').reduce((acc, current) => {
      if(acc + current.length <= limit){
        newTitle.push(current);
      }

      return acc + current.length;

    }, 0);

    return `${newTitle.join(' ')}...`
  }

  return title;
};

export const renderRecipe = recipe => {
  const markup = `
      <li>
          <a class="results__link results__link--active" href="#${recipe.recipe_id}">
              <figure class="results__fig">
                  <img src="${recipe.image_url}" alt="${recipe.title}">
              </figure>
              <div class="results__data">
                  <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                  <p class="results__author">${recipe.publisher}</p>
              </div>
          </a>
      </li>
  `;

  elements.searchResultList.insertAdjacentHTML('beforeend', markup);

};

// Type can be 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
    </button>
`;

const renderButtons = (page, numResults, resultsPerPage) => {
  // always want it to round up. This will be my 3 pages
  const pages = Math.ceil(numResults / resultsPerPage);

  let button;
  if(page === 1 && pages > 1){
    // only button to go to NEXT page
    button = createButton(page, 'next');
  } else if (page < pages){
    // want both buttons PREV & NEXT page
    button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
    `;

  } else if (page === pages && pages > 1){
    // only button to go to PREV page
    button = createButton(page, 'prev');
  }

  elements.searchResultPages.insertAdjacentHTML('afterbegin', button)
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  // Render results of current page
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  // Using slice seperates the results into increments of 10
  recipes.slice(start, end).forEach(renderRecipe);

  // Render pagination buttons
  renderButtons(page, recipes.length, resultsPerPage);
};

