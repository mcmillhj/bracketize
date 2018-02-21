// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import Round from 'components/Round';
import Winner from 'components/Winner';
import { getBracket } from 'state/bracket';
import { bracketify } from 'utils/helpers';

const BracketContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PageContainer = styled(Container)`
  &&& {
    width: 100%;
    padding: ${10 / 16}rem;
  }
`;

class Bracket extends React.Component<{
  authUser: Object | null,
  bracket: Object,
  bracketId: number,
  getBracket: Function
}> {
  componentDidMount() {
    const { bracketId } = this.props;

    bracketId && this.props.getBracket(bracketId);
  }

  render() {
    const { bracket: { isLoading, bracket } } = this.props;

    if (bracket && !isLoading) {
      const { complete, name, round, seeds } = bracket;
      const numberOfRounds = Math.floor(Math.log2(seeds.length));
      const [rounds] = bracketify(bracket);

      let winner;
      if (complete && round === numberOfRounds) {
        const [[A, B]] = rounds[rounds.length - 1];
        winner = A.votes[round - 1] >= B.votes[round - 1] ? A : B;
      }

      return (
        <PageContainer>
          {winner ? <Winner winner={winner} /> : null}

          <Header as="h1">{name}</Header>
          <BracketContainer>
            {rounds.map((e, i) => (
              <Round
                key={`round-${i}`}
                elements={e}
                round={i + 1}
                currentRound={round}
                numberOfRounds={numberOfRounds}
                isFinalRound={i + 1 === numberOfRounds}
              />
            ))}
          </BracketContainer>
        </PageContainer>
      );
    }

    return null;
  }
}

export default connect(
  (state, props) => ({
    authUser: state.auth.authUser,
    bracket: state.bracket,
    bracketId: props.match.params.id
  }),
  { getBracket }
)(Bracket);
