import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import Seed from 'components/Seed';

const Pair = ({ round, currentRound, isFinalRound, elements: [A, B] }) => {
  // console.log('ROUND = ', round);
  // console.log('currentRound = ', currentRound);
  // console.log('isFinalRound = ', isFinalRound);

  // console.log('A = ', A);
  // console.log('B = ', B);
  return (
    <List>
      <List.Item key={'seed-1'}>
        <Seed
          round={round}
          e={A}
          winner={(round >= currentRound && !isFinalRound) || A.votes[round - 1] >= B.votes[round - 1]}
        />
      </List.Item>
      <List.Item key={'seed-2'}>
        <Seed
          round={round}
          e={B}
          winner={(round >= currentRound && !isFinalRound) || A.votes[round - 1] < B.votes[round - 1]}
        />
      </List.Item>
    </List>
  );
};
Pair.propTypes = {
  isFinalRound: PropTypes.bool.isRequired,
  currentRound: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
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
