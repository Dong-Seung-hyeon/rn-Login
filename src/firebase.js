import * as firebase from 'firebase';
import config from '../firebase.json';
import 'firebase/firestore';

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

const uploadImage = async (uri) => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

export const signup = async ({ name, email, password, phoneNumber }) => {
  /*async, await를 이용하고, 파라미터로는 name, email, password, phoneNumber를 가지고있는 객체를 전달받도록 하였다.*/
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  // await user.updateCurrentUser({ user: phoneNumber });
  await user.updateProfile({ displayName: name, phoneNumber });
  return user;
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photo: photoURL };
};

export const updateUserInfo = async (photo) => {
  const photoURL = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoURL });
  return photoURL;
};

export const signout = async () => {
  await Auth.signOut();
  return {};
};

export const DB = firebase.firestore();

export const createChannel = async ({ title, desc }) => {
  /* 함수의 이름은 createChannel이라고 해주었고, 파라미터로는 title과 description을 전달받도록 하였다. */
  const newChannelRef = DB.collection('channels').doc();
  /* 컬렉션중에서 이름이 channels라는것을 이용한다. 아무것도 넘기지 않고 document함수를 호출하면 아이디가 자동으로 생성된다. */
  const id = newChannelRef.id;
  const newChannel = {
    /* 자동으로 생성된 id와 전달된 title 그리고 description, createdAt을 현재 만들어진 document에 업데이트하였다. */
    id,
    title,
    description: desc,
    createdAt: Date.now(),
  };
  await newChannelRef.set(newChannel);
  return id;
  /* 생성된 document 아이디를 반환하였다. */
};

export const createMessage = async ({ channelId, message }) => {
  return await DB.collection('channels')
    .doc(channelId)
    .collection('messages')
    .doc(message._id)
    .set({
      ...message,
      createdAt: Date.now(),
    });
};
