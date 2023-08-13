// third-party
import { combineReducers } from 'redux';

// project import
import user from './user';
import product from './product';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ user, product });

export default reducers;
