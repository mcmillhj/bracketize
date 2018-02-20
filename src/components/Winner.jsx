import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const WinnerContainer = styled.section`
  position: absolute;
`;

const WinnerImage = styled(Image)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Winner = ({ winner }) => {
  return (
    <Modal basic defaultOpen>
      <Modal.Header>{winner.title}</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={winner.image} alt={winner.alt} />
        <Modal.Description>{winner.synopsis}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

Winner.propTypes = {
  winner: PropTypes.shape({
    seed: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

Winner.defaultProps = {};

export default Winner;
