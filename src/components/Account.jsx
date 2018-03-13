// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Header, Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import ChangePasswordForm from 'components/ChangePassword';
import { auth, db } from 'firebaze';
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

const ErrorText = styled.span`
  display: inline-block;
  font-size: ${12 / 16}rem;
  color: red;
  padding: ${4 / 16}rem;
`;

class DeleteAccountModal extends React.Component<
  { redirectToHome: Function, authUser: Object },
  { modalOpen: boolean, error: Object | null }
> {
  state = { modalOpen: false, error: null };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  deleteAccount = () => {
    const { authUser, redirectToHome } = this.props;

    db
      .doDeleteUser(authUser.uid)
      .then(() => {
        auth
          .doDeleteUserAuth()
          .then(() => redirectToHome())
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        trigger={
          <Button negative onClick={this.handleOpen}>
            Delete Account
          </Button>
        }
        size="small">
        <Header icon="user delete" content="Delete Your Account" />
        <Modal.Content>
          <p>Are you sure you want to delete your account? This action is not reversible</p>

          {error && <ErrorText>{error.message}</ErrorText>}
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={this.handleClose}>
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              this.deleteAccount();
              this.handleClose();
            }}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const AccountPage = ({ authUser, history }: { authUser: Object, history: Object }) => (
  <AccountContainer>
    <AccountHeader>Logged in as {authUser && authUser.email}</AccountHeader>
    <AccountHeader sub>Change your Password?</AccountHeader>
    <ChangePasswordForm />
    <AccountHeader>Delete your account?</AccountHeader>
    <DeleteAccountModal authUser={authUser} redirectToHome={() => history.push('/')} />
  </AccountContainer>
);

export default withRouter(
  withAuthorization(
    connect(state => ({
      authUser: state.auth.authUser
    }))(AccountPage)
  )
);
