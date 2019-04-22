import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Platform} from 'react-native';
import SchoolButton from '../components/SchoolButton';
import ConfirmButtonN from '../components/ConfirmButtonN';
import { Header } from 'react-native-elements';
import { scale, moderateScale, verticalScale} from '../components/Scaling';


export default class InputSchool extends React.Component {
  static navigationOptions = {
    title: "학교 선택",
    style: {elevation: 0, shadowOpacity: 0,},
    headerStyle: { height: Platform.OS === 'ios' ? 70 : 10, elevation: 0,shadowColor: 'transparent', borderBottomWidth:0, paddingBottom:10, paddingTop: Platform.OS === 'ios' ? 40 : 5},
    headerTitleStyle: { 
        color:"#2eaeff",
        fontSize:Platform.OS === 'ios' ? 25 : 18,
        textAlign:"center", 
        flex:1 ,
        fontWeight: "bold"
    },
    tintColor: "#2eaeff"
}
  constructo
  render() {
    return (
      <>
    
      <View style={styles.container}>
        <View style={styles.select}>
          <SchoolButton title={'울산대학교'}
           onPress={() => this.props.navigation.navigate('FindClub', {
            schoolName: '울대'
          })}/>
        </View>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  select: {
    flex:1,
    justifyContent:'center',
    width:'100%',
    // backgroundColor: '#1ad657',
    flexDirection:'row',
    alignItems:'center',
  },
});