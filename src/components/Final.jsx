import React from 'react';
import PropTypes from 'prop-types';

import Round from 'components/Round';
import Winner from 'components/Winner';

const Final = ({ complete, current, champion, round }) => {
  let winner;
  if (complete) {
    const [A, B] = champion[0];
    winner = A.votes[round - 1] > B.votes[round - 1] ? A : B;
  }

  return (
    <div className="final">
      {winner ? <Winner winner={winner} /> : null}
      <Round key="final-round" elements={champion} round={round} current={current} isFinalRound />
    </div>
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
