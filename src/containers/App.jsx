// @flow

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from 'components/Nav';
import Routes from 'routes';
import { firebase } from 'storage';

export default class App extends React.Component<{}, { authUser: boolean }> {
  state = {
    authUser: null
  };

  constructor(props: Object) {
    super(props);
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: Object) => {
      authUser ? this.setState(() => ({ authUser })) : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <BrowserRouter>
        <section>
          <Nav authUser={!!this.state.authUser} />
          <Routes />
        </section>
      </BrowserRouter>
    );
  }
}
