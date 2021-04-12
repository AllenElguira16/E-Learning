/**
 * Combine all reducers
 */
import { combineReducers } from 'redux';

import HelloWorldReducer from './HelloWorldReducer';

const rootReducers = combineReducers<TRootReducers>({
  helloWorld: HelloWorldReducer
});

export default rootReducers;
