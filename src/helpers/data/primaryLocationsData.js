import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllPrimaryLocations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/primaryLocations.json`)
    .then((response) => {
      const fbPrimaryLocations = response.data;
      const primaryLocations = [];
      if (fbPrimaryLocations) {
        Object.keys(fbPrimaryLocations).forEach((fbId) => {
          fbPrimaryLocations[fbId].id = fbId;
          primaryLocations.push(fbPrimaryLocations[fbId]);
        });
      }
      const alphabetical = primaryLocations.sort((a, b) => a.name.localeCompare(b.name));
      resolve(alphabetical);
    })
    .catch((err) => reject(err));
});

export default {
  getAllPrimaryLocations,
};
