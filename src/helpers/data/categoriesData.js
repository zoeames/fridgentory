import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/categories.json`)
    .then((response) => {
      const fbCategories = response.data;
      const categories = [];
      if (fbCategories) {
        Object.keys(fbCategories).forEach((fbId) => {
          fbCategories[fbId].id = fbId;
          categories.push(fbCategories[fbId]);
        });
      }
      const alphabetical = categories.sort((a, b) => a.name.localeCompare(b.name));
      resolve(alphabetical);
    })
    .catch((err) => reject(err));
});

export default {
  getAllCategories,
};
