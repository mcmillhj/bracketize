import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Pair from 'components/Pair';

const RoundContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: 32%;
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

const Round = ({ current, elements, isFinalRound, round }) => (
  <RoundContainer>
    {!isFinalRound ? <RoundDetails>{`Round ${round}`}</RoundDetails> : null}
    {elements.map((e, i) => <Pair key={`pair-${i}`} elements={e} current={current} currentRound={round} />)}
  </RoundContainer>
);

Round.propTypes = {
  isFinalRound: PropTypes.bool.isRequired,
  round: PropTypes.number.isRequired,
  current: PropTypes.bool,
  elements: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
};

Round.defaultProps = {
  current: false,
  elements: [],
  isFinalRound: false
};

export default Round;
