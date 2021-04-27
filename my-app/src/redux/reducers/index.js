import { combineReducers } from 'redux';

import taskReducer from './taskReducer';

const coreReduce = combineReducers({ taskReducer });

export default coreReduce;
