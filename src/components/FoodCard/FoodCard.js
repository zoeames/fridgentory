import React from 'react';

import './FoodCard.scss';

class FoodCard extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="FoodCard">
        <div className="under-card">
          <div className="left-panel">
            <div className="pill top">
              {item.primaryLocation}
            </div>
            <div className="item-img center" style ={ { backgroundImage: `url("${item.imageUrl}")` } }></div>
            <div className="pill bottom">
              {item.secondaryLocation}
            </div>
          </div>
          <div className="info-container">
            <div className="food-name">{item.name}</div>
            <div className="notes">{item.notes}</div>
            <div className="info d-flex flex-wrap">
              <div className="col-6">
                <div className="title">Category</div>
                <i class={item.category.icon}></i>
                <div className="value">{item.category.name}</div>
              </div>
              <div className="col-6">
                <div className="title">Quantity</div>
                <i class="far fa-balance-scale"></i>
                <div className="value">{item.quantity}</div>
              </div>
              <div className="col-6">
                <div className="title">Purchased</div>
                <i class="fas fa-clock"></i>
                <div className="value">{item.purchaseDate}</div>
              </div>
              <div className="col-6">
                <div className="title">Expires</div>
                <i class="fas fa-alarm-clock"></i>
                <div className="value">{item.expirationDate}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="over-card">
          <div className="food-name">{item.name}</div>
          <p>{item.description}</p>
          <span className="more mobile">Click for more...</span>
          <span className="more desktop">Hover for more...</span>
        </div>
      </div>
    );
  }
}

export default FoodCard;
