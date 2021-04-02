import React from 'react';
import { RouteProps } from "react-router"
// import Home from './Home';

/**
 * Entry point of page
 */
const Pages: RouteProps[] = [
  {
    path: '/',
    component: React.lazy(() => import('./Home'))
  },
  {
    path: '/admin',
    component: React.lazy(() => import('./Admin'))
  }
]

export default Pages
