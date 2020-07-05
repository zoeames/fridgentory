import itemsData from './itemsData';
import categoriesData from './categoriesData';
import unitsData from './unitsData';
import primaryLocationsData from './primaryLocationsData';
import secondaryLocationsData from './secondaryLocationsData';

const getCompleteItemList = () => new Promise((resolve, reject) => {
  itemsData.getAllItems().then((items) => {
    categoriesData.getAllCategories().then((categories) => {
      unitsData.getAllUnits().then((units) => {
        primaryLocationsData.getAllPrimaryLocations().then((primaryLocations) => {
          secondaryLocationsData.getAllSecondaryLocations().then((secondaryLocations) => {
            const finalItems = [];
            items.forEach((item) => {
              const newItem = { ...item };
              const currentCategory = categories.find((x) => x.id === item.categoryId);
              const currentUnit = units.find((x) => x.id === item.unitId);
              const currentPrimaryLocation = primaryLocations.find((x) => x.id === item.primaryLocationId);
              const currentSecondaryLocation = secondaryLocations.find((x) => x.id === item.secondaryLocationId);
              newItem.category = currentCategory;
              newItem.unit = currentUnit.name;
              newItem.primaryLocation = currentPrimaryLocation.name;
              newItem.secondaryLocation = currentSecondaryLocation.name;
              finalItems.push(newItem);
            });
            resolve(finalItems);
          });
        });
      });
    });
  })
    .catch((err) => reject(err));
});

const getAllCategoriesWithTotals = () => new Promise((resolve, reject) => {
  categoriesData.getAllCategories().then((categories) => {
    itemsData.getAllItems().then((items) => {
      const finalCategories = [];
      categories.forEach((category) => {
        const newCategory = { ...category };
        const categoryItems = items.filter((x) => x.categoryId === category.id);
        newCategory.totalItems = categoryItems === undefined ? 0 : categoryItems.length;
        finalCategories.push(newCategory);
      });
      resolve(finalCategories);
    });
  })
    .catch((err) => reject(err));
});

export default {
  getCompleteItemList,
  getAllCategoriesWithTotals,
};
