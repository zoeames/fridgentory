import React from 'react';
import moment from 'moment';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './AddItemForm.scss';
import categoriesData from '../../../helpers/data/categoriesData';
import unitsData from '../../../helpers/data/unitsData';
import primaryLocationsData from '../../../helpers/data/primaryLocationsData';
import secondaryLocationsData from '../../../helpers/data/secondaryLocationsData';
import itemsData from '../../../helpers/data/itemsData';

class AddItemForm extends React.Component {
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
    itemExpirationDate: new Date(),
    itemPurchaseDate: new Date(),
    itemQuantity: 0,
    itemNotes: '',
  }

  componentDidMount() {
    categoriesData.getAllCategories()
      .then((categories) => {
        const unknown = categories.find((x) => x.name === 'Unknown');
        this.setState({ categories, itemCategory: unknown });
      })
      .catch((err) => console.error('unable to get categories: ', err));

    unitsData.getAllUnits()
      .then((units) => {
        const unknown = units.find((x) => x.name === 'Unknown');
        this.setState({ units, itemUnit: unknown });
      })
      .catch((err) => console.error('unable to get units: ', err));

    primaryLocationsData.getAllPrimaryLocations()
      .then((primaryLocations) => {
        const unknown = primaryLocations.find((x) => x.name === 'Unknown');
        this.setState({ primaryLocations, itemPrimaryLocation: unknown });
      })
      .catch((err) => console.error('unable to get primary locations: ', err));

    secondaryLocationsData.getAllSecondaryLocations()
      .then((secondaryLocations) => {
        const unknown = secondaryLocations.find((x) => x.name === 'Unknown');
        this.setState({ secondaryLocations, itemSecondaryLocation: unknown });
      })
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
      expirationDate: moment(itemExpirationDate).toISOString(),
      purchaseDate: moment(itemPurchaseDate).toISOString(),
      quantity: itemQuantity,
      unitId: itemUnit.id,
      notes: itemNotes,
    };
    itemsData.saveItem(newItem)
      .then(() => this.props.history.push('/items'))
      .catch((err) => console.error('unable to save new item: ', err));
  }

  toggleCategoryDropdown = () => this.setState({ categoryDropdownOpen: !this.state.categoryDropdownOpen });

  toggleUnitDropdown = () => this.setState({ unitDropdownOpen: !this.state.unitDropdownOpen });

  togglePrimaryLocationDropdown = () => this.setState({ primaryLocationDropdownOpen: !this.state.primaryLocationDropdownOpen });

  toggleSecondaryLocationDropdown = () => this.setState({ secondaryLocationDropdownOpen: !this.state.secondaryLocationDropdownOpen });

  itemNameChange = (e) => { this.setState({ itemName: e.target.value }); }

  itemDescriptionChange = (e) => { this.setState({ itemDescription: e.target.value }); }

  itemImageUrlChange = (e) => { this.setState({ itemImageUrl: e.target.value }); }

  itemQuantityChange = (e) => { this.setState({ itemQuantity: e.target.value.replace(/^0+/, '') }); }

  itemNotesChange = (e) => { this.setState({ itemNotes: e.target.value }); }

  itemCategoryChange = (e) => {
    const selectedCategory = this.state.categories.find((x) => x.id === e.target.value);
    this.setState({ itemCategory: selectedCategory });
  }

  itemPrimaryLocationChange = (e) => {
    const selectedPrimaryLocation = this.state.primaryLocations.find((x) => x.id === e.target.value);
    this.setState({ itemPrimaryLocation: selectedPrimaryLocation });
  }

  itemSecondaryLocationChange = (e) => {
    const selectedSecondaryLocation = this.state.secondaryLocations.find((x) => x.id === e.target.value);
    this.setState({ itemSecondaryLocation: selectedSecondaryLocation });
  }

  itemUnitChange = (e) => {
    const selectedUnit = this.state.units.find((x) => x.id === e.target.value);
    this.setState({ itemUnit: selectedUnit });
  }

  itemPurchaseDateChange = (date) => {
    this.setState({ itemPurchaseDate: date });
  }

  itemPurchaseDateUnknownChange = (e) => {
    e.preventDefault();
    const { purchasedDatepicker } = this.refs;
    purchasedDatepicker.setOpen(false);
    this.itemPurchaseDateChange(new Date('1/1/1000'));
  }

  itemExpirationDateChange = (date) => {
    this.setState({ itemExpirationDate: date });
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
      <div className="AddItemForm col-md-10 offset-md-1 text-center">
        <h1>Create a new item</h1>
        <form>
          <div className="row">
            <div className="col-8">
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
            </div>
            <div className="col-2">
              <label htmlFor="itemPurchaseDate">Purchase Date</label>
              <DatePicker
                id="itemPurchaseDate"
                className="datepicker"
                selected={itemPurchaseDate}
                onChange={this.itemPurchaseDateChange}
                maxDate={moment().toDate()}
                ref="purchasedDatepicker"
              >
                <button className="btn btn-danger btn-sm" onClick={this.itemPurchaseDateUnknownChange}>Unknown</button>
              </DatePicker>
            </div>
            <div className="col-2">
              <label htmlFor="itemExpirationDate">Expiration Date</label>
              <DatePicker
                id="itemExpirationDate"
                className="datepicker"
                selected={itemExpirationDate}
                onChange={this.itemExpirationDateChange}
                minDate={moment().toDate()}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="itemQuantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="itemQuantity"
                  placeholder="4"
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

export default AddItemForm;
