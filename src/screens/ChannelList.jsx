import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '../components';
import { MaterialIcons } from '@expo/vector-icons';

const channels = []; /* channels라는 배열을 만들었다 */
for (let i = 0; i < 1000; i++) {
  /* 테스트를 위해 데이터를 1000개정도 만들었다. */
  channels.push({
    id: i,
    title: `title: ${i}`,
    description: `desc: ${i}`,
    createdAt: i,
  });
}

const ItemContainer = styled.TouchableOpacity`
  /* ItemComponent를 감싸기 위해 ItemContainer를 만들어주었다. 그리고 항목을 클릭해서 채널로 이동해야하니 TouchableOpacity를 사용하였다. */
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.itemBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.TouchableOpacity`
  /* 제목과 설명을 감싸줄 컨테이너를 만들었다. */
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  /* 제목을 렌더링할 ItemTitle components를 만들었다. */
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.item};
`;

const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.itemDesc};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.itemTime};
`;

const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'keyboard-arrow-right',
  size: 24,
  color: theme.itemIcon,
}))``;

const Item = React.memo(
  /* React.memo는 컨포넌트에 변화가없을때 relandering을 방지해주는 역할을한다. */
  ({ item: { id, title, description, createdAt }, onPress }) => {
    console.log(id);

    return (
      <ItemContainer>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemDesc>{description}</ItemDesc>
        </ItemTextContainer>
        <ItemTime>{createdAt}</ItemTime>
        <ItemIcon />
      </ItemContainer>
    );
  }
);

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const StyledText = styled.Text`
  font-size: 30px;
`;

const ChannelList = ({ navigation }) => {
  return (
    <Container>
      <FlatList /* FlatList에는 렌더링할 데이터를 가지고있는 배열을 data에 전달하고 renderItem에는 항목을 렌더링하기위해 컨포넌트를 반환하는 함수를 전달해야한다. */
        data={channels}
        renderItem={({ item }) => <Item item={item} />}
        /* renderItem에 설정된 함수의 파라미터로 전달되는 내용에서 item이라는 프로퍼티에 데이터에 설정한 목록의 항목이 전달된다. 이 item을 item props로 전달했다. */
        keyExtractor={(item) => item['id'].toString()}
        /* flatlist에 keyExtractor를 이용하면 쉽게 key를 지정할 수 있다. 
        keyExtractor에는 함수를 전달해야하는데 함수의 파라미터로 항목이 전달된다. 
        함수를 통해 어떠한 값을 키로 사용할지 알려주면 flatlist가 자동으로 key를 설정한다. */
        windowSize={5}
        /* windowSize를 줄이면 렌더링되는 숫자도 줄어든다. 
        이렇게 windowSize를 조절하면 미리불러와서 렌더링하는 컨포넌트의 숫자를 줄일 수 있다. 
        그리고 이를통해 메모리의 소비를 줄이고 성능을 향상시킬 수 있다. 
        하지만 빠르게 스크롤을 하다보면 데이터를 불러오기전에 스크롤이 해당위치에 도달해서 순간적으로 데이터가 보이지 않을 수 있다는 단점이있다. 
        windowSize를 무조건 줄이기보다는 화면에 따라 적절한값을 설정하는것이 중요하다. */
      />
    </Container>
  );
};

export default ChannelList;
