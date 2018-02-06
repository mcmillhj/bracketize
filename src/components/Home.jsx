import React from 'react';
import styled from 'styled-components';

import { Button, Container, Form, Input } from 'semantic-ui-react';

const PageContainer = styled(Container)`
  /* &&& {
    margin: 0 auto;
  } */
`;

const LoginForm = styled(Form)`
  &&& {
    max-width: 35rem;
    margin: 0 auto;
  }
`;

export default () => (
  <PageContainer>
    <LoginForm>
      <Form.Field>
        <label>Username</label>
        <Input placeholder="Username" />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Input placeholder="Password" type="password" />
      </Form.Field>
      <Button type="submit">Login</Button>
    </LoginForm>
  </PageContainer>
);
