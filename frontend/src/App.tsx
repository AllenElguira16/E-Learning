import React, { FC, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import pages from './pages';

const App: FC = () => {
  return (
    <Container>
      <Suspense fallback={<>Loading...</>}>
        <BrowserRouter>
          <Switch>
            {pages.map((page, key) => <Route key={key} exact {...page} />)}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Container>
  );
}

export default App;
