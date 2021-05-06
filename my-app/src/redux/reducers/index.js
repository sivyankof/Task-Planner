import { combineReducers } from 'redux';

import taskReducer from './taskReducer';

const rootReduce = combineReducers({ taskReducer });

export default rootReduce;
