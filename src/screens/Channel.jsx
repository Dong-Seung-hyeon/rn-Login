import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { createMessage, getCurrentUser, DB } from '../firebase';
/* firebase파일에서 createMessage를 불러와 사용해준다. 현재 로그인한 사용자의 정보를 전달하기 위해 getCurrentUser를 사용하였다. */
import { GiftedChat, Send } from 'react-native-gifted-chat';
/* GiftedChat라이브러리를 이용하여 채팅화면을 구상하였다. */
import { Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const SendIcon = styled(MaterialIcons).attrs(({ theme, text }) => ({
  name: 'send',
  size: 24,
  color: text ? theme.sendBtnActive : theme.sendBtnInactive,
}))``;

const SendButton = (props) => {
  console.log(props);
  return (
    <Send
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
      disabled={!props.text}
    >
      <SendIcon text={props.text} />
    </Send>
  );
};

const Channel = ({ navigation, route }) => {
  const [messages, setMessages] = useState(
    []
  ); /* 메시지의 상태변수를 만들어주었다. */
  const { uid, name, photo } = getCurrentUser();
  /* getCurrentUser 함수를 이용하여 현재 로그인한 사용자의 uid, name, photo를 받아오도록 하였다. */

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title || 'Channel',
    });
  }, []);

  useEffect(() => {
    const unsubscribe = DB.collection(
      'channels'
    ) /* channels 컬렉션에서 params 함수에 id로 전달된 channel id를 갖고있는 document에서 
    messages 컬렉션에 데이터를 가지고 올 것인데 정렬순서는 생성된 시간 순으로 가져오도록 하였다. */
      .doc(route.params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setMessages(list);
      });
    return () => unsubscribe();
  }, []);

  const _handleMessageSend = async (messageList) => {
    /* _handleMessageSend라는 함수를 만들어서 onSend로 전달 */
    const message =
      messageList[0]; /* 배열로 전달되어 0번 인덱스에 있는 값만 이용하였다. */
    try {
      await createMessage({
        channelId: route.params.id,
        message,
      }); /* create message함수에 channelId와 GiftedChat에서 만들어준 message 객체 자체를 전달 */
    } catch (e) {
      Alert.alert('Message Error', e.message);
    }
  };

  return (
    <Container>
      <GiftedChat
        placeholder="Enter a message ..." /* placeholder전달 */
        messages={messages} /* 메시지의 목록 전달 */
        user={{ _id: uid, name, avatar: photo }} /* 사용자정보 전달 */
        onSend={
          _handleMessageSend
        } /* 메시지를 전달하는 기능은 GiftedChat에 onSend에 전달하면된다. */
        renderSend={(props) => <SendButton {...props} />}
        scrollToBottom={true}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        multiline={false}
      />
    </Container>
  );
};

export default Channel;
