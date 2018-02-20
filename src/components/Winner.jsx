// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal } from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rays = styled.div`
  background: url(/images/rays.png) 0 0 no-repeat;
  position: absolute;
  top: -100px;
  left: -100px;
  width: 490px;
  height: 490px;

  animation: ${spin} 10s linear infinite;
`;

const Winner = ({ winner }: { winner: Object }) => {
  return (
    <Modal basic defaultOpen style={{ position: 'relative' }}>
      <Rays />
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
