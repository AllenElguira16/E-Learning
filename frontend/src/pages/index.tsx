import React from 'react';
import { RouteProps } from 'react-router';

/**
 * Entry point of page
 */
const Pages: RouteProps[] = [
  {
    exact: true,
    path: '/',
    component: React.lazy(() => import('./Home'))
  },
  {
    path: '/admin',
    component: React.lazy(() => import('./Admin'))
  }
];

export default Pages;
