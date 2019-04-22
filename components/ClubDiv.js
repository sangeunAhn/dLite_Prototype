import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import ClubView from './ClubView';
import * as axios from 'axios';
import PropTypes from "prop-types";
import { update } from 'tcomb';
import Overlay from 'react-native-modal-overlay';

export default class ClubDiv extends Component{
  constructor(props){
    super(props);
    this.state={
      clubName:[],
      clubLogo:[],
    };
  }
  static propTypes = {
    school: PropTypes.string.isRequired,
  };
  


componentWillMount = () => {
  this._getDatas();
};


_getDatas = () => {
const { clubName, clubLogo } = this.state;
const { school, clubKind } = this.props;
this.setState({school : school})



// 데이터 가져오기
axios.post('http://dkstkdvkf00.cafe24.com/FindClubs.php',{
    school:school,
    clubKind: clubKind,
  })
  .then((result) => {
    const  response  = result.data;
    var clubNameArray = new Array();
    var clubLogoArray = new Array();
    
    response.forEach(row => {
      clubNameArray.push(row.clubName);
      clubLogoArray.push(row.clubLogo);
      });
    
    this.setState({
      clubName: clubName.concat(clubNameArray),
      clubLogo: clubLogo.concat(clubLogoArray),
    });
      
    
      
  });
}


_gotoClubIntroduce = () => {
  console.log()
}


  render(){
    const {clubName, clubLogo} = this.state;
    const { school, clubKind } = this.props;
    // console.log(count);



    return (
        <View style={styles.container}>

            <Text style={styles.menuTitle}>{clubKind}</Text>
              {clubName.map((name, i) => {
                        return (
                                  
                                  <ClubView clubName={clubName[i]}
                                            clubLogo={clubLogo[i]}
                                            school={school}
                                            key={i}
                                            navigation={this.props.navigation}
                                  />
                                  
                                 );
                    })}
            
        </View>

    )
  }
}

const styles = StyleSheet.create({
    container:{
      width:'100%',
      borderTopWidth:1,
      borderColor: '#bebebe',
      marginBottom: 10
    },
    menuTitle:{
        marginBottom: 7,
        paddingTop:15,
        paddingLeft:25,
        color: '#828282',
        fontSize: 15
    },
    
    });