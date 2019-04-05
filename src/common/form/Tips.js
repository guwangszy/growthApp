
import React from 'react';
import {View,Text,TextInput, StyleSheet} from 'react-native';



class Tips extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            required:!this.props.required,
            message: this.props.label+'不能为空'
        }
    }
    render() {
        return (
            <View style={{flexDirection: "row"}}>
                <Text style={{color:'red'}}>提示：<Text numberOfLines={5}  style={[styles.rowText,this.props.style]}>{this.state.value} </Text></Text>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    rowText:{
        fontSize: 12,
        height:20,
        lineHeight: 20,
        color: '#79B2C3',
        alignItems:'center',
        letterSpacing:1
    }
})

module.exports = Tips