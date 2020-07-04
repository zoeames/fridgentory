import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import './ItemForm.scss';
import categoriesData from '../../../helpers/data/categoriesData';
import unitsData from '../../../helpers/data/unitsData';
import primaryLocationsData from '../../../helpers/data/primaryLocationsData';
import secondaryLocationsData from '../../../helpers/data/secondaryLocationsData';

class ItemForm extends React.Component {
  state = {
    categories: [],
    primaryLocations: [],
    secondaryLocations: [],
    units: [],
    categoryDropdownOpen: false,
    primaryLocationDropdownOpen: false,
    secondaryLocationDropdownOpen: false,
    unitDropdownOpen: false,
    itemName: '',
    itemDescription: '',
    itemImageUrl: '',
    itemCategory: {},
    itemPrimaryLocation: {},
    itemSecondaryLocation: {},
    itemUnit: {},
    itemExpirationDate: '',
    itemPurchaseDate: '',
    itemQuantity: 0,
    itemNotes: '',
  }

  componentDidMount() {
    categoriesData.getAllCategories()
      .then((categories) => this.setState({ categories, itemCategory: categories[0] }))
      .catch((err) => console.error('unable to get categories: ', err));

    unitsData.getAllUnits()
      .then((units) => this.setState({ units, itemUnit: units[0] }))
      .catch((err) => console.error('unable to get units: ', err));

    primaryLocationsData.getAllPrimaryLocations()
      .then((primaryLocations) => this.setState({ primaryLocations, itemPrimaryLocation: primaryLocations[0] }))
      .catch((err) => console.error('unable to get primary locations: ', err));

    secondaryLocationsData.getAllSecondaryLocations()
      .then((secondaryLocations) => this.setState({ secondaryLocations, itemSecondaryLocation: secondaryLocations[0] }))
      .catch((err) => console.error('unable to get secondary locations: ', err));
  }

  saveItem = (e) => {
    e.preventDefault();
    const {
      itemName,
      itemDescription,
      itemImageUrl,
      itemCategory,
      itemPrimaryLocation,
      itemSecondaryLocation,
      itemExpirationDate,
      itemPurchaseDate,
      itemQuantity,
      itemUnit,
      itemNotes,
    } = this.state;
    const newItem = {
      name: itemName,
      description: itemDescription,
      imageUrl: itemImageUrl,
      categoryId: itemCategory.id,
      primaryLocationId: itemPrimaryLocation.id,
      secondaryLocationId: itemSecondaryLocation.id,
      expirationDate: itemExpirationDate,
      purchaseDate: itemPurchaseDate,
      quantity: itemQuantity,
      unitId: itemUnit.id,
      notes: itemNotes,
    };
    console.log('newItem', newItem);
  }

  toggleCategoryDropdown = () => this.setState({ categoryDropdownOpen: !this.state.categoryDropdownOpen });

  toggleUnitDropdown = () => this.setState({ unitDropdownOpen: !this.state.unitDropdownOpen });

  togglePrimaryLocationDropdown = () => this.setState({ primaryLocationDropdownOpen: !this.state.primaryLocationDropdownOpen });

  toggleSecondaryLocationDropdown = () => this.setState({ secondaryLocationDropdownOpen: !this.state.secondaryLocationDropdownOpen });

  itemNameChange = (e) => { this.setState({ itemName: e.target.value }); }

  itemDescriptionChange = (e) => { this.setState({ itemDescription: e.target.value }); }

  itemImageUrlChange = (e) => { this.setState({ itemImageUrl: e.target.value }); }

  itemQuantityChange = (e) => { this.setState({ itemQuantity: e.target.value }); }

  itemNotesChange = (e) => { this.setState({ itemNotes: e.target.value }); }

  itemCategoryChange= (e) => {
    const selectedCategory = this.state.categories.find((x) => x.id === e.target.value);
    this.setState({ itemCategory: selectedCategory });
  }

  itemPrimaryLocationChange= (e) => {
    const selectedPrimaryLocation = this.state.primaryLocations.find((x) => x.id === e.target.value);
    this.setState({ itemPrimaryLocation: selectedPrimaryLocation });
  }

