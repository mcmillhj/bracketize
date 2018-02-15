// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import ChangePasswordForm from 'components/ChangePassword';

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

const AccountPage = (props: Object, { authUser }: { authUser: Object | null }) => (
  <AccountContainer>
    <AccountHeader>Logged in as {authUser && authUser.email}</AccountHeader>
    <AccountHeader sub>Change your Password?</AccountHeader>
    <ChangePasswordForm />
  </AccountContainer>
);

AccountPage.contextTypes = {
  authUser: PropTypes.object
};

export default AccountPage;
