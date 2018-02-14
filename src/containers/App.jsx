// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from 'components/Nav';
import Routes from 'routes';
import withAuth from 'hoc/withAuth';
class App extends React.Component<{}, { authUser: boolean }> {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Nav />
          <Routes />
        </section>
      </BrowserRouter>
    );
  }
}

export default withAuth(App);
