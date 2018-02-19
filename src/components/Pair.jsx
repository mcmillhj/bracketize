import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import Seed from 'components/Seed';

const Pair = ({ currentRound, elements }) => (
  <List>
    {elements.map((e, i) => (
      <List.Item key={`seed-${i}`}>
        <Seed currentRound={currentRound} e={e} />
      </List.Item>
    ))}
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
