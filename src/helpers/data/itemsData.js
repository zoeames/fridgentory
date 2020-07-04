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

const saveItem = (newItem) => axios.post(`${baseUrl}/items.json`, newItem);

const deleteItem = (itemId) => axios.delete(`${baseUrl}/items/${itemId}.json`);

const getSingle = (itemId) => axios.get(`${baseUrl}/items/${itemId}.json`);

const updateItem = (itemId, newItem) => axios.put(`${baseUrl}/items/${itemId}.json`, newItem);

export default {
  getAllItems,
  saveItem,
  deleteItem,
  getSingle,
  updateItem,
};
