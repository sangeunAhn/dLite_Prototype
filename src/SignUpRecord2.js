import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import RecordFalse from '../components/RecordFalse';
import RecordTrue2 from '../components/RecordTrue2';
import { Header, Icon } from 'react-native-elements';
import MasonryList from "react-native-masonry-list";
import * as axios from 'axios';


export default class SignUpRecord extends React.Component {

  constructor(props){
    super(props);
    this.state={
      records:[],
    };

    this.props.navigation.addListener('didFocus', () => {
        this._getDatas()
      });
  }

  componentWillMount = () => {
    this._getDatas();
  };


  // 이미지들 가져오기
  _getDatas = () => {
      //userNo 가지고 오기
      const { navigation } = this.props;
      const {records} = this.state;
      var userNo = navigation.getParam('userNo', 'NO-ID');
      // console.log(userNo);
      // var userNo = 27;
      const t = this;
  
      // 데이터 가져오기
      axios.post('http://dkstkdvkf00.cafe24.com/GetImages.php',{
          userNo:userNo,
        })
        .then((result) => {
          // t._setDatas(response);
          const  response  = result.data;
          var recordArray = new Array();
          response.forEach(row => {
            recordArray.push({ uri : row.recordPicture});
            });
          
          t.setState({
            records: records.concat(recordArray)
          });
          
      
        });
  }


  _RecordRegister = item => {
    this.props.navigation.navigate('RecordRegister', {
      item: item.uri,
      userNo: this.props.userNo
    })
  }



  render() {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const {records} = this.state;
    // console.log(userNo)
    return (
      <>
      <View style={styles.container}>

            <Icon
              raised
              reverse
              name='plus'
              type='entypo'
              color='#2eaeff'
              containerStyle={{ position: 'absolute', bottom:100, right: 10, zIndex:999 }}
              onPress={() => this.props.navigation.navigate('RecordRegister',{
                userNo: userNo
            })}
            />

                        {/* 사진들 들어갈 곳 */}
          <MasonryList
            imageContainerStyle={{borderRadius:17, right:12}}
            spacing={7}
            images={records}
            onPressImage = {(item, index) => {
              this._RecordRegister(item)
          }}
          />

            {/* 완료버튼 */}
            <View style={styles.footer}>
                {/* true면 <RecordTrue /> false면 <RecordFalse /> */}
                <TouchableOpacity 
                    style={styles.true}
                    onPress={() => this.props.navigation.navigate('Main')}
                >
                <Text style={styles.text1}>완료</Text>
            </TouchableOpacity>
            </View>
            
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  header:{
      width:'100%',
      height:70,
      // backgroundColor:'#A0AFFF',
      flexDirection:"row",
      justifyContent: "flex-end"
  },
  content:{
    flex: 1
  },
  footer:{
    width: '100%',
    height: 70,
    // backgroundColor: '#5CEEE6',
    borderTopWidth:1
  },
  button:{
      backgroundColor: '#0064FF',
      width:50,
      height:50,
      marginTop:10,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
      borderRadius: 50
  },
  text:{
      fontSize: 25,
      color: '#fff'
  },
  true:{
    flex:1,
    backgroundColor:'#1478FF',
    alignItems:'center',
    justifyContent: 'center'
},
text1:{
    fontSize:25,
    color:'#fff',
    fontWeight:'700'
}
});