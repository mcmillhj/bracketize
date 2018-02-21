import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Pair from 'components/Pair';

const RoundContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: ${props => `calc((100% / ${props.numberOfRounds}) - 1%)`};
  position: relative;
`;

const RoundDetails = styled.section`
  position: absolute;
  top: 0;
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  align-self: center;
`;

const Round = ({ elements, isFinalRound, currentRound, round, numberOfRounds }) => (
  <RoundContainer numberOfRounds={numberOfRounds}>
    <RoundDetails>{isFinalRound ? 'Final' : `Round ${round}`}</RoundDetails>
    {elements.map((e, i) => (
      <Pair key={`pair-${i}`} elements={e} isFinalRound={isFinalRound} currentRound={currentRound} round={round} />
    ))}
  </RoundContainer>
);

Round.propTypes = {
  isFinalRound: PropTypes.bool.isRequired,
  currentRound: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  numberOfRounds: PropTypes.number.isRequired,
  elements: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
};

Round.defaultProps = {
  current: false,
  elements: [],
  isFinalRound: false
};

export default Round;
