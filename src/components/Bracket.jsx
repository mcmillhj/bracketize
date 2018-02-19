// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import { watchBracket } from 'state/bracket';

class Bracket extends React.Component<{ authUser: Object | null, brackets: Array<Object> }> {
  componentWillReceiveProps(nextProps) {
    const { id } = this.props.match.params;

    nextProps.authUser && !this.props.authUser && this.props.watchBracket(nextProps.authUser, id);
  }

  render() {
    const { bracket } = this.props;

    return (
      <Container>
        <Header as="h1">Bracket Title</Header>
        {bracket && (
          <div>
            <Header as="h3">
              <u>{bracket.id}</u>
            </Header>
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
  { watchBracket }
)(Bracket);
