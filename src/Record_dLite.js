import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import RecordFalse from '../components/RecordFalse';
import RecordTrue from '../components/RecordTrue';
import { Header, Icon } from 'react-native-elements';
import MasonryList from "react-native-masonry-list";

export default class Record extends React.Component {



  constructor(props){
    super(props);
    this.state={
      records:[],
      showImage:[],
    };
  }






  _RecordRegister = picture => {
    this.props.navigation.navigate('RecordPictures_dLite', {
      picture: picture.uri,
      userNo: this.props.userNo
    })
  }





  render() {
    return (
      <>
      
    
    <MasonryList
            imageContainerStyle={{borderRadius:17, right:12}}
            spacing={7}
            images={[
              { uri: 'http://etoland.co.kr//data/daumeditor02/190221/thumbnail3/33687715507189160.jpg',  },
              { uri: 'http://etoland.co.kr/data/file0207/star/1743390505_TfphHEzC_U1NCbtMH6.jpg' },
              { uri: 'http://etoland.co.kr/data/file0207/star/1743390505_2H1RX0k7_kiuMHutnZ.jpg' },
              { uri: 'http://etoland.co.kr/data/file0207/star/thumbnail3/2041774303_gHOKcVMt_Screenshot_20190217-032858_Instagram.jpg' },
              { uri: 'http://etoland.co.kr/data/daumeditor02/190120/15479464870.jpg' },
              { uri: 'http://etoland.co.kr/data/mw.cheditor/190101/thumbnail3/1c7fa003a62cf5552d2788ed0ff73d07_PFpsIeTnwvCLkCbXu.jpg' },
              { uri: 'http://dimg.donga.com/wps/NEWS/IMAGE/2016/05/27/78352163.1.jpg' },
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKaqws0tnHsY_jePJqGz3iltCjnitigbnTlghg4ciUjGe7RsYb' },
              { uri: 'https://image.fmkorea.com/files/attach/new/20180517/3655109/48834235/1060661020/4c23a9fce45cd3e205b686d32b3b0324.jpg' },
          ]}
            onPressImage = {(item, index) => {
              this._RecordRegister(item.uri)
            }}
          />
      
      </>
    );
  }
}

const styles = StyleSheet.create({
container:{
   flex:1,
   padding:20
}
});