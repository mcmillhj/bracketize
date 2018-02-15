import React, { Component } from 'react';
import { Button, Form as SemanticForm, Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { auth } from 'storage';

const FormFieldsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
`;

const ChangePasswordInput = styled(Input)`
  &&& {
    min-width: 20rem;
    margin-bottom: 10px;
  }
`;

const ChangePasswordButton = styled(Button)`
  &&& {
    margin-bottom: 10px;
  }
`;

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <SemanticForm onSubmit={this.onSubmit}>
        <FormFieldsContainer>
          <ChangePasswordInput
            value={passwordOne}
            onChange={event => this.setState({ passwordOne: event.target.value })}
            type="password"
            placeholder="New Password"
          />
          <ChangePasswordInput
            value={passwordTwo}
            onChange={event => this.setState({ passwordTwo: event.target.value })}
            type="password"
            placeholder="Confirm New Password"
          />
          <ChangePasswordButton disabled={isInvalid} type="submit">
            Change Password
          </ChangePasswordButton>

          {error && <ErrorText>{error.message}</ErrorText>}
        </FormFieldsContainer>
      </SemanticForm>
    );
  }
}

export default ChangePassword;
