import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MainButton from '../components/MainButton';

export default class ClubModify extends React.Component {
  render() {
    
    return (
      <View style={styles.container}>
       
            <MainButton
                buttonColor={'#444'}
                title={'정보 수정'}
                onPress={() => this._gotoSignUp()}/>
            <View style={{width:"100%",height:10}} />
            <MainButton
                buttonColor={'#023e73'}
                title={'특성 수정'}
                onPress={() => this._gotoChar()}/>
            <View style={{width:"100%",height:10}} />
            <MainButton
                buttonColor={'#04B404'}
                title={'기록 수정'}
                onPress={() => this._gotoRecord()}/>
       
      </View>
    );
  }

  _gotoSignUp = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g,'');

    this.props.navigation.navigate('ModifySignUp', {
        userNo : userNo
    })
  }

  _gotoChar = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g,'');

    this.props.navigation.navigate('ModifyChar', {
        userNo : userNo
    })
  }

  _gotoRecord = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g,'');

    this.props.navigation.navigate('SignUpRecord2', {
        userNo : userNo
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent : 'center'
  },
  
});