// third-party
import { combineReducers } from 'redux';

// project import
import user from './user';
import products from './product';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ user, products });

export default reducers;
