import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reducer from './Reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

// export default configureStore = () => {
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
// return {store, persistor};
// };
