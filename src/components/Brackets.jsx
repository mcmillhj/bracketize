// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Header, Image, List } from 'semantic-ui-react';
import styled from 'styled-components';

import { deleteBracket, getBrackets } from 'state/brackets';

const BracketButton = styled(Button)`
  &&& {
    text-align: left;
    margin-bottom: ${5 / 16}rem;
  }
`;

const BracketCard = styled(Card)`
  &&& {
    width: ${500 / 16}rem;
  }
`;

const BracketCardImage = styled(Image)`
  &&& {
    position: absolute;
    top: ${10 / 16}rem;
    right: ${10 / 16}rem;
  }
`;

class Brackets extends React.Component<{
  authUser: Object | null,
  brackets: Array<Object>,
  deleteBracket: Function,
  getBrackets: Function
}> {
  componentWillReceiveProps(nextProps) {
    nextProps.authUser && !this.props.authUser && this.props.getBrackets(nextProps.authUser);
  }

  componentDidMount() {
    const { authUser } = this.props;

    authUser && this.props.getBrackets(authUser);
  }

  deleteBracket = bracketId => {
    const { authUser } = this.props;

    this.props.deleteBracket(authUser, bracketId);
  };

  cloneBracket = bracketId => {};

  render() {
    const { brackets } = this.props;

    return (
      <Container>
        <Header as="h1">My Brackets</Header>
        {brackets &&
          brackets.map(b => (
            <BracketCard key={b.id}>
              <Card.Content>
                <BracketCardImage size="tiny" src={b.seeds[0].image} />
                <Card.Header as="h4">{b.name}</Card.Header>
                <Card.Meta>{new Date(b.created).toUTCString()}</Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item>{`Number of seeds: ${b.size}`}</List.Item>
                    <List.Item>{`Round: ${b.round}`}</List.Item>
                    <List.Item>{`Complete: ${b.complete}`}</List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <BracketButton onClick={() => this.cloneBracket(b.id)} disabled>
                  Clone Bracket
                </BracketButton>
                <BracketButton onClick={() => this.deleteBracket(b.id)} disabled>
                  Delete Bracket
                </BracketButton>
                <BracketButton as={Link} key={b.id} to={`/brackets/${b.id}`}>
                  View Bracket
                </BracketButton>
              </Card.Content>
            </BracketCard>
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
  { deleteBracket, getBrackets }
)(Brackets);
