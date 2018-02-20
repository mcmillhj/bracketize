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
  getBracket: Function,
  match: Object
}> {
  componentWillReceiveProps(nextProps) {
    const { match: { params: { id, user_id } } } = this.props;

    // handle authed route
    if (nextProps.authUser && !this.props.authUser) {
      this.props.getBracket(nextProps.authUser, id);
    }

    // handle public route
    if (user_id && !nextProps.authUser && !this.props.authUser) {
      this.props.getBracket({ uid: user_id }, id);
    }
  }

  componentDidMount() {
    const { authUser, match: { params: { id, user_id } } } = this.props;

    // handle authed route
    authUser && this.props.getBracket(authUser, id);

    // handle public route
    !authUser && user_id && this.props.getBracket({ uid: user_id }, id);
  }

  render() {
    const { bracket } = this.props;

    if (bracket) {
      const { complete, name, round, seeds } = bracket;
      const numberOfRounds = Math.floor(Math.log2(seeds.length));
      const [rounds] = bracketify(bracket);

      let winner;
      if (complete && round === numberOfRounds) {
        const [[A, B]] = rounds[rounds.length - 1];
        winner = A.votes[round - 1] >= B.votes[round - 1] ? A : B;
      }

      return (
        bracket && (
          <PageContainer>
            {winner ? <Winner winner={winner} /> : null}

            <Header as="h1">{name}</Header>
            <BracketContainer>
              {rounds.map((e, i) => (
                <Round
                  key={`round-${i}`}
                  elements={e}
                  round={i + 1}
                  numberOfRounds={numberOfRounds}
                  isFinalRound={i + 1 === numberOfRounds}
                />
              ))}
            </BracketContainer>
          </PageContainer>
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
