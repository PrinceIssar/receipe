import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";
import Recipe from "./Recipe";

function App() {
  // useEffect need for api
  const APP_ID = '7a2529fc';
  const APP_KEY = '61efe58ac251fd4cb77555211348d646\t';
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState(""); // not to have a default food
  useEffect(() => {  //
    getRecipe();
  }, []); //useEffect:   [] will not run the effect array we gave is dependency

  // to call api ,using axios installing axois in cdm
  const getRecipe = async () => {
    const response = await axios.get(`https:api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipe(response.data.hits);
    console.log(response.data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target);
  }
  return (
      <div className="App">
    <form>
      <input type="text" value={search} onChange={updateSearch}/>
      <button type="button">Search</button>
    </form>
    {recipe.map((recipe) => (
      // will pass all props here title ,cal,img ,ingre in Recipe.js
      <Recipe title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
      />
    ))}


  </div>
  )
};


export default App;
