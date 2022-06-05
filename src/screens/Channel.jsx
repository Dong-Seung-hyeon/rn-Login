import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { createMessage, getCurrentUser, DB } from '../firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Channel = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { uid, name, photo } = getCurrentUser();

  useEffect(() => {
    const unsubscribe = DB.collection('channels')
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
    const message = messageList[0];
    try {
      await createMessage({ channelId: route.params.id, message });
    } catch (e) {
      Alert.alert('Message Error', e.message);
    }
  };

  return (
    <Container>
      <GiftedChat
        placeholder="Enter a message ..."
        messages={messages}
        user={{ _id: uid, name, avatar: photo }}
        onSend={_handleMessageSend}
      />
    </Container>
  );
};

export default Channel;
