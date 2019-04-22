import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import CharButtonN from '../components/CharButtonN';
import {Icon} from 'react-native-elements';

class CharGoal extends Component {

    render() {
        return (
            <>
            <View style={styles.inputView}>
                {
                    this.props.chars.map((data,index,chars) => (
                        <View key={index} >
                            <TouchableOpacity style={styles.button}>
                                <Text style={{color:'white'}}>{data.text}</Text>
                                <TouchableOpacity style={styles.icon} onPress={this.props.removeChar.bind(this, index)}>
                                    <Icon
                                        reverse
                                        size={10}
                                        name='cross'
                                        type='entypo'
                                        color='#676765'
                                        />
                            </TouchableOpacity>
                            </TouchableOpacity>
                            
                        </View> 

                    ))
                }
            </View>
            </>
        );
    }
}


const styles = StyleSheet.create({
    whole:{
        flexDirection: 'row'
    },
 button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 15,
    height: 40, 
    backgroundColor: '#2eaeff',
    paddingRight: 10,
    paddingLeft:15,
    marginRight:10,
    borderColor: '#32AAFF',
    borderWidth:1,
    flexDirection: 'row'
  },
    inputView:{
        width:'100%',
        flexWrap: "wrap",
        flex:1,
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop:20
      },
      icon:{
        left: 10,
        paddingRight:5
      }
    });

    export default CharGoal;