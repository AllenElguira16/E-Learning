import React, { FC, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
// import { HelloWorld } from './components';
import pages from './pages';
// import { Button } from 'reactstrap';
// import { hideHelloWorld, showHelloWorld } from './store/actions/HelloWorldAction';

const App: FC = () => {
  return (
    <Container>
      {/* <Button>GG</Button> */}
      <Suspense fallback={<>Loading...</>}>
        <BrowserRouter>
          <Switch>
            {pages.map((page, key) => <Route key={key} {...page} />)}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Container>
  );
}

export default App;
