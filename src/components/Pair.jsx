import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import Seed from 'components/Seed';

const Pair = ({ currentRound, elements: [A, B] }) => (
  <List>
    <List.Item key={'seed-1'}>
      <Seed currentRound={currentRound} e={A} winner={A.votes[currentRound - 1] >= B.votes[currentRound - 1]} />
    </List.Item>
    <List.Item key={'seed-2'}>
      <Seed currentRound={currentRound} e={B} winner={A.votes[currentRound - 1] < B.votes[currentRound - 1]} />
    </List.Item>
  </List>
);

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
