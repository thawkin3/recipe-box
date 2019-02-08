import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipesTableRow from './RecipesTableRow';
import './../stylesheets/RecipesTable.css';

class RecipesTable extends Component {
  render() {
    if (this.props.recipes) {
      return (
          <table className="RecipesTable table table-striped">
          	<thead>
          		<tr>
          			<th className="recipeName">Recipes</th>
                <th className="recipeButtons"><Link className="btn btn-primary" to="/addNewRecipe">Add a New Recipe</Link></th>
          		</tr>
          	</thead>
          	<tbody>
            { this.props.recipes.length > 0 ? (
              this.props.recipes.map((element, index) => <RecipesTableRow key={element.id} {...element} deleteHandler={this.props.deleteHandler} />)
          	) : (
              <tr id="noRecipesFound">
                <td className="recipeName">Looks like you haven't added any recipes yet. Add one now!</td>
                <td className="recipeButtons"></td>
              </tr>
            )}
            </tbody>
          </table>
      );
    } else {
      return false;
    }
  }
}

export default RecipesTable;
