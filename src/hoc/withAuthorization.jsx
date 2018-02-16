import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import { firebase } from 'storage';

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser) {
          this.props.history.push('/signin');
        }
      });
    }

    render() {
      return this.props.authUser ? <Component /> : <Header as={'h1'}>You must be signed in to see this route</Header>;
    }
  }

  return withRouter(
    connect(state => ({
      authUser: state.auth.authUser
    }))(WithAuthorization)
  );
};

export default withAuthorization;
