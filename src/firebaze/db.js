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

    newBracket[`brackets/${newBracketId}`] = payload;
    newBracket[`users/${user_id}/brackets/${newBracketId}`] = payload;

    db.ref().update(newBracket);
  });

export const doUpdateBracketWithVotes = (id, payload) =>
  new Promise(() => {
    console.log('PAYLOAD = ', payload);

    bracketRef(id).update({ seeds: payload.seeds });
  });

export const doDeleteBracket = (user_id, id) =>
  Promise.all([bracketRef(id).remove(), userBracketRef(user_id, id).remove()]);

export const subscribeBrackets = user_id => userBracketsRef(user_id);

export const subscribeBracket = id => bracketRef(id);
