import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Linking } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Route } from 'react-router-dom';
//ionicons 모듈사용

const MainDetail = (props) => {
  const Detail = ({navigation, Route})
  const navigation = useNavigation();
  
  const item = props.route.params.item
  console.log(props.route.params.item)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.container}>
        {/* 강아지 이미지 */}
        <Image
          style={{
            width: '100%',
            height: 350,
          }}
          source={{ uri: props.route.params.item.IMAGE_COURS }}
          //axios로 받아온 이미지를 source에 넣는다.
        />
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 20 }}
          onPress={() => {navigation.goBack();}
            //이 부분에 터치액션 정의
          }>
          <Ionicons name="home" color={'#F6EBFC'} size={30} />
        </TouchableOpacity>
        <View style={{ height: 2, backgroundColor: '#000000' }} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Ionicons
            style={{ marginLeft: 20 }}
            name="ios-person"
            color={'#000000'}
            size={30}
          />
          {/* axios로 받아온 제목을 Text 컴포넌트 사이에 넣는다. */}
          <Text style={styles.title} >{item.SHTER_NM }</Text>
        </View>
        <View style={{ height: 2, backgroundColor: '#000000' }} />
          {/* axios로 받아온 내용을 Text 컴포넌트 사이에 넣는다. */}
        <ScrollView>
        <Text style={styles.content}>
                발견장소 : {item.DISCVRY_PLC_INFO} {"\n"} 
                상태 : {item.STATE_NM} {"\n"} 
                품종 : {item.SPECIES_NM} {"\n"} 
                색상 : {item.COLOR_NM} {"\n"}
                나이 : {item.AGE_INFO} {"\n"}
                체중 : {item.BDWGH_INFO} {"\n"}
                성별 : {item.SEX_NM} {"\n"}
                특징 : {item.SFETR_INFO} {"\n"}
                {"\n"}
                ※ 공고 시작일자 : {item.PBLANC_BEGIN_DE} {"\n"}
                ※ 공고 종료일자 : {item.PBLANC_END_DE} {"\n"}
                {"\n"}
                ※ 보호소 도로명주소 : {"\n"}{item.PROTECT_PLC} </Text>
        </ScrollView>
        <View style={{ height: 2, backgroundColor: '#000000' }} />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {Linking.openURL(`tel:${item.SHTER_TELNO}`)}}>
          <Text style={styles.button}>기관으로 연락하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    marginLeft: 10,
    fontSize: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 15,
    color: '#000000',
  },
  buttonContainer: {
    padding: 5,
    marginVertical: 10,
    marginLeft: 150,
    backgroundColor: '#F9EBFF',
    alignSelf: 'center',
    borderRadius: 5,
  },
  button: {
    fontSize: 20,
    color: '#000000',
  },
});