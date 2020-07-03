import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllUnits = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/units.json`)
    .then((response) => {
      const fbUnits = response.data;
      const units = [];
      if (fbUnits) {
        Object.keys(fbUnits).forEach((fbId) => {
          fbUnits[fbId].id = fbId;
          units.push(fbUnits[fbId]);
        });
      }
      const alphabetical = units.sort((a, b) => a.name.localeCompare(b.name));
      resolve(alphabetical);
    })
    .catch((err) => reject(err));
});

export default {
  getAllUnits,
};
