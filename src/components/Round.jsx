import React from 'react';
import styled from 'styled-components';

import Pair from 'components/Pair';

const RoundContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: ${props => `calc((100% / ${props.numberOfRounds}) - 1%)`};
  position: relative;
  margin-top: 2.5rem;
`;

const RoundDetails = styled.section`
  position: absolute;
  top: 0;
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  text-align: center;
  align-self: center;
`;

type RoundProps = {
  onSeedClick: Function,
  complete: boolean,
  isFinalRound: boolean,
  currentRound: number,
  round: number,
  numberOfRounds: number,
  elements: Array<Array<Object>>
};

const Round = ({ elements, isFinalRound, currentRound, complete, round, numberOfRounds, onSeedClick }: RoundProps) => (
  <RoundContainer className="round" numberOfRounds={numberOfRounds}>
    <RoundDetails>{isFinalRound ? 'Final' : `Round ${round}`}</RoundDetails>
    {elements.map((e, i) => (
      <Pair
        key={`pair-${i}`}
        elements={e}
        complete={complete}
        currentRound={currentRound}
        round={round}
        onSeedClick={onSeedClick}
      />
    ))}
  </RoundContainer>
);

export default Round;
