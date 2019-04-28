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
      title:'完善信息',
      actionSheetOptions:['男','女','取消'],
    }
  }
  componentWillMount(){
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
      disabled: true,
      placeholder:'请输入',
      value: global.USERINFO.username
    },
    phone:{
      type: FieldType.Number,
      label: "手机号码",
      required: true,
      maxLength:12,
      placeholder:'请输入',
      value: global.USERINFO.mobile+''
    },
    age:{
      type: FieldType.Number,
      label: "年龄",
      required: true,
      maxLength:3,
      placeholder:'请输入',
      value: global.USERINFO.age+''
    },
    email:{
      type: FieldType.String,
      label: "邮箱",
      placeholder:'请输入',
      value: global.USERINFO.email
    },
    sex:{
      type: FieldType.Picker,
      label: "性别",
      required: true,
      placeholder: "请选择",
      value: global.USERINFO.sex,
      text: global.USERINFO.sex===0?'男':'女',
      onClick: () => {
        this.ActionSheet.show()
      }
    }
  }
  submit(){
    var value = this.refs.form.getValue();
    var verify = this.refs.form.getVerify();
    if (verify) {
      //type:0:新增 1：修改
      let params={
        userId:global.USRID,
        username:value.username,
        mobile:value.phone,
        age:value.age,
        roleId:global.USERINFO.roleId,
        email:value.email,
        sex:value.sex,
      }
      api.post(Config.service.update,params).then((ret) => {
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
