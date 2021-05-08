/**
 * Contains Redux store
 */

import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, applyMiddleware, combineReducers } from 'redux';
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import StudentReducer from './reducers/StudentReducer';
import SubjectReducer from './reducers/SubjectsReducer';
import LessonReducer from './reducers/LessonReducer';
import PageReducer from './reducers/PageReducer';

const thunkMiddleware: ThunkMiddleware<TRootReducers, AnyAction> = thunk;

const rootReducer = combineReducers<TRootReducers>({
  student: StudentReducer,
  subject: SubjectReducer,
  lesson: LessonReducer,
  page: PageReducer
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

/**
 * Store
 */
// const store = createStore(rootReducer, undefined, composedEnhancer);
const store = configureStore({
  reducer: rootReducer,
  enhancers: [composedEnhancer]
});

export default store;

export type TDispatch = ThunkDispatch<TRootReducers, any, AnyAction>;

export type TThunkAction<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  TRootReducers,
  unknown,
  AnyAction
>
