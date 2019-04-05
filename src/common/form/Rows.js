
import React from 'react';
import {View,Text,TextInput, StyleSheet} from 'react-native';



export default class Rows extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            text: this.props.text,
            verify:true,
            required:!this.props.required,
            message: this.props.label+'不能为空'
        }
    }
    render() {
        return (
            <View style={{flex: 1,flexDirection: "column"}}>
                <View style={{flex: 1,flexDirection: "row",alignItems:'center'}}>
                    <View style={{flex: 1,left:0}}><Text style={[styles.label]}>{this.props.label}:</Text></View>
                    <View style={{flex: 1,right:0}}>
                        <Text style={[styles.rowText]} onPress={()=>this.props.onClick?this.props.onClick():{}} >{this.state.text?this.state.text:this.props.placeholder}</Text>
                    </View>
                </View>
                <Text style={styles.errorText}>{!this.state.verify?this.state.message:''}</Text>
            </View>
        );
    }
    onRequired = () => {
        let flag = true;
        let message= ''
        if(this.state.required && !this.state.text){
            flag = false
            message= this.props.label+'不能为空'
        }
        this.setState({
            verify: flag,
            message: message
        })
        return flag
    }
    getVerify = () =>{
       return this.onRequired()
    }
    setValue = (val) => {
        if(typeof(val) == 'object'){
            this.setState({
                value: val.value,
                text: val.text,
            })
        }else{
            this.setState({
                value: val,
                text: val,
            })
        }
    }
    getValue = () => {
        return this.state.value || this.state.value === 0 ? this.state.value : '' 
    }
}
var styles = StyleSheet.create({
    rowText:{
        width: '100%',
        fontSize: 15,
        textAlign:'right',
        height:50,
        lineHeight: 50,
        color: '#aaa',
        alignItems:'center',
        paddingRight:10
    },
    errorText:{
        position:'absolute',
        fontSize: 12,
        bottom:0,
        right:0,
        color:'red'
    },
    disabled: {
        color: '#aaa'
    },
    label: {
        color:'#AAB2B5',
        fontWeight: 'bold',
        fontSize: 15
    }
})
