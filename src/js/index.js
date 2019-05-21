////////////////////////////////////
/////// Controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state of the App
 * -Search Object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1) Get query from the view
  const query = searchView.getInput();  

  if(query){
    // 2) New search object and add it to state
    state.search = new Search(query);
    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResultParent);

    try {
      // 4) Search for recipes
      await state.search.getResults();    
      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result)

    } catch (err) {
      alert('Something went wrong...');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if(btn){
    const gotoPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, gotoPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get ID from the URL
  const id = window.location.hash.replace('#','');
  if(id){ 
    // Prepare the UI for Changes

    // Create a new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();
      // Calculate serving and time
  
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      // Render the recipe
      console.log(state.recipe);
    } catch (err) {
      alert('Error processing recipe');
    }
  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
 
[' hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
