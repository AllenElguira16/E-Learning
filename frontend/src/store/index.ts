/**
 * Contains Redux store
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import HelloWorldReducer from './reducers/HelloWorldReducer';
import StudentReducer from './reducers/StudentReducer';
 
const rootReducer = combineReducers<TRootReducers>({
  helloWorld: HelloWorldReducer,
  student: StudentReducer
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

/**
 * Store
 */
const store = createStore(rootReducer, composedEnhancer);
 
export default store;
