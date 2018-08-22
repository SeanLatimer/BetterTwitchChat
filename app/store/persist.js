import localForage from 'localforage';

localForage.config({
  name: 'Better Twitch Chat',
  storeName: 'bettertwitchchat',
});

const persistConfig = {
  key: 'btc',
  storage: localForage,
  whitelist: ['settings'],
};

export default persistConfig;
