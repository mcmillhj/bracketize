import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from 'components/Nav';
import Routes from 'routes';
import withAuthentication from 'hoc/withAuthentication';

const App = () => (
  <BrowserRouter>
    <section>
      <Nav />
      <Routes />
    </section>
  </BrowserRouter>
);

export default withAuthentication(App);
