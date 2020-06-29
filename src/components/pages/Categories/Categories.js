import React from 'react';

import './Categories.scss';
import categoriesData from '../../../helpers/data/categoriesData';
import CategoryCard from '../../shared/CategoryCard/CategoryCard';

class Categories extends React.Component {
  state = {
    categories: [],
  }

  getCategories = () => {
    categoriesData.getAllCategories()
      .then((categories) => this.setState({ categories }))
      .catch((err) => console.error('unable to get all categories: ', err));
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { categories } = this.state;
    const buildCategoryCards = categories.map((cat) => <CategoryCard key={cat.id} category={cat} />);

    return (
      <div className="Categories col-md-10 offset-md-1 text-center">
        <h1>Categories</h1>
        <div className="d-flex flex-wrap">
          { buildCategoryCards }
        </div>
      </div>
    );
  }
}

export default Categories;
