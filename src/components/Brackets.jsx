// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Dropdown, Grid, Header, Image, List } from 'semantic-ui-react';
import styled from 'styled-components';

import { changeComplete, changeRound, deleteBracket } from 'state/bracket';
import { getBrackets, ungetBrackets } from 'state/brackets';

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

const BracketCardContent = styled(Card.Content)`
  &&& {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
  changeComplete: Function,
  changeRound: Function,
  deleteBracket: Function,
  getBrackets: Function,
  ungetBrackets: Function
}> {
  componentWillReceiveProps(nextProps) {
    nextProps.authUser && !this.props.authUser && this.props.getBrackets(nextProps.authUser);
  }

  componentDidMount() {
    const { authUser } = this.props;

    authUser && this.props.getBrackets(authUser);
  }

  componentWillUnmount() {
    const { authUser } = this.props;

    authUser && this.props.ungetBrackets(authUser);
  }

  deleteBracket = bracketId => {
    const { authUser } = this.props;

    this.props.deleteBracket(authUser, bracketId);
  };

  cloneBracket = bracketId => {
    console.log(bracketId);
  };

  render() {
    const { brackets } = this.props;

    return (
      <Container>
        <Header as="h1">My Brackets</Header>
        <Grid columns={2} container doubling stretched stackable>
          {brackets &&
            brackets.map(b => (
              <Grid.Column key={b.id}>
                <BracketCard>
                  <Card.Content>
                    <BracketCardImage size="tiny" src={b.seeds[0].image} />
                    <Card.Header as="h4">{b.name}</Card.Header>
                    <Card.Meta>{new Date(b.created).toUTCString()}</Card.Meta>
                    <Card.Description>
                      <List>
                        <List.Item>{`Number of seeds: ${b.size}`}</List.Item>
                        <List.Item>{`Current Round: ${b.round}`}</List.Item>
                        <List.Item>{`Complete: ${b.complete}`}</List.Item>
                        <List.Item>
                          <label>Change Round: </label>{' '}
                          <Dropdown
                            disabled={b.complete}
                            defaultValue={b.round}
                            placeholder="Change Round"
                            onChange={(e, { value }) => this.props.changeRound(b.id, b.user_id, value)}
                            options={Array.from(new Array(Math.floor(Math.log2(b.seeds.length))), (_, i) => i + 1).map(
                              e => ({ text: e, value: e })
                            )}
                          />
                        </List.Item>
                      </List>
                    </Card.Description>
                  </Card.Content>
                  <BracketCardContent extra>
                    <BracketButton onClick={() => this.cloneBracket(b.id)} disabled>
                      Clone
                    </BracketButton>
                    <BracketButton onClick={() => this.deleteBracket(b.id)}>Delete</BracketButton>
                    <BracketButton as={Link} to={`/brackets/${b.id}`}>
                      View
                    </BracketButton>
                    <BracketButton onClick={() => this.props.changeComplete(b.id, b.user_id)} disabled={b.complete}>
                      Complete
                    </BracketButton>
                  </BracketCardContent>
                </BracketCard>
              </Grid.Column>
            ))}
        </Grid>
      </Container>
    );
  }
}

export default connect(
  state => ({
    authUser: state.auth.authUser,
    brackets: state.brackets
  }),
  { changeComplete, changeRound, deleteBracket, getBrackets, ungetBrackets }
)(Brackets);
