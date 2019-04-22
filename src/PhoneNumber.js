import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import ConfirmButton from '../components/ConfirmButton';

export default class PhoneNumber extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />


        <View style={styles.title}>
            <Text style={styles.text}>동아리원 모집을 위해 회장님의 전화번호가 공개됩니다.</Text>
            <Text style={styles.text}>전화번호는 최초 1회만 입력하시면 됩니다.</Text>
            <TextInput
                style={styles.input}
                placeholder={"전화번호"}
                placeholderTextColor={"#999"}
            />
        </View>

        <View style={styles.content}/>
        
        <View style={styles.footer}>
          <ConfirmButton
            style={styles.button}
            title={'확인'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  header: {
    width:'100%',
    height:'10%',
    // backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    height:'30%',
    flexDirection: "column",
    alignItems:"center"
    // backgroundColor: '#9aa9ff'
  },
  content: {
    flex: 1,
    // backgroundColor: '#d6ca1a',
  },
  footer: {
    width:'100%',
    height:150,
    // backgroundColor: '#1ad657',
    paddingTop: 40,
    paddingBottom: 40
  },
  input: {
    width:'100%',
    padding: 7,
    borderColor: "#32B8FF",
    borderWidth: 1,
    fontSize: 17,
    marginTop:13
  },
  text: {
      fontSize: 13,
      color:"#c8c8c8"
  }
});