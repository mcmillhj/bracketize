import { db } from 'firebaze/firebase';

const userBracketsRef = user_id => db.ref(`users/${user_id}/brackets`);
const userBracketRef = (user_id, id) => db.ref(`users/${user_id}/brackets/${id}`);
const bracketsRef = () => db.ref('brackets');
const bracketRef = id => db.ref(`brackets/${id}`);
const userRef = id => db.ref(`users/${id}`);

export const doCreateUser = (id, username, email) =>
  userRef(id).set({
    username,
    email
  });

export const doDeleteUser = id => userRef(id).remove();

export const doCreateBracket = (user_id, payload) =>
  new Promise(() => {
    const newBracketId = bracketsRef().push().key;
    const newBracket = {};

    newBracket[`brackets/${newBracketId}`] = { ...payload, user_id };
    newBracket[`users/${user_id}/brackets/${newBracketId}`] = { ...payload, user_id };

    db.ref().update(newBracket);
  });

export const doUpdateBracketWithVotes = (id, user_id, seed) => {
  return bracketRef(id).once('value', snapshot => {
    const { seeds } = snapshot.val();
    const newSeeds = seeds.map(s => (s.seed === seed.seed ? seed : s));

    return Promise.all([
      bracketRef(id).update({ seeds: newSeeds }),
      userBracketRef(user_id, id).update({ seeds: newSeeds })
    ]);
  });
};

export const doUpdateBracket = (id, user_id, updatedField) =>
  Promise.all([bracketRef(id).update(updatedField), userBracketRef(user_id, id).update(updatedField)]);

export const doDeleteBracket = (user_id, id) =>
  Promise.all([bracketRef(id).remove(), userBracketRef(user_id, id).remove()]);

export const getBrackets = user_id => userBracketsRef(user_id);

export const getBracket = id => bracketRef(id);
