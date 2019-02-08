import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../stylesheets/RecipeEditPage.css';

class RecipeEditPage extends Component {
  constructor(props) {
  	super(props);

  	if (typeof props.recipe !== "undefined") {
	  	this.state = {
	  		editedIngredients: [...props.recipe.ingredients],
	  		editedRecipeName: props.recipe.name
	  	}
  	}

  	this.updateRecipeName = this.updateRecipeName.bind(this);
  	this.updateIngredient = this.updateIngredient.bind(this);
  	this.removeIngredient = this.removeIngredient.bind(this);
  	this.addIngredient = this.addIngredient.bind(this);
  	this.saveChangesAndNavigate = this.saveChangesAndNavigate.bind(this);
  }

  updateRecipeName(shouldBeTrimmed, e) {
  	this.setState({
  		editedRecipeName: shouldBeTrimmed ? e.target.value.trim() : e.target.value
  	});
  }

  updateIngredient(updatedIndex, shouldBeTrimmed, e) {
  	e.persist();
  	this.setState(prevState => {
  		return {
  			editedIngredients: prevState.editedIngredients.map((element, index) => {
  				if (index !== updatedIndex) {
  					return element;
  				} else {
  					return shouldBeTrimmed ? e.target.value.trim() : e.target.value;
  				}
  			})
		} 
  	});
  }

  removeIngredient(removedIndex, e) {
  	this.setState(prevState => {
  		return {
  			editedIngredients: prevState.editedIngredients.filter((element, index) => index !== removedIndex)
  		}
  	})
  }

  addIngredient() {
  	this.setState(prevState => {
  		return {
  			editedIngredients: [...prevState.editedIngredients, ""]
  		}
  	})
  }

  saveChangesAndNavigate(recipeId, newRecipeName, newIngredients) {
    this.props.saveChanges(recipeId, newRecipeName, newIngredients);
    this.props.history.push("/recipes/" + recipeId);
  }

  render() {
    return (
        <div className="RecipeEditPage">
        	<div className="alignRight">
        		<Link to="/" className="btn btn-primary">View all Recipes</Link>
    		</div>
    		{ typeof this.props.recipe !== "undefined" ? (
    			<div>
		    		<div>
		    			<button className="btn btn-primary saveChangesButton" onClick={() => this.saveChangesAndNavigate(this.props.recipe.id, this.state.editedRecipeName, this.state.editedIngredients)}>Save Changes</button>
		    			<Link className="btn btn-danger" to={`/recipes/${this.props.recipe.id}`}>Cancel</Link>
	    			</div>

	    			<h2 className="recipeName">
	    				<input type="text" className="form-control" value={this.state.editedRecipeName} placeholder="Recipe name"
						onChange={(e) => this.updateRecipeName(false, e)}
						onBlur={(e) => this.updateRecipeName(true, e)} />
	    			</h2>

		            <div className="ingredients">
		            	{ this.state.editedIngredients.length > 0 ? (
		            		this.state.editedIngredients.map((ingredient, index) => {
	            				return (
	            					<div key={index} className="ingredientRow">
	            						<input type="text" className="form-control" value={ingredient} placeholder="Ingredient name"
	            						onChange={(e) => this.updateIngredient(index, false, e)}
	            						onBlur={(e) => this.updateIngredient(index, true, e)} />
	            						<button className="btn btn-danger" onClick={(e) => this.removeIngredient(index, e)}>Remove</button>
	            					</div>
	            				)
	            			})
	            		) : (
	            			<p>No ingredients yet</p>
	            		)}
		            </div>
					<button className="btn btn-primary addIngredientButton" onClick={this.addIngredient}>Add Ingredient</button>
	            </div>
            ) : (
            	<div>
            		<div className="errorMessage">Oops... Looks like this recipe doesn't exist!</div>	
            		<div className="errorMessage">Please check your URL or go back to the home page</div>
        		</div>	
        	)}
        </div>
    );
  }
}

export default RecipeEditPage;
