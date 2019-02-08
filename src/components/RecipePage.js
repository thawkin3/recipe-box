import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../stylesheets/RecipePage.css';

class RecipePage extends Component {
  render() {
    return (
        <div className="RecipePage">
        	<div className="alignRight">
        		<Link to="/" className="btn btn-primary">View all Recipes</Link>
    		</div>
    		{ typeof this.props.recipe !== "undefined" ? (
    			<div>
		    		<h2 className="recipeName">{this.props.recipe.name}<Link className="btn btn-info" to={`/recipes/${this.props.recipe.id}/edit`}>Edit</Link></h2>
		            <div className="ingredients">
		            	<ul>
		            		{ this.props.recipe.ingredients.map((ingredient, index) => {
		            				return <li key={index}>{ingredient}</li>
		            			})
		            		}
		            	</ul>
		            </div>
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

export default RecipePage;
