import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Brackets from 'components/Brackets';
import CreateBracket from 'components/CreateBracket';
import Home from 'components/Home';

export default () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/brackets" component={Brackets} />
      <Route path="/create-bracket" component={CreateBracket} />
      <Route path="/login" component={Home} />
    </Switch>
  </main>
);
