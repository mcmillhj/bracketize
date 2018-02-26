// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Modal } from 'semantic-ui-react';
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
  width: 500px;
  height: 500px;

  animation: ${spin} 15s linear infinite;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

class Winner extends React.Component<{ winner: Object }, { open: boolean }> {
  state = {
    open: true
  };

  render() {
    const { winner } = this.props;

    return (
      <Modal
        trigger={<Button onClick={() => this.setState({ open: true })}>View Winner</Button>}
        onClose={() => this.setState({ open: false })}
        open={this.state.open}
        basic
        closeIcon>
        <Rays />
        <Modal.Header>{winner.title}</Modal.Header>
        <Modal.Content image>
          <Image size="big" src={winner.image} alt={winner.alt} />
          <Modal.Description>
            <p>{winner.synopsis}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

Winner.propTypes = {
  winner: PropTypes.shape({
    seed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

export default Winner;
