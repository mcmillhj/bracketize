// @flow

import React from 'react';
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

type WinnerProps = {
  image: string,
  seed: number,
  synopsis: string,
  title: string,
  votes: Array<number>
};

class Winner extends React.Component<WinnerProps, { open: boolean }> {
  state = {
    open: true
  };

  render() {
    const { image, synopsis, title } = this.props;

    return (
      <Modal
        trigger={<Button onClick={() => this.setState({ open: true })}>View Winner</Button>}
        onClose={() => this.setState({ open: false })}
        open={this.state.open}
        basic
        closeIcon>
        <Rays />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content image>
          <Image size="big" src={image} />
          <Modal.Description>
            <p>{synopsis}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Winner;
