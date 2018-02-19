import { db } from 'firebaze/firebase';

const bracketsRef = user_id => db.ref(`users/${user_id}/brackets`);
const bracketRef = (user_id, id) => db.ref(`users/${user_id}/brackets/${id}`);

const userRef = id => db.ref(`users/${id}`);

export const doCreateUser = (id, username, email) =>
  userRef(id).set({
    username,
    email
  });

export const doDeleteUser = id => db.ref(`users/${id}`).remove();

export const onceGetUsers = () => db.ref('users').once('value');

export const onceGetBrackets = () => db.ref('brackets').once('value');

export const subscribeBrackets = user_id => bracketsRef(user_id);

export const subscribeBracket = (user_id, id) => bracketRef(user_id, id);

export const doCreateBracket = (user_id, payload) => bracketsRef(user_id).push(payload);

export const doDeleteBracket = (user_id, id) => bracketRef(user_id, id).remove();
