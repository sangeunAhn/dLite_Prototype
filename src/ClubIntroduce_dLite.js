import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, ScrollView} from 'react-native';
import * as axios from 'axios';
import ClubChars from '../components/ClubChars';

const { width, height } = Dimensions.get("window");

export default class ClubIntroduce extends React.Component {
  
  
  constructor(props){
    super(props);
    this.state={
      clubName:'',
      clubWellcome:'',
      clubPhoneNumber:'',
      clubIntroduce:'',
      clubLogo:null,
      clubMainPicture:null,
      clubChar:[]
    };
  }

  componentWillMount = () => {
    this._getDatas();
    this._getChars();
  };

  
  _getDatas = () => {
      const t = this;
      const { navigation } = this.props;
      var clubName = navigation.getParam('clubName', 'NO-ID');
      var school = navigation.getParam('school', 'NO-ID');

      this.setState({clubName: clubName});
  
  
      // 데이터 가져오기
      axios.post('http://dkstkdvkf00.cafe24.com/GetClubIntroduce.php',{
          clubName: clubName,
          school: school
        })
        .then(function (response) {
            t._setDatas(response);
        });
    }

    _setDatas = response => {

        var str = JSON.stringify(response.data.message.clubWellcome);;
        var clubWellcome = str.substring(1, str.length-1);
          this.setState({
            clubWellcome: clubWellcome
          });

        var str = JSON.stringify(response.data.message.clubPhoneNumber);;
        var clubPhoneNumber = str.substring(1, str.length-1);
          this.setState({
            clubPhoneNumber: clubPhoneNumber
          });

          var str = JSON.stringify(response.data.message.clubIntroduce);;
        var ClubIntroduce = str.substring(1, str.length-1);
          this.setState({
            ClubIntroduce: ClubIntroduce
          });

          var str = JSON.stringify(response.data.message.clubLogo);;
          var clubLogo = str.substring(1, str.length-1);
              this.setState({
                  clubLogo: clubLogo
              });

          var str = JSON.stringify(response.data.message.clubMainPicture);;
          var clubMainPicture = str.substring(1, str.length-1);
              this.setState({
                  clubMainPicture: clubMainPicture
              });
    }



    //특성 가져오기
    _getChars = () => {
      const t = this;
      const { navigation } = this.props;
      const {clubChar} = this.state;
      var clubName = navigation.getParam('clubName', 'NO-ID');
      var school = navigation.getParam('school', 'NO-ID');


    // 데이터 가져오기
    axios.post('http://dkstkdvkf00.cafe24.com/GetClubChars.php',{
      clubName: clubName,
      school: school,
    })
    .then((result) => {
      const response  = result.data;
      var clubCharArray = new Array();
      
      response.forEach(row => {
        clubCharArray.push(row.chars);
        });
      
      this.setState({
        clubChar: clubChar.concat(clubCharArray),
      });
        
      
        
    });

    }


  render() {
    console.log(clubLogo)
    let {clubName, clubWellcome, clubPhoneNumber, clubIntroduce, clubLogo, clubMainPicture, clubChar} = this.state;
    return (
      <ScrollView style={styles.container}>

        {/* 회색부분 */}
        <View style={styles.title}>

            {/* 동아리 대표 이미지 */}
                 {
                          clubMainPicture === null ?
                          <Image source={require('../images/momo.jpg')} style={styles.clubImage} />
                          :
                          {clubMainPicture} &&
                            <Image source={{uri: clubMainPicture}} style={styles.clubImage} />
                        }

            {/* 로고 이미지 */}
            {
                          clubLogo === null ?
                          <Image source={require('../images/momo.jpg')} style={styles.logo} />
                          :
                          {clubLogo} &&
                            <Image source={{ uri: clubLogo }} style={styles.logo} />
                        }

            <Text style={styles.clubTitle}>{clubName}</Text>

            <Text style={styles.clubChar}>
                    {clubChar.map((chars, i) => {
                        return (<ClubChars 
                                  chars={clubChar[i]}
                                  key={i}/>);
                    })} 
            </Text>
            
        </View>
        

        <View style={styles.content}>
            <Text style={styles.text}>소개</Text>
            <Text style={styles.clubExplain}>
                {clubIntroduce}
            </Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.text}>환영하는 신입생</Text>
            <Text style={styles.clubExplain}>
                {clubWellcome}
            </Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.text}>전화번호</Text>
            <Text style={styles.clubExplain}>
                {clubPhoneNumber}
            </Text>
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  title: {
    width:width,
    height:height*0.6,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: '#F2F2F2',
    paddingTop: 25
  },
  content: {
    padding:10
  },
  text: {
    fontSize: 15,
    color: '#727070'
  },
  clubImage:{
    width: '90%',
    height: '65%',
    resizeMode:'cover',
    backgroundColor: '#323232',
    borderRadius: 15
  },
  logo:{
    height:70,
    width:70,
    resizeMode:'cover',
    backgroundColor: '#fff',
    borderRadius: 35,
    top: -30
  },
  clubTitle:{
      fontSize: 25,
      top: -15
  },
  clubChar:{
      fontSize:15,
      color: '#828282',
      top: -10
  },
  clubExplain:{
      padding:20,
      fontSize: 20,
      alignItems: 'center',
  }
});