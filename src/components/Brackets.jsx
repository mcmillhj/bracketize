// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import { watchBrackets } from 'state/brackets';

class Brackets extends React.Component<{ authUser: Object | null, brackets: Array<Object> }> {
  componentWillReceiveProps(nextProps) {
    nextProps.authUser && !this.props.authUser && this.props.watchBrackets(nextProps.authUser);
  }

  render() {
    const { brackets } = this.props;

    return (
      <Container>
        <Header as="h1">My Brackets</Header>
        {brackets &&
          brackets.map(b => (
            <div key={b.id}>
              <Header as="h3">
                <u>{b.id}</u>
              </Header>
              <ul>{b.seeds.map(s => <li key={s.title_en}>{s.title_en}</li>)}</ul>
              <br />
            </div>
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
  { watchBrackets }
)(Brackets);
