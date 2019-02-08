import React from 'react';
import { Link } from 'react-router-dom';
import './../stylesheets/RecipesTableRow.css';

const RecipesTableRow = (props) => {
  return (
    <tr id={`recipe_${props.id}`}>
      <td className="recipeName"><Link to={`/recipes/${props.id}`}>{props.name}</Link></td>
      <td className="recipeButtons">
        <Link className="btn btn-info" to={`/recipes/${props.id}/edit`}>Edit</Link>
        <button className="btn btn-danger" onClick={() => props.deleteHandler(props.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default RecipesTableRow;
