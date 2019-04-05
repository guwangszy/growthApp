/**
 * 新增班级
 */
import React from 'react';
import {View,Text} from 'react-native';
import TitleBar from '../../common/TitleBar'
import {Form,FieldType} from '../../common/form/Form'


export default class addClass extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'新增班级',
        }
    }
    model ={
        className:{
            type: FieldType.String,
            label: "班级名称",
            required: true,
            placeholder: "请输入"
        },
        school:{
            type: FieldType.String,
            label: "学校名称",
            required: true,
            placeholder: "请输入"
        },
        class:{
            type: FieldType.Picker,
            label: "所属班级",
            required: true,
            placeholder: "请选择"
        },
        subject:{
            type: FieldType.Picker,
            label: "任教学科",
            required: true,
            placeholder: "请选择"
        },

    }
    submit(){
        this.props.navigation.state.params.callback()
        this.props.navigation.goBack();
    }
    render(){
        return(
            <View>
                <TitleBar title={this.state.title} navigation={this.props.navigation}/>
                <Form model={this.model} ref="form"/>
                <SimpleBtn onPress={() => this.submit()} text={'添加'}/>
            </View>
        )
    }

}