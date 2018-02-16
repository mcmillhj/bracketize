// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import ChangePasswordForm from 'components/ChangePassword';
import withAuthorization from 'hoc/withAuthorization';

const AccountContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const AccountHeader = styled(Header)`
  &&& {
    margin-bottom: ${10 / 16}rem;
  }
`;

const AccountPage = ({ authUser }: { authUser: Object | null }) => (
  <AccountContainer>
    <AccountHeader>Logged in as {authUser && authUser.email}</AccountHeader>
    <AccountHeader sub>Change your Password?</AccountHeader>
    <ChangePasswordForm />
  </AccountContainer>
);

export default withAuthorization(
  connect(state => ({
    authUser: state.auth.authUser
  }))(AccountPage)
);
