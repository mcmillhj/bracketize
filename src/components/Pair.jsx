// @flow

import React from 'react';
import { List } from 'semantic-ui-react';
import _ from 'lodash';

import Seed from 'components/Seed';

type PairProps = {
  onSeedClick: Function,
  complete: boolean,
  currentRound: number,
  round: number,
  elements: Array<{ seed: number, title: string, image: string, votes: Array<number> }>
};

class Pair extends React.Component<PairProps, { activeSeed: Object | null }> {
  state = {
    activeSeed: null
  };

  handleSeedClick = (e: Event, seed: Object) => {
    const { onSeedClick, complete, currentRound, round } = this.props;
    const { activeSeed } = this.state;

    round === currentRound && !complete &&
      !_.isEqual(activeSeed, seed) &&
      this.setState(
        { activeSeed: { ...seed, votes: seed.votes.map((v, i) => (i + 1 === currentRound ? v + 1 : v)) } },
        () => {
          onSeedClick({ ...seed, votes: seed.votes.map((v, i) => (i + 1 === currentRound ? v + 1 : v)) });

          activeSeed &&
            onSeedClick({ ...activeSeed, votes: activeSeed.votes.map((v, i) => (i + 1 === currentRound ? v - 1 : v)) });
        }
      );
  };

  render() {
    const { round, currentRound, complete, elements: [A, B] } = this.props;
    const { activeSeed } = this.state;

    return (
      <List>
        <List.Item key={'seed-1'}>
          <Seed
            round={round}
            e={A}
            active={!!activeSeed && activeSeed.seed === A.seed}
            onClick={this.handleSeedClick}
            winner={(round >= currentRound && !complete) || A.votes[round - 1] >= B.votes[round - 1]}
          />
        </List.Item>
        <List.Item key={'seed-2'}>
          <Seed
            round={round}
            e={B}
            active={!!activeSeed && activeSeed.seed === B.seed}
            onClick={this.handleSeedClick}
            winner={(round >= currentRound && !complete) || A.votes[round - 1] < B.votes[round - 1]}
          />
        </List.Item>
      </List>
    );
  }
}

export default Pair;
