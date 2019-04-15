/**
 * 注册
 */
import React from 'react';
import {View, Text,TextInput,StyleSheet, TouchableWithoutFeedback, TouchableOpacity, 
} from "react-native";
import {Form,FieldType} from '../../common/form/Form'
import TitleBar from '../../common/TitleBar'
import ActionSheet from 'react-native-actionsheet'
import Config from '../../api/Config'
import api from '../../api/index'
import {width} from '../../common/AdapterUtil'
import {SimpleBtn} from '../../common/form/Buttons'
import Utils from '../../common/Utils';

export default class Identity extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:'注册',
      actionSheetOptions:['男','女','取消'],
      type:'1',
    }
  }
  componentWillMount(){
    let data = this.props.navigation.state.params;
    this.setState({
      type:data.type
    })
  }
  chooseActionSheet(index){
    if (index != (this.state.actionSheetOptions.length- 1)) {
      let options = {
        sex:{
          value: index,
          text: index===0?'男':'女',
        }
      }
      this.refs.form.setValue(options)
    }
  }
  model ={
    username:{
      type: FieldType.String,
      label: "姓名",
      required: true,
      placeholder: "请输入"
    },
    phone:{
      type: FieldType.Number,
      label: "手机号码",
      required: true,
      maxLength:12,
      placeholder: "请输入"
    },
    password:{
      type: FieldType.Password,
      label: "密码",
      required: true,
      maxLength:6,
      placeholder: "请输入"
    },
    repassword:{
      type: FieldType.Password,
      label: "确认密码",
      required: true,
      maxLength:6,
      placeholder: "请输入"
    },
    age:{
      type: FieldType.Number,
      label: "年龄",
      required: true,
      maxLength:3,
      placeholder: "请输入"
    },
    sex:{
      type: FieldType.Picker,
      label: "性别",
      required: true,
      placeholder: "请选择",
      onClick: () => {
        this.ActionSheet.show()
      }
    }
  }
  submit(){
    var value = this.refs.form.getValue();
    var verify = this.refs.form.getVerify();
    if (verify) {
      if(value.password != value.repassword){
        Utils.showToast("密码输入不一致！")
        return false;
      }
      //type:0:新增 1：修改
      let params={
        username:value.username,
        phone:value.phone,
        password:value.password,
        age:value.age,
        type:this.state.type,
        sex:value.sex,
      }
      console.log(params)
      api.post(Config.service.regedit, JSON.stringify(params)).then((ret) => {
        if (ret.errcode === 0) {
          Utils.showToast("注册成功！")
          this.props.navigation.navigate('Login');
        } else {
          Utils.showToast("注册失败！")
        }
      })
    }
  }
  render(){
    return (
    <View style={styles.container}>
      <TitleBar title={this.state.title}  navigation={this.props.navigation}  />
      <Form model={this.model} ref="form"/>
      <SimpleBtn onPress={() => this.submit()} text={'提交'}/>
      <ActionSheet
        ref={o => this.ActionSheet = o}
        options={this.state.actionSheetOptions}
        cancelButtonIndex={this.state.actionSheetOptions.length-1}
        destructiveButtonIndex={this.state.actionSheetOptions.length-1}
        onPress={(index) => this.chooseActionSheet(index)}
      />
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  }
})
