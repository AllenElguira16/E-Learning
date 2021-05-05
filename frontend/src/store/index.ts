/**
 * Contains Redux store
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import HelloWorldReducer from './reducers/HelloWorldReducer';
import StudentReducer from './reducers/StudentReducer';
// import LessonReducer from './reducers/LessonReducer';
import SubjectReducer from './reducers/SubjectsReducer';

const rootReducer = combineReducers<TRootReducers>({
  helloWorld: HelloWorldReducer,
  student: StudentReducer,
  subject: SubjectReducer,
  // lesson: LessonReducer
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

/**
 * Store
 */
const store = createStore(rootReducer, composedEnhancer);

export default store;
