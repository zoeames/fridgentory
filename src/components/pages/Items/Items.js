import React from 'react';
import { Link } from 'react-router-dom';

import FoodCard from '../../shared/FoodCard/FoodCard';

import smashData from '../../../helpers/data/smashData';

import './Items.scss';
import itemsData from '../../../helpers/data/itemsData';

class Items extends React.Component {
  state = {
    items: [],
    selectedItems: [],
  }

  getCompleteItemList = () => {
    smashData.getCompleteItemList()
      .then((items) => this.setState({ items, selectedItems: items }))
      .catch((err) => console.error('unable to get items', err));
  }

  componentDidMount() {
    this.getCompleteItemList();
  }

  deleteItem = (itemId) => {
    itemsData.deleteItem(itemId)
      .then(() => this.getCompleteItemList())
      .catch((err) => console.error('unable to delete item:', err));
  }

  search = (e) => {
    const selectedItems = this.state.items.filter((x) => x.name.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({ selectedItems });
  }

  render() {
    const { selectedItems } = this.state;
    const buildItemCards = selectedItems.map((item) => <FoodCard key={item.id} item={item} deleteItem={this.deleteItem}/>);

    return (
      <div className="Items col-12 text-center">
        <h1>Items</h1>
        <Link className="btn btn-dark" to='/items/new'><i className="fas fa-plus"></i></Link>
        <br />
        <input className="search" type="search" placeholder="Search" onChange={this.search} />
        <div className="d-flex flex-wrap">
          {buildItemCards}
        </div>
      </div>
    );
  }
}

export default Items;
