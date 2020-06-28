import React from 'react';

import FoodCard from '../../shared/FoodCard/FoodCard';

import './Items.scss';

const item1 = {
  name: 'Kale1',
  description: 'Kale is a green, leafy, cruciferous vegetable that is rich in nutrients.',
  imageUrl: 'https://www.thespruceeats.com/thmb/CgxMLQpJa3b5hMrSZAHhhqS9FuQ=/1500x1000/filters:fill(auto,1)/GettyImages-1136884993-e98853997496413d87092050e4ad7409.jpg',
  category: {
    icon: 'fas fa-carrot',
    name: 'Vegetable',
  },
  primaryLocation: 'Fridge',
  secondaryLocation: '2nd Shelf',
  expirationDate: '9/20/2020',
  purchaseDate: '9/20/2019',
  quantity: '3 bunches',
  notes: 'nom1 nom2 nom3 nom4 nom5',
};

const item2 = {
  name: 'Kale2',
  description: 'Kale is a green, leafy, cruciferous vegetable that is rich in nutrients.',
  imageUrl: 'https://www.thespruceeats.com/thmb/CgxMLQpJa3b5hMrSZAHhhqS9FuQ=/1500x1000/filters:fill(auto,1)/GettyImages-1136884993-e98853997496413d87092050e4ad7409.jpg',
  category: {
    icon: 'fas fa-carrot',
    name: 'Vegetable',
  },
  primaryLocation: 'Fridge',
  secondaryLocation: '2nd Shelf',
  expirationDate: '9/20/2020',
  purchaseDate: '9/20/2019',
  quantity: '3 bunches',
  notes: 'nom nom nom',
};

const item3 = {
  name: 'Kale3',
  description: 'Kale is a green, leafy, cruciferous vegetable that is rich in nutrients.',
  imageUrl: 'https://www.thespruceeats.com/thmb/CgxMLQpJa3b5hMrSZAHhhqS9FuQ=/1500x1000/filters:fill(auto,1)/GettyImages-1136884993-e98853997496413d87092050e4ad7409.jpg',
  category: {
    icon: 'fas fa-carrot',
    name: 'Vegetable',
  },
  primaryLocation: 'Fridge',
  secondaryLocation: '2nd Shelf',
  expirationDate: '9/20/2020',
  purchaseDate: '9/20/2019',
  quantity: '3 bunches',
  notes: 'nom nom nom',
};

class Items extends React.Component {
  render() {
    return (
      <div className="Items col-md-10 offset-md-1 text-center">
        <h1>Items</h1>
        <div className="d-flex flex-wrap">
          <div className="col-md-4">
            <FoodCard item={item1}/>
          </div>
          <div className="col-md-4">
            <FoodCard item={item2}/>
          </div>
          <div className="col-md-4">
            <FoodCard item={item3}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Items;