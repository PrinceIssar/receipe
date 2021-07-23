import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";
import Recipe from "./Recipe";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        margin: '10px auto',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },

}));

function App() {
    const classes = useStyles();
  // useEffect need for api
  const APP_ID = '7a2529fc';
  const APP_KEY = '61efe58ac251fd4cb77555211348d646\t';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(""); // not to have a default food
  // don't want to render everytime someone writes a word but once he click search button
 const [query, setQuery]= useState('chicken');
  useEffect(() => {  //
    getRecipe();
  }, [query]); //useEffect:   [] will not run the effect array we gave is dependency
// whenever some click then only this query will work.
  // to call api ,using axios installing axois in cdm
  const getRecipe = async () => {
    const response = await axios.get(`https:api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const updateQuery = (e) =>{
    e.preventDefault(); // this will stop the form to refresh
    setQuery(search);// setQuery = search
  }

  return (
      <div>
          <Paper onSubmit={updateQuery} component="form" className={classes.root}>

              <InputBase
                  type="text"
                  value={search}
                  onChange={updateSearch}
                  className={classes.input}
                  placeholder="Search for Recipe"
                  inputProps={{ 'aria-label': 'Search for recipe' }}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
              </IconButton>

          </Paper>
    {/*<form onSubmit={updateQuery}>*/}
    {/*  <input type="text" value={search} onChange={updateSearch}/>*/}
    {/*  <button type="submit">Search</button>*/}
    {/*</form>*/}
    {recipes.map((recipe) => (
      // will pass all props here title ,cal,img ,ingre in Recipe.js
      <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
      />
    ))}
  </div>
  );
}


export default App;
