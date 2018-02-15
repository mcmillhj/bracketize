import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form as SemanticForm, Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { ForgotPasswordLink } from 'components/ForgotPassword';
import { SignUpLink } from 'components/SignUp';
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

const SignInInput = styled(Input)`
  &&& {
    min-width: 20rem;
    margin-bottom: 10px;
  }
`;

const SignInButton = styled(Button)`
  &&& {
    margin-bottom: 10px;
  }
`;

const SignInPage = ({ history }) => (
  <FormFieldsContainer>
    <SignInForm history={history} />
    <ForgotPasswordLink />
    <br />
    <SignUpLink />
  </FormFieldsContainer>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <SemanticForm onSubmit={this.onSubmit}>
        <FormFieldsContainer>
          <SignInInput
            value={email}
            onChange={event => this.setState({ email: event.target.value })}
            type="text"
            placeholder="Email Address"
          />
          <SignInInput
            value={password}
            onChange={event => this.setState({ password: event.target.value })}
            type="password"
            placeholder="Password"
          />
          <SignInButton disabled={isInvalid} type="submit">
            Sign In
          </SignInButton>

          {error && <ErrorText>{error.message}</ErrorText>}
        </FormFieldsContainer>
      </SemanticForm>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
