import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Round from 'components/Round';
import Winner from 'components/Winner';

const FinalContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 32%;
`;

const Final = ({ complete, current, champion, round }) => {
  let winner;
  if (complete) {
    const [A, B] = champion[0];
    winner = A.votes[round - 1] > B.votes[round - 1] ? A : B;
  }

  return (
    <FinalContainer>
      {winner ? <Winner winner={winner} /> : null}
      <Round elements={champion} round={round} current={current} isFinalRound />
    </FinalContainer>
  );
};

Final.propTypes = {
  complete: PropTypes.bool.isRequired,
  champion: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  current: PropTypes.bool,
  round: PropTypes.number.isRequired
};

Final.defaultProps = {
  current: false
};

export default Final;
