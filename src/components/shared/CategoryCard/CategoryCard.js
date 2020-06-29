import React from 'react';

import './CategoryCard.scss';

class CategoryCard extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <div className="col-md-2">
        <div className="CategoryCard vegetable">
          <div className="pill top">
            {category.name}
          </div>
          <div className="icon-holder" style={{ borderColor: category.color }}>
            <i className={`fa-5x ${category.icon}`} style={{ color: category.color }}></i>
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
