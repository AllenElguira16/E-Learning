import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Lists from './Lists';
import Preview from './Preview';

/**
 *
 * @constructor
 */
const Lessons: FC = () => {

  return (
    <>
      <Switch>
        <Route path="/admin/lessons/:lesson_id" component={Preview}/>
        <Route path="/admin/lessons">
          <Lists/>
        </Route>
      </Switch>
    </>
  );
};

export default Lessons;
