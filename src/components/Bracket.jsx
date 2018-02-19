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
  justify-content: center;
  align-items: center;
`;

const Split = styled.section`
  display: flex;
  width: 42%;
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
      const [left, champion, right] = bracketify(bracket);
      console.log([left, champion, right]);
      return (
        bracket && (
          <BracketContainer>
            {/* <Header as="h1">{name}</Header> */}
            <Split split={1}>
              {left.map((e, i) => (
                <Round key={`split-1-round-${i}`} elements={e} current={round === i + 1} round={i + 1} />
              ))}
            </Split>

            {champion.map((e, i) => (
              <Final
                key={`champion-${i}`}
                champion={e}
                complete={complete}
                round={round}
                current={round === numberOfRounds && !complete}
              />
            ))}

            <Split split={2}>
              {right.map((e, i) => (
                <Round
                  key={`split-2-round-${i}`}
                  elements={e}
                  current={round === numberOfRounds - i - 1}
                  round={numberOfRounds - 1 - i}
                />
              ))}
            </Split>
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
