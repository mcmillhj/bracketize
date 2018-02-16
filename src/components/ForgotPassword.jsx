import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form as SemanticForm, Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { auth } from 'firebaze';

const FormFieldsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ErrorText = styled.span`
  font-size: ${12 / 16}rem;
  color: red;
`;

const ForgotPasswordInput = styled(Input)`
  &&& {
    min-width: 20rem;
    margin-bottom: ${10 / 16}rem;
  }
`;

const ForgotPasswordButton = styled(Button)`
  &&& {
    margin-bottom: ${10 / 16}rem;
  }
`;

const ForgotPasswordPage = () => (
  <div>
    <h1>Forgot Password</h1>
    <ForgotPasswordForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null
};

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <SemanticForm onSubmit={this.onSubmit}>
        <FormFieldsContainer>
          <ForgotPasswordInput
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
            type="text"
            placeholder="Email Address"
          />

          <ForgotPasswordButton disabled={isInvalid} type="submit">
            Send Reset Link
          </ForgotPasswordButton>

          {error && <ErrorText>{error.message}</ErrorText>}
        </FormFieldsContainer>
      </SemanticForm>
    );
  }
}

const ForgotPasswordLink = () => (
  <p>
    <Link to="/forgot-password">Forgot Password?</Link>
  </p>
);

export default ForgotPasswordPage;

export { ForgotPasswordForm, ForgotPasswordLink };
