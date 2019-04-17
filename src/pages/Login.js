/**
 * 登录页面
 */
import React from 'react';
import {View, Text,TextInput,StyleSheet, TouchableWithoutFeedback, TouchableOpacity, 
  } from "react-native";
import Icon from '../resource/icon/Iconfont'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Utils from '../common/Utils'
import storage from '../storage/index'
import Config from '../api/Config'
import api from '../api/index'
import {width} from '../common/AdapterUtil'
export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isVerify:true,
            secureTextEntry:true,
            setCheckbox:false
        }
    }
    componentWillMount(){
      let that = this
      storage.getItem('keepPsd').then(ret => {
        if (ret) {
          that.setState({
            setCheckbox: true,
            accountName: ret.username,
            password: ret.password
          })
        }
      }).catch(err => {
        
      })
    }
    /**
     * 选择身份
     */
    toIdentity(){
      this.props.navigation.navigate('Identity');
    }
    /**
     * 登录
     */
    toLogin = () => {
      if (!this.state.accountName) { //用户名称
        Utils.showToast("用户名不能为空！")
        return false
      }
      if (!this.state.password) { //密码
        Utils.showToast("密码不能为空！")
        return false
      }
      
      if (this.state.setCheckbox) {
        storage.setItem('keepPsd', {'username':this.state.accountName,'password':this.state.password});
      } else {
        storage.removeItem("keepPsd");
      }
      //登录
      let params = {
        usrName: this.state.accountName,
        password: this.state.password,
        deviceId: global.deviceId
      }
      api.post(Config.service.login, params).then((ret) => {
        if (ret.errcode === '0') {
          storage.setItem('userInfo', ret.data);
          storage.setItem('usrId', ret.data.userId);
          
          global.USERINFO = ret.data // 全局的用户id 
          global.USRID = ret.data.userId // 全局的用户id 
          global.TYPE = ret.data.type // 全局的用户id 
          Utils.showToast("登录成功！")
          this.props.navigation.navigate('班级圈');
        }else if (ret.returnCode === '0') {
          Utils.showToast(ret.errmsg)
        } else {
          Utils.showToast("登录失败！")
        }
      })
    }
    render(){
        return (
        <View style={styles.container}>
          {/* 顶部logo */}
          <View style={{ flexDirection: "column", }}>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20, marginTop: 100 }}>
                <Icon name={'chengchangzhi'} size={100} color={'#4AB567'} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 20 }}>中小学生成长平台</Text>
            </View>
          </View>
          {/* 中间部分 */}
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <View style={styles.input}>
                <TextInput
                style={{ height: 60, flex: 1, fontSize: 16, marginTop: 10 }}
                placeholder="请输入用户名"
                placeholderTextColor="#C8C8C8"
                maxLength={20}
                value={this.state.accountName}
                onChangeText={(value) => this.setState({ accountName: value })}
                >
                </TextInput>
            </View>
            <View style={styles.input}>
                <TextInput
                style={{ height: 60, flex: 1, fontSize: 16, marginTop: 10 }}
                placeholder="请输入密码"
                placeholderTextColor="#C8C8C8"
                password={true}
                maxLength={20}
                secureTextEntry={this.state.secureTextEntry}
                value={this.state.password}
                onChangeText={(value) => this.setState({ password: value })}
                >
                </TextInput>
                <Ionicons onPress={() => {
                this.setState({
                    secureTextEntry: !this.state.secureTextEntry
                })
                }} style={{ width: 40, height: 60, lineHeight: 60 }} name={this.state.secureTextEntry ? 'md-eye-off' : 'md-eye' } size={20} color='#4AB567' />
            </View>
            <View style={{ width: width * 0.9, flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => { this.setState({ setCheckbox: this.state.setCheckbox ? false : true }) }}>
                <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.keepPsd, { backgroundColor: this.state.setCheckbox ? "#4AB567" : "#fff", }]}></Text>
                    <Text style={{ color: "#4AB567" }}> 记住密码 </Text>
                </View>
                </TouchableOpacity>
            </View>
          </View>
          <TouchableWithoutFeedback activeOpacity={0.9} onPress={() => { this.state.isVerify && this.toLogin() }}>
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <Text style={[styles.loginBtn, { backgroundColor: this.state.isVerify ? "#4AB567" : "#F7F7F7", color: this.state.isVerify ? "#fff" : "#D3D3D3" }]}>登录</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ width: width * 0.9, flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}> 
            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#5B5B5B", fontSize: 14,}}> 还没有账号？点击</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => this.toIdentity()}>
                <Text style={{ color: "#4AB567", fontSize: 18 }}>注册</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  input: {
    width: width * 0.9,
    flexDirection: "row",
    height: 60,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 0.7
  },
  originalBackgroundColor: {
    backgroundColor: "#DFF7FF",
    color: "#3CC0EB"
  },
  changeBackgroundColor: {
    backgroundColor: "#F7F7F7",
    color: "#C3C3C3"
  },
  loginBtn: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    width: width * 0.8,
    height: 50,
    borderRadius: 5,
    lineHeight: 50,
    fontWeight: "bold",
    backgroundColor: "red"
  },
  verifyBtn: {
    flex: 0.3,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
    borderRadius: 5,
    marginTop: 15,
  },
  keepPsd: {
    height: 15,
    width: 15,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#4AB567",
    marginRight: 5
  }
})
