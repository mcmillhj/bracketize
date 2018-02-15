// @flow

import React from 'react';
import PropTypes from 'prop-types';

import { ForgotPasswordForm } from 'components/ForgotPassword';
import ChangePasswordForm from 'components/ChangePassword';

const AccountPage = (props: Object, { authUser }: { authUser: Object | null }) => (
  <div>
    <h1>Account: {authUser && authUser.email}</h1>
    <ForgotPasswordForm />
    <br />
    <ChangePasswordForm />
  </div>
);

AccountPage.contextTypes = {
  authUser: PropTypes.object
};

export default AccountPage;
