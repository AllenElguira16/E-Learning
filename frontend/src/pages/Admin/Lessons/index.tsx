import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Lists from './Lists';
import Preview from './Preview';
import Add from './Add';

/**
 *
 * @constructor
 */
const Lessons: FC = () => {

  return (
    <>
      <Switch>
        <Route path="/admin/lessons/upload" component={Add} />
        <Route path="/admin/lessons/:lesson_id" component={Preview}/>
        <Route path="/admin/lessons" component={Lists} />
      </Switch>
    </>
  );
};

export default Lessons;
