import {Dimensions} from 'react-native';

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
  BASE_URL: 'https://eventhub-sever.onrender.com',
  locationAPI: `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=zCDIlA5ytRuEe3YS9YrJlzAGjTkxsy4S6mJtq7ZpkGU&mode=retrieveAddresses&prox=`,
};
