import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const SeedItem = styled.section`
  position: relative;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  opacity: 0.45;
  margin: 0.1875rem 0;
  height: 2.75rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeedImage = styled(Image)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${32 / 16}rem;
  height: 100%;
`;

const SeedName = styled.section`
  text-align: center;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeedNumber = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${18 / 16}rem;
  height: ${12 / 16}rem;
  color: white;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Votes = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  width: ${28 / 16}rem;
  height: 100%;
  color: white;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Seed = ({ e, currentRound }) => {
  return (
    <SeedItem>
      <SeedImage src={e.image} alt={e.alt} />
      <SeedNumber>{e.seed}</SeedNumber>
      <SeedName>{e.title}</SeedName>
      <Votes>{e.votes[currentRound - 1]}</Votes>
    </SeedItem>
  );
};

Seed.propTypes = {
  currentRound: PropTypes.number.isRequired,
  e: PropTypes.shape({
    seed: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

Seed.defaultProps = {};

export default Seed;
