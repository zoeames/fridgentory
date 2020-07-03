import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllSecondaryLocations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/secondaryLocations.json`)
    .then((response) => {
      const fbSecondaryLocations = response.data;
      const secondaryLocations = [];
      if (fbSecondaryLocations) {
        Object.keys(fbSecondaryLocations).forEach((fbId) => {
          fbSecondaryLocations[fbId].id = fbId;
          secondaryLocations.push(fbSecondaryLocations[fbId]);
        });
      }
      const alphabetical = secondaryLocations.sort((a, b) => a.name.localeCompare(b.name));
      resolve(alphabetical);
    })
    .catch((err) => reject(err));
});

export default {
  getAllSecondaryLocations,
};
