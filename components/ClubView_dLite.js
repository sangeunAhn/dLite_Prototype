import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import Overlay from 'react-native-modal-overlay';

export default class ClubView_dLite extends Component{

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

  _gotoClubIntroduce = () => {
    this.onClose()
    this.props.navigation.navigate('ClubIntroduce_dLite', {
      clubName: this.props.clubName,
      school: this.props.school
    })
  }
  
  _gotoRecord = () => {
    this.onClose()
    this.props.navigation.navigate('Record_dLite', {
      clubName: this.props.clubName,
      school: this.props.school
    })
  }


  render(){
    let {clubLogo} = this.props;
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                style={styles.Image}
                source={require('../images/momo.jpg')}/>
            </View>
            
            <View style={styles.club}>
                <Text style={styles.clubTitle}>d:Lite</Text>
                <Text style={styles.clubChar}>#동아리 플랫폼</Text>
            </View>

            <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside animationType="zoomIn" animationDuration={200}
                      childrenWrapperStyle={{width:'100%', backgroundColor: 'white', borderRadius: 15,}} containerStyle={{backgroundColor: 'rgba(50, 50, 50, 0.78)'}} >
              <View style={{flexDriection:'column', }}>
                  <View style={{flexDirection:'row',}}>
                    <View style={styles.logo}>
                      <Image
                        style={styles.Image}
                        source={require('../images/logo2.png')}/>
                    </View>
                    <View style={{marginBottom:30, flex:1}}>
                        <Text style={styles.clubTitle}>d:Lite</Text>
                        <Text style={styles.clubChar}>#행복</Text>
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
    
  },
});