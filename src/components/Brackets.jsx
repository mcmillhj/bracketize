// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Header, List } from 'semantic-ui-react';
import styled from 'styled-components';

import { getBrackets } from 'state/brackets';

const BracketButton = styled(Button)`
  &&& {
    text-align: left;
    margin-bottom: ${5 / 16}rem;
  }
`;

class Brackets extends React.Component<{ authUser: Object | null, brackets: Array<Object>, getBrackets: Function }> {
  componentWillReceiveProps(nextProps) {
    nextProps.authUser && !this.props.authUser && this.props.getBrackets(nextProps.authUser);
  }

  componentDidMount() {
    const { authUser } = this.props;

    authUser && this.props.getBrackets(authUser);
  }

  render() {
    const { brackets } = this.props;

    return (
      <Container>
        <Header as="h1">My Brackets</Header>
        {brackets &&
          brackets.map(b => (
            <BracketButton as={Link} key={b.id} to={`/brackets/${b.id}`}>
              <Header as="h4">{b.name}</Header>
              <List>
                <List.Item>{`Created Date: ${new Date(b.created).toUTCString()}`}</List.Item>
                <List.Item>{`Number of seeds: ${b.size}`}</List.Item>
                <List.Item>{`Complete: ${b.complete}`}</List.Item>
              </List>
              <br />
            </BracketButton>
          ))}
      </Container>
    );
  }
}

export default connect(
  state => ({
    authUser: state.auth.authUser,
    brackets: state.brackets
  }),
  { getBrackets }
)(Brackets);
