
import React from 'react';
import {View,Text,TextInput, StyleSheet} from 'react-native';


export default class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
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
                        <TextInput value={String(this.state.value?this.state.value:'')}
                            style={[styles.input, this.props.editable ? null : styles.disabled]}
                            onChangeText={(value) => this.setState({value: value})}
                            editable={this.props.editable}
                            secureTextEntry={this.props.type === "password"}
                            placeholder={this.props.placeholder}
                            maxLength={this.props.maxLength}
                            onBlur={() => {
                                this.onRequired();
                            }}
                            onChangeText={(text) => {
                                if(this.props.type === 'number'){
                                    const newText = text.replace(/[^\d]+/, '');
                                    this.setState({value: newText})
                                }else{
                                    this.setState({value: text})
                                }
                            }  
                            }
                            />
                    </View>
                </View>
                <Text style={styles.errorText}>{!this.state.verify?this.state.message:''}</Text>
            </View>
        );
    }
    onRequired = () => {
        let flag = true;
        let message= ''
        if(this.state.required && !this.state.value){
            flag = false
            message= this.props.label+'不能为空'
        }else if(this.state.value && this.props.minLength && this.state.value.length < this.props.minLength){
            flag = false
            message= this.props.label+'不能少于'+this.props.minLength+'个字符'
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
        this.setState({
            value: val
        })
    }
    getValue = () => {
        if(this.props.type === "string"){
            return this.state.value?this.state.value:'' 
        }else{
            return this.state.value?Number(this.state.value): ''
        }
    }
}
var styles = StyleSheet.create({
    input: {
        paddingRight:10,
        width: '100%',
        height:50,
        color: '#333',
        fontSize: 15,
        textAlign:'right'
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