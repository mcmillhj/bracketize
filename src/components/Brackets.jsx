// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Dropdown, Grid, Header, Icon, Image, List, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import { changeComplete, changeRound, deleteBracket } from 'state/bracket';
import { getBrackets, ungetBrackets } from 'state/brackets';
import withAuthorization from 'hoc/withAuthorization';

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

const ErrorText = styled.span`
  font-size: ${12 / 16}rem;
  color: red;
`;

class DeleteBracketModal extends React.Component<
  { authUser: Object | null, bracket: Object, deleteBracket: Function },
  { modalOpen: boolean, error: Object | null }
> {
  state = { modalOpen: false, error: null };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  deleteBracket = bracketId => {
    const { authUser } = this.props;

    this.props.deleteBracket(authUser, bracketId);
  };

  render() {
    const { error } = this.state;
    const { bracket: { name, id } } = this.props;

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        trigger={
          <BracketButton negative onClick={this.handleOpen}>
            Delete
          </BracketButton>
        }
        size="small">
        <Header icon="user delete" content={`Delete ${name}`} />
        <Modal.Content>
          <p>{`Are you sure you want to delete bracket "${name}"? This action is not reversible`}</p>

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
              this.deleteBracket(id);
              this.handleClose();
            }}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

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

  completeBracket = ({ id, user_id }) => this.props.changeComplete(id, user_id);

  cloneBracket = bracketId => {
    console.log(bracketId);
  };

  render() {
    const { authUser, brackets } = this.props;

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
                    <BracketButton as={Link} to={`/brackets/${b.id}`}>
                      View
                    </BracketButton>
                    <BracketButton positive onClick={() => this.completeBracket(b)} disabled={b.complete}>
                      Complete
                    </BracketButton>
                    <DeleteBracketModal authUser={authUser} bracket={b} deleteBracket={this.props.deleteBracket} />
                  </BracketCardContent>
                </BracketCard>
              </Grid.Column>
            ))}
        </Grid>
      </Container>
    );
  }
}

export default withAuthorization(
  connect(
    state => ({
      authUser: state.auth.authUser,
      brackets: state.brackets
    }),
    { changeComplete, changeRound, deleteBracket, getBrackets, ungetBrackets }
  )(Brackets)
);
