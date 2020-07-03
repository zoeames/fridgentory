import React from 'react';

import './CategoryCard.scss';

class CategoryCard extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <div className="col-md-2">
        <div className="CategoryCard">
          <div className="pill top">
            {category.name}
          </div>
          <div className="icon-holder">
            <i className={`fa-5x ${category.icon}`}></i>
          </div>
          <div className="pill bottom">
            {'1000 items'}
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryCard;
