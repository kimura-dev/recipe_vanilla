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

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};

