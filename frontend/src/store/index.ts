/**
 * Contains Redux store
 */

import { configureStore } from '@reduxjs/toolkit';
import { Action, AnyAction, applyMiddleware, combineReducers } from 'redux';
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import StudentsReducer from './reducers/StudentsReducer';
import SubjectReducer from './reducers/SubjectsReducer';
import LessonReducer from './reducers/LessonReducer';
import PageReducer from './reducers/PageReducer';
import AuthReducer from './reducers/AuthReducer';

const thunkMiddleware: ThunkMiddleware<TRootReducers, AnyAction> = thunk;

const rootReducer = combineReducers<TRootReducers>({
  student: StudentsReducer,
  subject: SubjectReducer,
  lesson: LessonReducer,
  page: PageReducer,
  auth: AuthReducer
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

export type TThunkAction<ReturnType = Promise<void>, A = AnyAction> = ThunkAction<
  ReturnType,
  TRootReducers,
  unknown,
  Action<string> & A
>
