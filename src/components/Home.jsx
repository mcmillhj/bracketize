import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import withAuthorization from 'hoc/withAuthorization';

export default withAuthorization(() => (
  <Container>
    <Header as="h1">/</Header>
  </Container>
));
