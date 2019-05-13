import axios from 'axios';

export default class Search {
  constructor(query){
    this.query = query;
  }

  async getResults(){
    const URL = 'https://www.food2fork.com/api/search';
    const API_KEY = 'f42946af5e7d8514c9c65074da2c433d';
  
    try {
      const res = await axios(`${URL}?key=${API_KEY}&q=${this.query}`)
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch(err) {
      alert(err);
    }
  }
}