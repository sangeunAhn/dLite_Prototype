import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MainButton from '../components/MainButton';
import FindClub from './FindClub';
import { scale, moderateScale, verticalScale} from '../components/Scaling';


export default class Login extends React.Component {
  static navigationOptions = {
      header : null,
    };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />

        {/* 로고랑 설명 */}
        <View style={styles.title}>
        
        <Image
            style={{height:'55%',width:'55%',resizeMode:'contain'}}
            source={require('../images/logo.png')}/>
     
     <View style={{ paddingTop:scale(10)}}>
        <Text style={{color:'#4d4d4d',fontSize: moderateScale(15),}}>우리 대학교에는 어떤 동아리들이 있을까?</Text>
        
        </View>
        </View>
        {/* 버튼2개 */}
        <View style={styles.content}>
            <MainButton
                buttonColor={'#fff'}
                title={'동아리 생성 수정'}
                onPress={() => this.props.navigation.navigate('codeConfirm')}/>
            <View style={{width:"100%",height:10}} />
            <MainButton
                buttonColor={'#fff'}
                title={'일반'}
                onPress={() => this.props.navigation.navigate('SchoolChoice')}/>
        </View>
        <View style={styles.footer}>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    width:'100%',
    height:'15%',
    // backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    height:'30%',
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: '#9aa9ff'
  },
  content: {
    flex: 1,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10,
    paddingTop:scale(150),
    justifyContent:'center',
    alignItems:'center'
    // backgroundColor: '#d6ca1a',
  },
  footer: {
    width:'100%',
    height:'17%',
    // backgroundColor: '#1ad657'
  },
});