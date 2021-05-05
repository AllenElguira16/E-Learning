/**
 * Contains Redux store
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import StudentReducer from './reducers/StudentReducer';
import SubjectReducer from './reducers/SubjectsReducer';
import LessonReducer from './reducers/LessonReducer';

const rootReducer = combineReducers<TRootReducers>({
  student: StudentReducer,
  subject: SubjectReducer,
  lesson: LessonReducer
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

/**
 * Store
 */
const store = createStore(rootReducer, composedEnhancer);

export default store;
