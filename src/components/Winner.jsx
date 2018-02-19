import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const WinnerContainer = styled.section`
  position: relative;
`;

const WinnerImage = styled(Image)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Winner = ({ winner }) => (
  <WinnerContainer className="winner">
    <WinnerImage className="img" src={winner.image} alt={winner.alt} />
  </WinnerContainer>
);

Winner.propTypes = {
  winner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    seed: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.number.isRequired)
  }).isRequired
};

Winner.defaultProps = {};

export default Winner;
