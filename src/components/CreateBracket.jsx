import React from 'react';

import { Container, Header, Icon, Step } from 'semantic-ui-react';

export default () => (
  <Container>
    <Header as="h1">Create a new Bracket</Header>
    <Step.Group>
      <Step active>
        <Icon name="settings" />
        <Step.Content>
          <Step.Title>Configure</Step.Title>
          <Step.Description>Choose your bracket options</Step.Description>
        </Step.Content>
      </Step>

      <Step disabled>
        <Icon name="leaf" />
        <Step.Content>
          <Step.Title>Seeds</Step.Title>
          <Step.Description>Choose your bracket seeds</Step.Description>
        </Step.Content>
      </Step>

      <Step disabled>
        <Icon name="share" />
        <Step.Content>
          <Step.Title>Complete Bracket</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  </Container>
);
