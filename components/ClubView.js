import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import * as axios from 'axios';
import ClubChars from './ClubChars';
import Overlay from 'react-native-modal-overlay';

export default class ClubView extends Component{
  state = {modalVisible: false}

  constructor(props){
    super(props);
    this.state={
      clubChar: [],
    }
  }

  showOverlay() {
    this.setState({modalVisible: true})
  }

  hideOverlay() {
    this.setState({modalVisible: false})
  }

  onClose = () => this.setState({ modalVisible: false});


componentWillMount = () => {
  this._getDatas();
};


_getDatas = () => {
  const { clubName, school } = this.props;
  const { clubChar } = this.state;


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
  

_gotoClubIntroduce = () => {
  this.onClose()
  this.props.navigation.navigate('ClubIntroduce', {
    clubName: this.props.clubName,
    school: this.props.school
  })
}

_gotoRecord = () => {
  this.onClose()
  this.props.navigation.navigate('Record', {
    clubName: this.props.clubName,
    school: this.props.school
  })
}



  render(){
    let {clubLogo, clubName} = this.props;
    let {clubChar} = this.state;
    return (
        <View style={styles.container}>
            <TouchableOpacity
              onPress={this.showOverlay.bind(this)}>
            <View style={styles.logo}>
              <Image
                style={styles.Image}
                source={{ uri: clubLogo }}/>
            </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={this.showOverlay.bind(this)}
              style={styles.club}>
                <Text style={styles.clubTitle}>{clubName}</Text>
                <Text style={styles.clubChar}>
                  {clubChar.map((chars, i) => {
                        return (<ClubChars 
                                  chars={clubChar[i]}
                                  key={i}/>);
                    })}
                </Text>
            </TouchableOpacity>

            <Overlay visible={this.state.modalVisible} onClose={this.onClose} 
                      closeOnTouchOutside animationType="zoomIn" animationDuration={200}
                      childrenWrapperStyle={{width:'100%', backgroundColor: 'white', borderRadius: 15,}} 
                      containerStyle={{backgroundColor: 'rgba(50, 50, 50, 0.78)'}} >
              <View style={{flexDriection:'column', }}>
                  <View style={{flexDirection:'row',}}>
                    <View style={styles.logo}>
                    {
                          clubLogo === null ?
                          <Image source={require('../images/momo.jpg')} style={styles.Image} />
                          :
                          {clubLogo} &&
                            <Image source={{uri: clubLogo}} style={styles.Image} />
                        }
                    </View>
                    <View style={{marginBottom:30, flex:1}}>
                        <Text style={styles.clubTitle}>{clubName}</Text>
                        <Text style={styles.clubChar}>
                          {clubChar.map((chars, i) => {
                          return (<ClubChars 
                                    chars={clubChar[i]}
                                    key={i}/>);
                          })}
                        </Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <TouchableOpacity 
                        style={styles.button}
                        onPress={this._gotoClubIntroduce}
                      >
                          <Image
                            style={styles.ImageR}
                            source={require('../images/introduce.png')}/>
                            <Text style={{textAlign:'center',fontSize:15}}>소개</Text>
                       
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.button}
                        onPress={this._gotoRecord}
                      >
                          <Image
                            style={styles.ImageR}
                            source={require('../images/record.png')}/>
                            <Text style={{textAlign:'center', fontSize:15}}>기록</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </Overlay>



        </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:70,
  //   backgroundColor:'#FAFABE',
    flexDirection:"row",
    justifyContent: "flex-start",
    padding:15,
    paddingLeft:25,
    alignItems:'center'
  },
  logo:{
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor:'#fff',
    
    marginRight:25
  },
  
  Image:{
    height:50,
    width:50,
    resizeMode:'cover',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor:'#0064FF',
    borderWidth:1,
  },
  ImageR:{
    left:-5,
    height:60,
    width:60,
    resizeMode:'contain',
  },
  club:{
      flex:1,
    //   backgroundColor: '#DCEBFF',
  },
  clubTitle:{
      fontSize:20,
      fontWeight: '500',
      marginBottom: 8
  },
  clubChar:{
      fontSize: 14,
      color: '#828282'
  },
  button:{
    top:-40,
    margin:30,
    height:70,
    width:50,
    zIndex:999,
    // backgroundColor:'red'
  },
});