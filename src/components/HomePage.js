import React, { Component } from 'react';
import RecipesTable from './RecipesTable';
import './../stylesheets/HomePage.css';

class HomePage extends Component {
  render() {
    return (
        <div className="HomePage">
            <RecipesTable recipes={this.props.recipes} deleteHandler={this.props.deleteHandler} />
        </div>
    );
  }
}

export default HomePage;
