// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import Round from 'components/Round';
import { getBracket } from 'state/bracket';
import { bracketify } from 'utils/helpers';

const BracketContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

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

    if (bracket) {
      const { complete, name, round, seeds } = bracket;
      const numberOfRounds = Math.floor(Math.log2(seeds.length));
      const [rounds] = bracketify(bracket);

      return (
        bracket && (
          <section>
            <Header as="h1">{name}</Header>
            <BracketContainer>
              {rounds.map((e, i) => (
                <Round
                  key={`round-${i}`}
                  elements={e}
                  complete={complete}
                  current={round === i + 1 && !complete}
                  round={i + 1}
                  isFinalRound={i + 1 === numberOfRounds}
                />
              ))}
            </BracketContainer>
          </section>
        )
      );
    }

    return null;
  }
}

export default connect(
  state => ({
    authUser: state.auth.authUser,
    bracket: state.bracket
  }),
  { getBracket }
)(Bracket);
