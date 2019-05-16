import axios from 'axios';
import { URL, API_KEY } from '../config';


export default class Recipe {
  // Will use recipe_id to get the specific recipe data
  constructor(id){
    this.id = id;
  }

  async getRecipe(){
    try {
      const res = await axios(`${URL}/get?key=${API_KEY}&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch(err){
      console.log(err);
      alert(`Something went wrong :( : ${err}`);
    }
  };

  calcTime(){
    // Assuming we need 15 mins for every 3 ingredients
    const numOfIng = this.ingredients.length;
    const periods = Math.ceil(numOfIng / 3);
    // new time property
    this.time = periods * 15;
  };

  calcServings(){
    this.servings = 4;
  }
};