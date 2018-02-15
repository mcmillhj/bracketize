// @flow

import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from 'storage';

const withAuth = (Component: any) => {
  class WithAuthentication extends React.Component<{}, { authUser: Object | null }> {
    state = {
      authUser: null
    };

    getChildContext() {
      return {
        authUser: this.state.authUser
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged((authUser: Object) => {
        authUser ? this.setState(() => ({ authUser })) : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      return <Component />;
    }
  }

  WithAuthentication.childContextTypes = {
    authUser: PropTypes.object
  };

  return WithAuthentication;
};

export default withAuth;
