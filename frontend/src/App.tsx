import React, { FC, Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Pages from '~pages';


const App: FC = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <Switch>
          <Pages/>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
