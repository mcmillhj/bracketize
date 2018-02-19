import React from 'react';
import PropTypes from 'prop-types';

const Seed = ({ e, currentRound }) => {
  console.log('E = ', e);
  return (
    <div>
      <img className="img" src={e.image} alt={e.alt} />
      <span className="seed-number">{e.seed}</span>
      <div className="seed-name">{e.title}</div>
      <span className="votes">{e.votes[currentRound - 1]}</span>
    </div>
  );
};

Seed.propTypes = {
  currentRound: PropTypes.number.isRequired,
  e: PropTypes.shape({
    seed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

Seed.defaultProps = {};

export default Seed;
