// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal } from 'semantic-ui-react';

const Winner = ({ winner }: { winner: Object }) => {
  return (
    <Modal basic>
      <Modal.Header>{winner.title}</Modal.Header>
      <Modal.Content image>
        <Image size="big" src={winner.image} alt={winner.alt} />
        <Modal.Description>{winner.synopsis}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

Winner.propTypes = {
  winner: PropTypes.shape({
    seed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

Winner.defaultProps = {};

export default Winner;
