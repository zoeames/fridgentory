import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllItems = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json`)
    .then((response) => {
      const fbItems = response.data;
      const items = [];
      if (fbItems) {
        Object.keys(fbItems).forEach((fbId) => {
          fbItems[fbId].id = fbId;
          items.push(fbItems[fbId]);
        });
      }
      const alphabetical = items.sort((a, b) => a.name.localeCompare(b.name));
      resolve(alphabetical);
    })
    .catch((err) => reject(err));
});

export default {
  getAllItems,
};
