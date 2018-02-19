import React from 'react';
import PropTypes from 'prop-types';

import Seed from 'components/Seed';

const Pair = ({ currentRound, elements }) => {
  const directions = ['top', 'bottom'];

  return (
    <ul className="pair">
      {elements.map((e, i) => (
        <li className={`seed seed-${directions[i % directions.length]}`} key={`seed-${i}`}>
          <Seed currentRound={currentRound} e={e} />
        </li>
      ))}
    </ul>
  );
};

Pair.propTypes = {
  currentRound: PropTypes.number.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      seed: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      votes: PropTypes.arrayOf(PropTypes.number.isRequired)
    })
  )
};

Pair.defaultProps = {
  elements: []
};

export default Pair;
