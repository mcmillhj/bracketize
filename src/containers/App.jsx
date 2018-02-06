import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from 'components/Nav';
import Routes from 'routes';

class App extends Component {
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

export default App;
