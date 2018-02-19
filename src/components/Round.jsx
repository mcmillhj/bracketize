import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
// import { numify } from 'utils/helpers';

import Pair from 'components/Pair';

const Round = ({ current, elements, isFinalRound, round }) => {
  const className = cx('round', {
    [`round-${round}`]: round,
    current
  });

  return (
    <div className={className}>
      {!isFinalRound ? <div className="round-details">{`Round ${round}`}</div> : null}
      {elements.map((e, i) => <Pair key={`pair-${i}`} elements={e} currentRound={round} />)}
    </div>
  );
};

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
