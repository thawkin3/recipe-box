import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../stylesheets/RecipeAddNewPage.css';

class RecipeAddNewPage extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		editedIngredients: ["", "", ""],
  		editedRecipeName: ""
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

  saveChangesAndNavigate(newRecipeName, newIngredients) {
    this.props.addNewRecipe(newRecipeName, newIngredients);
    this.props.history.push("/");
  }

  render() {
    return (
        <div className="RecipeAddNewPage">
        	<div className="alignRight">
        		<Link to="/" className="btn btn-primary">View all Recipes</Link>
    		</div>
    		
    		<div>
    			<button className="btn btn-primary saveChangesButton" onClick={() => this.saveChangesAndNavigate(this.state.editedRecipeName, this.state.editedIngredients)}>Save Recipe</button>
    			<Link className="btn btn-danger" to="/">Cancel</Link>
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
    );
  }
}

export default RecipeAddNewPage;
