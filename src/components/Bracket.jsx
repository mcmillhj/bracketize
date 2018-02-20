// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import Final from 'components/Final';
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
      const [rounds, final] = bracketify(bracket);
      console.log('ROUNDS = ', rounds);
      console.log('FINAL = ', final);
      return (
        bracket && (
          <BracketContainer>
            {/* <Header as="h1">{name}</Header> */}
            {rounds.map((e, i) => <Round key={`round-${i}`} elements={e} current={round === i + 1} round={i + 1} />)}

            {final.map((e, i) => (
              <Final
                key={`champion-${i}`}
                champion={e}
                complete={complete}
                round={round}
                current={round === numberOfRounds && !complete}
              />
            ))}
          </BracketContainer>
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
