import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TouchableWithoutFeedback,
} from 'react-native';
import {width} from '../AdapterUtil'
export class SimpleBtn extends React.Component{

  render() {
    return (
      <TouchableWithoutFeedback activeOpacity={0.9} onPress={() => this.props.onPress? this.props.onPress():{} }>
        <View style={[styles.btnBox]}>
          <View style={[styles.btn,{width: this.props.width?this.props.width:width * 0.8}]}>
        <Text style={{color: "#fff", fontSize: 18, fontWeight: "bold"}}>{this.props.text}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
export class Dashedbtn extends React.Component{

  render() {
    return (
      <TouchableWithoutFeedback activeOpacity={0.9} onPress={() => this.props.onPress? this.props.onPress():{} }>
        <View style={[styles.btnBox]}>
          <View style={[styles.Dashedbtn,{width: this.props.width?this.props.width:width * 0.8}]}>
        <Text style={{color: "#4AB567", fontSize: 18, fontWeight: "bold"}}>{this.props.text}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
    btnBox:{
      flexDirection:'row',
      justifyContent:'center',
    },
    btn: {
      justifyContent:'center',
      alignItems: "center", 
      backgroundColor:"#4AB567" , 
      marginTop: 30,
      width: width * 0.8,
      borderRadius: 5,
      height: 50,
      lineHeight: 50
    },
    Dashedbtn: {
      alignItems: "center", 
      justifyContent:'center',
      marginTop: 30,
      borderRadius: 5,
      height: 50,
      lineHeight: 50,
      borderColor:"#4AB567" , 
      borderStyle:'dashed',
      borderWidth:1
    }
})
