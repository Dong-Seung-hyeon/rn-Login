import * as firebase from 'firebase';
import config from '../firebase.json';

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
const Auth = app.auth();

export const signin = async ({ email, password }) => {
  /*async, await를 이용하고, 파라미터로는 email, password를 가지고있는 객체를 전달받도록 하였다.*/
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  /*반환되는 값중에는 user만 이용하도록 하였다.*/
  return user;
};

export const signup = async ({ name, email, password, phoneNumber }) => {
  /*async, await를 이용하고, 파라미터로는 name, email, password, phoneNumber를 가지고있는 객체를 전달받도록 하였다.*/
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  await user.updateCurrentUser({ user: phoneNumber });
  await user.updateProfile({ displayName: name });
  return user;
};
