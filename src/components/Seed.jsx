// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const SeedContainer = styled.section`
  position: relative;
  background-color: ${props => (props.active ? 'lightgreen' : 'white')};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  opacity: ${props => (props.winner ? 1 : 0.5)};
  margin: ${3 / 16}rem 0;
  height: ${50 / 16}rem;
  min-width: 10rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SeedImage = styled(Image)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${32 / 16}rem;
  height: 100%;
`;

const SeedImageContainer = styled.section`
  position: relative;
  width: ${32 / 16}rem;
  height: 100%;
  background-color: gray;
  flex-shrink: 0;
`;

const SeedName = styled.section`
  text-align: center;
  margin: 0 auto;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: ${14 / 16}rem;
`;

const SeedNumber = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${18 / 16}rem;
  height: ${12 / 16}rem;
  color: white;
  font-weight: bold;
  background: grey;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Condensed', sans-serif;
`;

const Votes = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-family: 'Roboto Condensed', sans-serif;
  width: ${32 / 16}rem;
  height: 100%;
  background: grey;
  color: white;
  font-weight: bold;
`;

type SeedProps = {
  round: number,
  winner: boolean,
  active: boolean,
  e: { seed: number, title: string, image: string, votes: Array<number> },
  onClick: Function
};

const Seed = ({ e: { image, seed, title, votes, ...rest }, active, round, winner, onClick }: SeedProps) => (
  <SeedContainer
    winner={winner}
    active={active}
    onClick={event => onClick(event, { image, seed, title, votes, ...rest })}>
    <SeedImageContainer>{image && <SeedImage src={image} alt={title} />}</SeedImageContainer>
    <SeedNumber>{seed}</SeedNumber>
    <SeedName>{title}</SeedName>
    <Votes>
      <p>{votes[round - 1]}</p>
    </Votes>
  </SeedContainer>
);

export default connect(state => ({
  votes: state.votes
}))(Seed);
