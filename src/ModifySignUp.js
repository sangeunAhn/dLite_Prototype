import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, image, Button} from 'react-native';
import ConfirmButton from '../components/ConfirmButton';
import ClubPicker from '../components/ClubPicker';
import ConfirmButtonN from '../components/ConfirmButtonN';
import { Avatar } from 'react-native-elements';
import * as axios from 'axios';
import { ImagePicker, Constants, Permissions } from 'expo';

export default class ModifySignUp extends Component {
    static navigationOptions = {
        header : null,
      };
    constructor(props){
        super(props);
        this.state={
          clubName:'',
          clubKind:'',
          clubWellcome:'',
          clubPhoneNumber:'',
          clubIntroduce:'',
          clubLogo:null,
          clubMainPicture:null,
          userNo:'',
        };
      }

      componentWillMount = () => {
        this._getDatas();
      };


  render() {
    let { clubLogo, clubMainPicture } = this.state;
    console.log(clubMainPicture);
    return (
        <View style={styles.container}>
            <Text style={styles.blank}>ㅁㅁㅁㅁ</Text>
            <ScrollView>
                <View style={styles.block}>
                    <Text style={styles.text}>동아리 이름</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={(clubName) => this.setState({clubName})}
                        maxLength={20}
                        value={this.state.clubName}
                    />
                </View>
                <View style={styles.block}>
                    <Text style={styles.text}>동아리 종류</Text>
                    <View style={{width:160,}}>
                        <ClubPicker />
                    </View>
                </View>
                <View style={styles.block}>
                    <Text style={styles.text}>이런 신입생 와라</Text>
                    <TextInput 
                        style={[styles.input, styles.introduce]} 
                        multiline={true}
                        onChangeText={(clubWellcome) => this.setState({clubWellcome})}
                        placeholder={"ex. 상큼한 새내기들 환영"}
                        placeholderTextColor={"#d1d1d1"}
                        maxLength={100}
                        value={this.state.clubWellcome}
                    />
                </View>
                <View style={styles.block}>
                    <Text style={styles.text}>연락 가능 연락처</Text>
                    <TextInput 
                        style={[styles.input, styles.introduce]} 
                        multiline={true}
                        onChangeText={(clubPhoneNumber) => this.setState({clubPhoneNumber})}
                        maxLength={100}
                        value={this.state.clubPhoneNumber}
                    />
                </View>
                <View style={styles.block}>
                    <Text style={styles.text}>동아리 소개</Text>
                    <TextInput 
                        style={[styles.input, styles.introduce]} 
                        multiline={true}
                        onChangeText={(clubIntroduce) => this.setState({clubIntroduce})}
                        maxLength={100}
                        value={this.state.clubIntroduce}
                    />
                </View>
                <View style={styles.block}>
                    <Text style={styles.text}>동아리 로고</Text>

                        <TouchableOpacity onPress={this._pickLogo}>
                        {
                          clubLogo === null ?
                          <Avatar
                            size="large"
                            icon={{ name: 'questioncircle' }}
                            
                            containerStyle={{flex: 1, marginTop:20, width:'100%'}}
                            showEditButton
                          />
                          :
                          {clubLogo} &&
                            <Image source={{ uri: clubLogo }} style={{ width: 100, height: 100 }} />
                        }
                        </TouchableOpacity>
                </View>
                <View style={styles.block}>
                    <Text style={styles.text}>동아리 메인사진</Text>
                    <TouchableOpacity onPress={this._pickMainPicture}>
                        {
                          clubMainPicture === null ?
                          <Avatar
                            size="large"
                            icon={{ name: 'questioncircle' }}
                            
                            containerStyle={{flex: 1, marginTop:20, width:'100%'}}
                            showEditButton
                          />
                          :
                          {clubMainPicture} &&
                            <Image source={{ uri: clubMainPicture }} style={{ width: '100%', height: 100 }} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                     {(this.state.clubName.length==0 && this.state.clubWellcome.length==0 && this.state.clubPhoneNumber.length==0)
                        ?
                        <ConfirmButtonN title={'확인'}/>
                        :
                        <ConfirmButton 
                            title={'확인'} 
                            onPress={() => this._updatRegister()}/> 
                    }
                </View>
                
            </ScrollView>
        </View>
    );
  }

  
  // 로고 가져오기
  _pickLogo = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    
    console.log(permissions, status);
    if(status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            this.setState({ clubLogo: result.uri });
          }
    }
  }

    // 메인사진 가져오기
    _pickMainPicture = async () => {
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);
      
      console.log(permissions, status);
      if(status === 'granted') {
          let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
            });
        
            console.log(result);
        
            if (!result.cancelled) {
              this.setState({ clubMainPicture: result.uri });
            }
      }
  }

  // 데이터 가져오는 함수
  _getDatas = () => {
      //userNo 가지고 오기
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;


    // 데이터 가져오기
    axios.post('http://dkstkdvkf00.cafe24.com/GetRegister.php',{
        userNo:userNo,
      })
      .then(function (response) {
        //   clubName = tt.subString(1,tt.length-1);
        t._setDatas(response);
        var str = JSON.stringify(response.data.message.clubName);;
        var clubName = str.substring(1, str.length-1);
          t.setState({
            clubName: clubName
          });
        var str = JSON.stringify(response.data.message.clubWellcome);;
        var clubWellcome = str.substring(1, str.length-1);
          t.setState({
            clubWellcome: clubWellcome
          });
      });
  }

  // 데이터 넣기
  _setDatas = response => {

    var str = JSON.stringify(response.data.message.clubName);;
    var clubName = str.substring(1, str.length-1);
        this.setState({
            clubName: clubName
        });

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
    var clubIntroduce = str.substring(1, str.length-1);
        this.setState({
            clubIntroduce: clubIntroduce
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
  

  // 정보 수정 함수
  _updatRegister = () => {

    //userNo 가지고 오기
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');


    const {clubName, clubKind, clubWellcome, clubPhoneNumber, clubIntroduce, 
             clubLogo, clubMainPicture} = this.state;

    // 데이터베이스에 넣기
    axios.post('http://dkstkdvkf00.cafe24.com/ModifySignUp.php',{
        clubName:clubName,
        clubKind:clubKind,
        clubWellcome:clubWellcome,
        clubPhoneNumber:clubPhoneNumber,
        clubIntroduce:clubIntroduce,
        clubLogo:clubLogo,
        clubMainPicture:clubMainPicture,
        userNo:userNo,
      })
      .then(function (response) {
          ms = response.data.message;
      });

       this.props.navigation.navigate('Main')
  }


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: 'white',
    },
    
    input: {
      width:'100%',
      padding: 7,
      borderColor: "#32B8FF",
      borderWidth: 1,
      fontSize: 17,
      marginTop: 5
    },
    text: {
        fontSize: 13
    },
    toDos: {
      alignItems: "center"
    },
    block: {
        paddingBottom: 30
    },
    introduce: {
        height: 120
    },
    button: {
        height:60,
        marginTop:30
    },
    blank: {
      fontSize: 40,
      color:'white'
    }
  });

