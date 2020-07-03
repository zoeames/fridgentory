// const item1 = {
//   name: 'Kale1',
//   description: 'Kale is a green, leafy, cruciferous vegetable that is rich in nutrients.',
//   imageUrl: 'https://www.thespruceeats.com/thmb/CgxMLQpJa3b5hMrSZAHhhqS9FuQ=/1500x1000/filters:fill(auto,1)/GettyImages-1136884993-e98853997496413d87092050e4ad7409.jpg',
//   category: {
//     icon: 'fas fa-carrot',
//     name: 'Vegetable',
//   },
//   primaryLocation: 'Fridge',
//   secondaryLocation: '2nd Shelf',
//   expirationDate: '9/20/2020',
//   purchaseDate: '9/20/2019',
//   quantity: '3 bunches',
//   notes: 'nom1 nom2 nom3 nom4 nom5',
// };

import itemsData from './itemsData';
import categoriesData from './categoriesData';
import unitsData from './unitsData';

const getCompleteItemList = () => new Promise((resolve, reject) => {
  itemsData.getAllItems().then((items) => {
    categoriesData.getAllCategories().then((categories) => {
      unitsData.getAllUnits().then((units) => {
        const finalItems = [];
        items.forEach((item) => {
          const newItem = { ...item };
          const currentCategory = categories.find((x) => x.id === item.categoryId);
          const currentUnit = units.find((x) => x.id === item.unitId);
          newItem.category = currentCategory;
          newItem.unit = currentUnit;
          finalItems.push(newItem);
        });
        resolve(finalItems);
      });
    });
  })
    .catch((err) => reject(err));
});

export default { getCompleteItemList };
