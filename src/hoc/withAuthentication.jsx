// @flow

import React from 'react';
import { connect } from 'react-redux';

import { firebase } from 'firebaze';
import { setAuthUser } from 'state/auth';

const withAuth = (Component: any) => {
  class WithAuthentication extends React.Component<{ onSetAuthUser: Function }, {}> {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged((authUser: Object) => {
        authUser ? onSetAuthUser(authUser) : onSetAuthUser(null);
      });
    }

    render() {
      return <Component />;
    }
  }

  return connect(null, dispatch => ({
    onSetAuthUser: authUser => dispatch(setAuthUser(authUser))
  }))(WithAuthentication);
};

export default withAuth;
