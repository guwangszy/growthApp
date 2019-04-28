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
import storage from '../../storage/index'
import {SimpleBtn} from '../../common/form/Buttons'
import Utils from '../../common/Utils';

export default class Identity extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:'修改密码',
      actionSheetOptions:['男','女','取消']
    }
  }
  model ={
    password:{
      type: FieldType.Password,
      label: "旧密码",
      required: true,
      maxLength:6,
      placeholder: "请输入"
    },
    newpassword:{
      type: FieldType.Password,
      label: "密码",
      required: true,
      maxLength:6,
      placeholder: "请输入"
    }
  }
  submit(){
    var value = this.refs.form.getValue();
    var verify = this.refs.form.getVerify();
    if (verify) {
      //type:0:新增 1：修改
      let params={
        userId:global.USRID,
        password:value.password,
        newPassword:value.newpassword,
      }
      api.post(Config.service.updatePassword,params).then((ret) => {
        if (ret.errcode === 0) {
          Utils.showToast("修改成功！")
          storage.removeItem('userInfo');
          storage.removeItem('usrId');
          this.props.navigation.navigate('Login');
        } else {
          Utils.showToast(ret.errmsg)
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
