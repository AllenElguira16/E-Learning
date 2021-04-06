import React, { FC, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import pages from './pages';

const App: FC = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <Switch>
          {pages.map((page, key) => <Route key={key} {...page} />)}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
