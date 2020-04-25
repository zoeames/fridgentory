import React from 'react';

import './FoodCard.scss';

class FoodCard extends React.Component {
  render() {
    const item = {
      name: 'Kale',
      description: 'Kale is a green, leafy, cruciferous vegetable that is rich in nutrients.',
      imageUrl: 'https://www.thespruceeats.com/thmb/CgxMLQpJa3b5hMrSZAHhhqS9FuQ=/1500x1000/filters:fill(auto,1)/GettyImages-1136884993-e98853997496413d87092050e4ad7409.jpg',
      type: 'Vegetable',
      location: 'Fridge',
    };

    return (
      <div className="FoodCard">
        <div className="additional">
          <div className="user-card">
            <div className="level center">
              {item.type}
            </div>
            <div className="item-img center" style ={ { backgroundImage: `url("${item.imageUrl}")` } }></div>
            <div className="points center">
              {item.location}
            </div>
          </div>
          <div className="more-info">
            <div className="food-name">{item.name}</div>
            <div className="coords">
              <span>Group Name</span>
              <span>Joined January 2019</span>
            </div>
            <div className="coords">
              <span>Position/Role</span>
              <span>City, Country</span>
            </div>
            <div className="stats d-flex flex-wrap">
              <div className="stat-child col-3">
                <div className="title">Moon</div>
                <i class="fad fa-space-station-moon"></i>
                <div className="value">2</div>
              </div>
              <div className="stat-child col-3">
                <div className="title">Cats</div>
                <i class="fad fa-cat-space"></i>
                <div className="value">27</div>
              </div>
              <div className="stat-child col-3">
                <div className="title">Pewpew</div>
                <i class="fad fa-starfighter"></i>
                <div className="value">123</div>
              </div>
              <div className="stat-child col-3">
                <div className="title">Saturn</div>
                <i class="fad fa-planet-ringed"></i>
                <div className="value">123</div>
              </div>
            </div>
          </div>
        </div>
        <div className="general">
          <div className="food-name">{item.name}</div>
          <p>{item.description}</p>
          <span className="more">Mouse over the card for more info</span>
        </div>
      </div>
    );
  }
}

export default FoodCard;
