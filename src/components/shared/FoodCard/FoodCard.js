import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import './FoodCard.scss';

class FoodCard extends React.Component {
  render() {
    const { item, deleteItem } = this.props;

    // ios requires onClick to be added for clickable things
    return (
      <div className="col-12 col-md-6 col-lg-4" onClick={() => {}}>
        <div className="FoodCard">
          <div className="under-card">
            <div className="mod-buttons">
              <button className="btn btn-outline-dark" onClick={() => deleteItem(item.id) }><i className="fas fa-times-circle fa-2x"></i></button>
              <Link className="btn btn-outline-light btn-sm edit-btn" to={`/items/${item.id}/edit`}><i className="fal fa-pencil fa-2x"></i></Link>
            </div>
            <div className="left-panel">
              <div className="pill top">
                {item.primaryLocation}
              </div>
              <div className="item-img" style ={ { backgroundImage: `url("${item.imageUrl}")` } }></div>
              <div className="pill bottom">
                {item.secondaryLocation}
              </div>
            </div>
            <div className="category-icon">
              <i className={`${item.category.icon} fa-2x`}></i>
            </div>
            <div className="info-container">
              <div className="food-name">{item.name}</div>
              <div className="notes"><strong>Notes: </strong> {item.notes.length > 0 ? item.notes : 'none' }</div>
              <div className="info d-flex flex-wrap">
                <div className="stat col-6">
                  <div className="title">Category</div>
                  <i className={item.category.icon}></i>
                  <div className="value">{item.category.name}</div>
                </div>
                <div className="stat col-6">
                  <div className="title">Quantity</div>
                  <i className="far fa-balance-scale"></i>
                  <div className="value">{item.quantity} {item.unit}</div>
                </div>
                <div className="stat col-6">
                  <div className="title">Purchased</div>
                  <i className="fas fa-clock"></i>
                  <div className="value">{moment(item.purchaseDate).format('L')}</div>
                </div>
                <div className="stat col-6">
                  <div className="title">Expires</div>
                  <i className="fas fa-alarm-clock"></i>
                  <div className="value">{moment(item.expirationDate).format('L')}</div>
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
      </div>
    );
  }
}

export default withRouter(FoodCard);
