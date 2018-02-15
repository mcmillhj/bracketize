// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from 'components/Nav';
import Routes from 'routes';
import withAuth from 'hoc/withAuth';

const App = () => (
  <BrowserRouter>
    <section>
      <Nav />
      <Routes />
    </section>
  </BrowserRouter>
);

export default withAuth(App);
