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
    const newSeeds = pairify(seedsByRound[i - 1]).map(([a, b]) => (a.votes[i - 1] >= b.votes[i - 1] ? a : b));
    seedsByRound.push(newSeeds);
  }

  let seeds = _.flatten(seedsByRound);

  if (seeds.length < bracketSize) {
    seeds = _.flatten([].concat(seeds, new Array(bracketSize - seeds.length).fill(createDummySeed(numberOfRounds))));
  }

  return roundify(pairify(seeds), Math.floor(elements.length / 2));
};

const pairify = seeds => _.chunk(seeds, 2);

const roundify = (pairs, middle) => {
  const rounds = [];

  for (let i = middle; i > 1; i /= 2) {
    rounds.push(pairs.splice(0, i));
  }

  rounds.push(pairs);

  return rounds;
};
