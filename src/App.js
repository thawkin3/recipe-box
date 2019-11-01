import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import RecipeAddNewPage from './components/RecipeAddNewPage';
import RecipeEditPage from './components/RecipeEditPage';
import './stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingInitialRecipes: true,
      recipes: []
    }

    this.MyHomePage = this.MyHomePage.bind(this);
    this.MyRecipePage = this.MyRecipePage.bind(this);
    this.MyRecipeEditPage = this.MyRecipeEditPage.bind(this);
    this.MyRecipeAddNewPage = this.MyRecipeAddNewPage.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);

  }

  componentDidMount() {
    let shouldUseLocalStorage = typeof window.localStorage !== "undefined" && typeof window.localStorage.recipes !== "undefined" && JSON.parse(window.localStorage.recipes).length > 0;
    let recipes = shouldUseLocalStorage ? JSON.parse(window.localStorage.recipes) : [
      {name: "Apple Pie", id: 1, ingredients: ["Apples", "Cinnamon", "Sugar", "Butter", "Pie Crust"]}, 
      {name: "Spaghetti", id: 2, ingredients: ["Noodles", "Tomato Sauce", "Meatballs (Optional)"]}, 
      {name: "Chicken Burritos", id: 3, ingredients: ["Chicken", "Tortillas", "Cheese", "Rice", "Beans"]}
    ];

    this.setState({
      recipes: recipes,
      loadingInitialRecipes: false
    });
  }

  MyHomePage(props) {
    return (
      <HomePage {...props} 
      recipes={this.state.recipes} deleteHandler={this.deleteHandler} />
    );
  }

  MyRecipePage(props) {
    return (
      <RecipePage {...props}
      recipe={this.state.recipes.filter(element => element.id === Number(props.match.params.recipeId))[0]} />
    );
  }

  MyRecipeEditPage(props) {
    return (
      <RecipeEditPage {...props}
      recipe={this.state.recipes.filter(element => element.id === Number(props.match.params.recipeId))[0]}
      saveChanges={this.saveChanges} />
    );
  }

  MyRecipeAddNewPage(props) {
    return (
      <RecipeAddNewPage {...props}
      addNewRecipe={this.addNewRecipe} />
    );
  }

  deleteHandler(recipeId) {
    this.setState((prevState) => {
      return {
        recipes: prevState.recipes.filter((recipe) => recipe.id !== recipeId)
      }
    }, this.saveToLocalStorage);
  }

  saveChanges(recipeId, newRecipeName, newIngredients) {
    newIngredients = newIngredients.filter(element => element !== "");

    this.setState(prevState => {
      return {
        recipes: prevState.recipes.map((element, index) => {
          if (element.id !== recipeId) {
            return element;
          } else {
            return {
              id: element.id,
              name: newRecipeName,
              ingredients: newIngredients
            };
          }
        })
      }
    }, this.saveToLocalStorage);
  }

  addNewRecipe(recipeName, recipeIngredients) {
    if (recipeName !== "") {
      recipeIngredients = recipeIngredients.filter(element => element !== "");

      this.setState(prevState => {
        let newId = prevState.recipes.reduce((accumulator, element) => {
          return element.id > accumulator ? element.id : accumulator; 
        }, 0);

        return {
          recipes: [...prevState.recipes, {
            id: newId + 1,
            name: recipeName,
            ingredients: recipeIngredients
          }]
        }
      }, this.saveToLocalStorage);
    }
  }

  saveToLocalStorage() {
    if (typeof window.localStorage !== "undefined") {
      window.localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <header className="App-header">
                <h1 className="App-title">Recipe Box</h1>
              </header>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { !this.state.loadingInitialRecipes ? (
                <div>
                  <Router basename="/recipeBox">
                    <Switch>
                      <Route exact path="/" render={this.MyHomePage} />
                      <Route exact path="/addNewRecipe" render={this.MyRecipeAddNewPage} />
                      <Route exact path="/recipes/:recipeId" render={this.MyRecipePage} />
                      <Route exact path="/recipes/:recipeId/edit" render={this.MyRecipeEditPage} />
                      <Redirect from="*" to="/" />
                    </Switch>
                  </Router>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <footer className="App-footer">
                <p>Created by Tyler Hawkins</p>
                <p>Check out the rest of my portfolio <a href="http://tylerhawkins.info">here</a></p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
