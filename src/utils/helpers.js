import * as R from 'ramda';
import _ from 'lodash';

const createDummySeed = numberOfRounds => ({
  id: '-1',
  seed: -1,
  title: '',
  image: '',
  votes: new Array(numberOfRounds).fill(0)
});

export const bracketify = bracket => {
  const { seeds: elements, round } = bracket;

  const numberOfRounds = Math.floor(Math.log2(elements.length));
  const bracketSize = elements.length * 2 - 2;
  const seedsByRound = [elements];
  for (let i = 1; i < round; i += 1) {
    const newSeeds = R.splitEvery(2, seedsByRound[i - 1]).map(([a, b]) => (a.votes > b.votes ? a : b));
    seedsByRound.push(newSeeds);
  }

  console.log('SEEDS BY ROUND = ', seedsByRound);

  let seeds = R.flatten(seedsByRound);

  if (seeds.length < bracketSize) {
    seeds = R.flatten(R.append(new Array(bracketSize - seeds.length).fill(createDummySeed(numberOfRounds)), seeds));
  }

  return roundify(pairify(seeds), Math.floor(elements.length / 2));
};

const pairify = seeds => R.splitEvery(2, seeds);

const roundify = (pairs, middle) => {
  const rounds = [];
  const final = [pairs.splice(pairs.length - 1)];

  for (let i = middle; i > 1; i /= 2) {
    rounds.push(pairs.splice(0, i));
  }

  return [rounds, final];
};
