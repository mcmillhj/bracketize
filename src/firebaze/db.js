import { db } from 'firebaze/firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const doDeleteUser = id => db.ref(`users/${id}`).remove();

export const onceGetUsers = () => db.ref('users').once('value');
