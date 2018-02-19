// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import { getBracket } from 'state/bracket';

class Bracket extends React.Component<{
  authUser: Object | null,
  bracket: Object,
  getBracket: Function,
  match: Object
}> {
  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } } } = this.props;

    nextProps.authUser && !this.props.authUser && this.props.getBracket(nextProps.authUser, id);
  }

  componentDidMount() {
    const { authUser, match: { params: { id } } } = this.props;

    authUser && this.props.getBracket(authUser, id);
  }

  render() {
    const { bracket } = this.props;

    return (
      <Container>
        {bracket && (
          <div>
            <Header as="h1">{bracket.name}</Header>
            <Header as="h3">
              <u>{bracket.id}</u>
            </Header>
            <p>{`Created At: ${bracket.created}`}</p>
            <ul>{bracket.seeds.map(s => <li key={s.title_en}>{s.title_en}</li>)}</ul>
            <br />
          </div>
        )}
      </Container>
    );
  }
}

export default connect(
  state => ({
    authUser: state.auth.authUser,
    bracket: state.bracket
  }),
  { getBracket }
)(Bracket);
