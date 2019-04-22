import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, Text, View,  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView,BackHandler,Platform} from 'react-native';
import ConfirmButton from '../components/ConfirmButton';
import ConfirmButtonN from '../components/ConfirmButtonN';
import CharButton from '../components/CharButton';
import CharInput from '../components/CharInput';
import CharGoal from '../components/CharGoal';
import * as axios from 'axios';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class CharChoice extends React.Component {
  static navigationOptions = {
    headerLeft: null,
    gesturesEnabled: false,
    header: null
}

  constructor(props){
    super(props);
    this.state={
      clubChars:[],
      chars:[],
      count:0,
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem("chars").then(data => {
      const chars = JSON.parse(data || '[]');
      this.setState({ chars });
    });
  };

  removeChar = (index) => {
    let clubChars = [...this.state.clubChars];
    let chars = [...this.state.chars]
    let {count} = this.state
    chars.splice(index,1)
    clubChars.splice(index,1)
    this.setState({
      chars: chars,
      clubChars: clubChars,
      count: count-1,
    })
  }

  addChar = (char) => {
    let {count} = this.state;
   this.setState({count: count+1})
    // 새로운 특성(char) 객체 생성
    const newChar = {
        id: Date.now(), // 등록시간
        text: char,      // 특성 내용
    }   
    // state 업데이트
    this.setState(prevState => {
      prevState.clubChars.push(char);
      prevState.chars.push(newChar);
      return prevState;
      });
      
  }



  _ButtonPress = () => {
    // console.log(this.state.count);
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    this._setClubChars();
    this.props.navigation.navigate('SignUpRecord', {
      userNo: userNo
    })
  }


  _setClubChars = () => {
    const { navigation } = this.props;
    const { clubChars } = this.state;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    for(let i=0; i<clubChars.length; i++){
        // 데이터베이스에 넣기
        axios.post('http://dkstkdvkf00.cafe24.com/SetClubChars.php',{
          chars: clubChars[i],
          userNo: userNo
        })
        .then(function (response) {
            ms = response.data.message;
        });
          }
  }


  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true
    })
    this.setState({
      text:'',
      chars:[],
    })
  }



  clear = () => {
    this.setState({text:""})
  }
  


  render() {
    return (
      <>
      <DismissKeyboard>
      <View style={styles.container}>
      <KeyboardAvoidingView
      behavior="padding"
      
      keyboardVerticalOffset={Platform.OS=== 'ios' ? '200' : '10'}
      >
          <View style={styles.header} >

              {/* 제목 */}
              <View style={styles.title}>
                    <Text style={styles.text_1}>특징선택</Text>
                    <Text style={styles.text_2}>중복 선택 가능</Text>
              </View>
          </View>
      
        {/* 샾버튼 모아놓은거 */}
         
        
            {/* 위에 샾버튼 클릭했을 때 생긴 샾버튼 들어가는 곳 */}
          <View style={styles.contain}>
              <CharGoal 
                  chars={this.state.chars}
                  removeChar={this.removeChar}/>
          </View>
            {
              this.state.count >= 10 ?
                <View style={styles.dd}></View>
                :
                <CharInput addChar={this.addChar} />
            }
                
                
        {/* 완료버튼 */}
          <View style={styles.footer}>
          {(this.state.chars ==0 )?<ConfirmButtonN title={'선택완료'}/>:<ConfirmButton title={'선택완료'}  onPress={this._ButtonPress} /> }
          </View>
          
      </KeyboardAvoidingView>
        </View>
        </DismissKeyboard>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    padding:10,
    paddingBottom:10,
    backgroundColor: "white",
  },
  header: {
    width:'100%',
    height:'50%',
    paddingTop:20
    // backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    paddingTop: scale(10),
    flexDirection: "row",
    alignItems:"flex-end",
    // backgroundColor: '#9aa9ff',
    paddingLeft: 15
  },
  dd: {
    height:'5%'
  },
  content: {
    
    // backgroundColor: '#d6ca1a',
    padding:15,
    paddingTop:30,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom:50
    
  },
  inputView:{
    width:'100%',
    height:110,
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop:30
  },
  footer: {
    flex:1,
    width:"100%",
    // backgroundColor: '#1ad657',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems:'center'
  },
  
  text_1: {
    fontSize: moderateScale(25),
      color:"#0A6EFF",
      marginRight:3
  },
  text_2: {
    fontSize: moderateScale(12),
      color: "#aaaaaa"
  },
  selectView:{
    flexDirection: "row",
    
  },
  STBT:{
   
    paddingLeft: 50,
    marginLeft:50,
  },
  AB:{
    backgroundColor:"red"
  },
  contain:{
    height:'25%',
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end"
  }
});