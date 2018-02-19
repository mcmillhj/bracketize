import React from 'react';
import PropTypes from 'prop-types';

const Winner = ({ winner }) => (
  <div className="winner">
    <img className="img" src={winner.image} alt={winner.alt} />
  </div>
);

Winner.propTypes = {
  winner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    seed: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

Winner.defaultProps = {};

export default Winner;
