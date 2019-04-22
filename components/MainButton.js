import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

export default class MainButton extends Component{
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#000',
    titleColor: '#fff',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity 
        style={[styles.button,{backgroundColor: this.props.buttonColor}]}
        onPress={this.props.onPress}>

        <Text style={[styles.title,{color: this.props.titleColor, fontSize: moderateScale(15),}]}>
          {this.props.title}
        </Text>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: moderateScale(300),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 30,
    height:moderateScale(50, 0.25),
  },
  title: {
    fontSize: 18,
  },
});