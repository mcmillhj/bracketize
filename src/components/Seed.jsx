import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const SeedContainer = styled.section`
  position: relative;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  opacity: ${props => (props.winner ? 1 : 0.5)};
  margin: ${3 / 16}rem 0;
  height: ${50 / 16}rem;

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

const Seed = ({ e, round, winner }) => (
  <SeedContainer winner={winner}>
    <SeedImageContainer>{e.image && <SeedImage src={e.image} alt={e.alt} />}</SeedImageContainer>
    <SeedNumber>{e.seed}</SeedNumber>
    <SeedName>{e.title}</SeedName>
    <Votes>
      <p>{e.votes[round - 1]}</p>
    </Votes>
  </SeedContainer>
);

Seed.propTypes = {
  round: PropTypes.number.isRequired,
  winner: PropTypes.bool.isRequired,
  e: PropTypes.shape({
    seed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

Seed.defaultProps = {};

export default Seed;
