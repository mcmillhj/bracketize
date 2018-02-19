import * as R from 'ramda';

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

  let seeds = seedsByRound[0];
  for (let i = 1; i < seedsByRound.length; i += 1) {
    const innerSeeds = seedsByRound[i];
    const middle = seeds.length / 2;

    seeds = R.flatten(R.insertAll(middle, innerSeeds, seeds));
  }

  if (seeds.length < bracketSize) {
    const middle = seeds.length / 2;

    seeds = R.flatten(
      R.insertAll(middle, new Array(bracketSize - seeds.length).fill(createDummySeed(numberOfRounds)), seeds)
    );
  }

  return splitify(pairify(seeds), Math.floor(elements.length / 2));
};

const pairify = seeds => R.splitEvery(2, seeds);

const splitify = (pairs, middle) => {
  const left = [];
  const right = [];
  const final = [pairs.splice(middle - 1, 1)];

  for (let i = middle / 2; i >= 1; i /= 2) {
    left.push(pairs.splice(0, i));
  }

  for (let i = 1; i <= middle / 2; i *= 2) {
    right.push(pairs.splice(0, i));
  }

  return [left, final, right];
};

// export const numify = (classname, n) => {
//   const numberToWordsMap = [
//     'zero',
//     'one',
//     'two',
//     'three',
//     'four',
//     'five',
//     'six',
//     'seven',
//     'eight',
//     'nine',
//     'ten',
//     'eleven',
//     'twelve',
//     'thirteen',
//     'fourteen',
//     'fifteen'
//   ];

//   if (!n) {
//     return '';
//   }

//   return `${classname}-${numberToWordsMap[n]}`;
// };
