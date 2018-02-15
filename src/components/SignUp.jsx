import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

const SignUpInput = styled(Input)`
  &&& {
    min-width: 20rem;
    margin-bottom: 10px;
  }
`;

const SignUpButton = styled(Button)`
  &&& {
    margin-bottom: 10px;
  }
`;

const SignUpPage = ({ history }) => (
  <FormFieldsContainer>
    <SignUpForm history={history} />
    <br />
    <SignInLink />
  </FormFieldsContainer>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, passwordOne } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
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
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
    return (
      <SemanticForm onSubmit={this.onSubmit}>
        <FormFieldsContainer>
          <SignUpInput
            style={{ marginBottom: 10 }}
            value={username}
            onChange={event => this.setState({ username: event.target.value })}
            type="text"
            placeholder="Full Name"
          />
          <SignUpInput
            value={email}
            onChange={event => this.setState({ email: event.target.value })}
            type="email"
            placeholder="Email Address"
          />
          <SignUpInput
            value={passwordOne}
            onChange={event => this.setState({ passwordOne: event.target.value })}
            type="password"
            placeholder="Password"
          />
          <SignUpInput
            value={passwordTwo}
            onChange={event => this.setState({ passwordTwo: event.target.value })}
            type="password"
            placeholder="Confirm Password"
          />
          <SignUpButton disabled={isInvalid} type="submit">
            Sign Up
          </SignUpButton>

          {error && <ErrorText>{error.message}</ErrorText>}
        </FormFieldsContainer>
      </SemanticForm>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={'/signup'}>Sign Up</Link>
  </p>
);

const SignInLink = () => (
  <p>
    Already have an account? <Link to={'/signin'}>Sign In</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
