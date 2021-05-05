import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Lists from './components/Lists';
// import Preview from './components/Preview';
// import Add from './components/Add';

/**
 *
 * @constructor
 */
const Lessons: FC = () => {

  return (
    <>
      <Switch>
        {/* <Route path="/admin/lessons/upload" component={Add} />
        <Route path="/admin/lessons/:lesson_id" component={Preview}/>
        <Route path="/admin/lessons" component={Lists} /> */}
      </Switch>
    </>
  );
};

export default Lessons;
