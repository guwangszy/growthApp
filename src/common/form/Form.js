
import React from 'react';
import {StyleSheet,TouchableWithoutFeedback, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import extend from 'extend';
import Input from './Input'
import Rows from './Rows'
import Tips from './Tips'


export const FieldType = {
    String: "string",
    Number: "number",
    Password: "password",
    Picker: "picker",
    Tips:'tips',
    Line:'line'
}
let rowId = 0

var inited = false
export class Form extends React.Component{
    constructor(props){
        super(props);
    }
    render () {
        var model = this.props.model,
            values = this.props.value,
            rows = [],
            defaultRowModel = {
                style: {},
                disabled: false,
            }
        for (var i in model) {
            var rowModel = extend(true, {}, defaultRowModel, model[i])
            switch (rowModel.type) {
                case "number":
                case "string":
                case "password":
                    rowContent = <Input
                                    ref={i}
                                    name={i}
                                    label={rowModel.label}
                                    type={rowModel.type}
                                    value={rowModel.value}
                                    editable={!rowModel.disabled}
                                    required={!rowModel.required}
                                    placeholder={rowModel.placeholder}
                                    maxLength={rowModel.maxLength}
                                    minLength={rowModel.minLength}
                                />
                    break;
                case 'picker':
                    rowContent = <Rows
                                    ref={i}
                                    name={i}
                                    label={rowModel.label}
                                    type={rowModel.type}
                                    value={rowModel.value}
                                    text={rowModel.text}
                                    required={!rowModel.required}
                                    placeholder={rowModel.placeholder}
                                    onClick ={rowModel.onClick}
                                />
                     break;
                case 'tips':
                    rowContent = <Tips name={i} style={rowModel.style} value={rowModel.value} />
                     break;
                case 'line':
                    rowContent = ''
                     break;
                default:
            }
            rows.push(
                rowModel.type==='line'?(
                <View key={rowId++} style={[styles.lineRow]}></View>
                ):(
                    <View key={rowId++} style={[styles.formRow,!rowModel.hidden?null:styles.display]}>
                            {rowModel.type==='tips'?(
                            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center' }}>
                                <View style={{flex: 1,right:0}}>{rowContent}</View>
                            </View>
                            ):(
                            <View style={{width:'100%',flex: 1,flexDirection: 'row',alignItems: 'center' }}>
                                <View style={{width:15}}>
                                    <Text style={[styles.label,{color:'red'}]}>{!rowModel.required?'':'*'}</Text>
                                </View>
                                
                                <View style={{flex: 1}}>{rowContent}</View>
                                <View style={{width:15}}>
                                    <Ionicons style={[!rowModel.icons ? styles.display : null]} name={rowModel.icons?rowModel.icons:'ios-arrow-forward'} size={rowModel.iconSize?rowModel.iconSize:20}  color='#6A95F6' />
                                </View>
                            </View>
                            )}
                    </View>
                )
            )
        }
        return (
            <View style={styles.container}>
                {rows}
            </View>
        )
    }
    setValue = (opt) => {
        for(var i in opt){
            var row = this.refs[i]
            if(row.setValue){
                row.setValue(opt[i])
            }
        }
    }
    getValue = (opt) =>{
        var values = {}
        if(opt){
            var row = this.refs[opt]
            if(row && row.getValue){
                values[row.props.name] = row.getValue()
            }
        }else{
            for(var i in this.refs){
                var row = this.refs[i]
                if(row && row.getValue){
                    values[row.props.name] = row.getValue()
                }
            }
        }
        console.log('getValue',values);
        return values
    }
    getVerify = () =>{
        var values = {}
        let flag=true;
        for(var i in this.refs){
            var row = this.refs[i]
            if(row.getVerify){
                values[row.props.name] = row.getVerify()
                if(!row.getVerify()){
                    flag =false
                }
            }
        }
        console.log(flag)
        return flag
    }
}
var styles = StyleSheet.create({
    container: {
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#F6F6F6',
    },
    lineRow: {
        height: 10,
        lineHeight: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    formRow: {
        flexDirection: "row",
        height: 60,
        lineHeight: 60,
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomWidth: 2,
        backgroundColor: '#FFF',
        borderBottomColor:'#F6F6F6'
    },
    display:{
        display: 'none'
    },
    rowIcon:{
        marginLeft: 20
    },
    label: {
        color:'#AAB2B5',
        fontWeight: 'bold',
        fontSize: 15
    }
    
})

