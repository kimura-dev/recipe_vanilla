////////////////////////////////////
/////// Controller
import axios from 'axios';

// URL : https://www.food2fork.com/api/search
// API KEY Food2Fork - f42946af5e7d8514c9c65074da2c433d

async function getResults(query){
  const proxy = 'https://crossorigin.me/';
  const URL = 'https://www.food2fork.com/api/search';
  const API_KEY = 'f42946af5e7d8514c9c65074da2c433d';

  try {
    const res = await axios(`${URL}?key=${API_KEY}&q=${query}`)
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch(err) {
    alert(err);
  }
};

getResults('pasta chicken');