  itemSecondaryLocationChange= (e) => {
    const selectedSecondaryLocation = this.state.secondaryLocations.find((x) => x.id === e.target.value);
    this.setState({ itemSecondaryLocation: selectedSecondaryLocation });
  }

  itemUnitChange= (e) => {
    const selectedUnit = this.state.units.find((x) => x.id === e.target.value);
    this.setState({ itemUnit: selectedUnit });
  }

  render() {
    const {
      itemName,
      itemDescription,
      itemImageUrl,
      itemCategory,
      itemPrimaryLocation,
      itemSecondaryLocation,
      itemExpirationDate,
      itemPurchaseDate,
      itemQuantity,
      itemUnit,
      itemNotes,
      categoryDropdownOpen,
      primaryLocationDropdownOpen,
      secondaryLocationDropdownOpen,
      unitDropdownOpen,
      categories,
      units,
      primaryLocations,
      secondaryLocations,
    } = this.state;

    return (
      <div className="ItemForm col-md-10 offset-md-1 text-center">
        <h1>Create a new item</h1>
        <form>
          <div className="form-group">
            <label htmlFor="itemName">Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              placeholder="Kale"
              value={itemName}
              onChange={this.itemNameChange}
            />
          </div>
          <div className="row">
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="itemQuantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="itemQuantity"
                  placeholder="Kale"
                  value={itemQuantity}
                  onChange={this.itemQuantityChange}
                />
              </div>
            </div>
            <div className="col-4">
              <label htmlFor="itemUnit">Quantity Unit</label>
              <Dropdown id="itemUnit" isOpen={unitDropdownOpen} toggle={this.toggleUnitDropdown}>
                <DropdownToggle caret>
                  {itemUnit.name}
                  </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select a Category</DropdownItem>
                  {units.map((unit) => <DropdownItem onClick={this.itemUnitChange} key={unit.id} value={unit.id}>{unit.name}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="row">
            <div className='col-4'>
              <label htmlFor="itemCategory">Category</label>
              <Dropdown id="itemCategory" isOpen={categoryDropdownOpen} toggle={this.toggleCategoryDropdown}>
                <DropdownToggle caret>
                  {itemCategory.name}
                  </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select a Category</DropdownItem>
                  {categories.map((category) => <DropdownItem onClick={this.itemCategoryChange} key={category.id} value={category.id}>{category.name}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='col-4'>
              <label htmlFor="itemPrimaryLocation">Primary Location</label>
              <Dropdown id="itemPrimaryLocation" isOpen={primaryLocationDropdownOpen} toggle={this.togglePrimaryLocationDropdown}>
                <DropdownToggle caret>
                  {itemPrimaryLocation.name}
                  </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select a Category</DropdownItem>
                  {primaryLocations.map((primary) => <DropdownItem onClick={this.itemPrimaryLocationChange} key={primary.id} value={primary.id}>{primary.name}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='col-4'>
              <label htmlFor="itemSecondaryLocation">Secondary Location</label>
              <Dropdown id="itemSecondaryLocation" isOpen={secondaryLocationDropdownOpen} toggle={this.toggleSecondaryLocationDropdown}>
                <DropdownToggle caret>
                  {itemSecondaryLocation.name}
                  </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select a Category</DropdownItem>
                  {secondaryLocations.map((secondary) => <DropdownItem onClick={this.itemSecondaryLocationChange} key={secondary.id} value={secondary.id}>{secondary.name}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
          <div className="form-group">
            <label htmlFor="itemImageUrl">Image Url</label>
            <input
              type="text"
              className="form-control"
              id="itemImageUrl"
              placeholder="Enter URL"
              value={itemImageUrl}
              onChange={this.itemImageUrlChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemDescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="itemDescription"
              placeholder="Kale is green."
              value={itemDescription}
              onChange={this.itemDescriptionChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemNotes">Notes</label>
            <input
              type="text"
              className="form-control"
              id="itemNotes"
              placeholder="Tastes SO GOOD"
              value={itemNotes}
              onChange={this.itemNotesChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.saveItem}>Save Item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
