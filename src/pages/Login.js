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
import {width} from '../common/AdapterUtil'
export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isVerify:true,
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
    toRegidit(){
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
      Utils.showToast("登录成功！")
      this.props.navigation.navigate('班级圈');
      // api.post(Config.service.login, JSON.stringify(params)).then((ret) => {
      //   if (ret.returnCode === '0' && ret.bean.flage === 'success') {
      //     storage.setItem('userInfo', ret.bean, 7 * 24 * 60 * 60 * 1000);
      //     storage.setItem('usrId', ret.bean.userId, 7 * 24 * 60 * 60 * 1000);
      //     storage.setItem('accesstoken', ret.bean.userId + '_' + device.deviceId, 7 * 24 * 60 * 60 * 1000);
          
      //     global.USRID = ret.bean.userId // 全局的用户id 
      //     Utils.showToast("登录成功！")
      //     this.clearTimer()
      //     this.props.navigation.navigate('消息');
      //   } else if (ret.returnCode === '0' && ret.bean.flag === '9') {
      //     Utils.showToast("该账户已在其他设备登录！")
      //   } else if (ret.returnCode === '0' && ret.bean.flage === 'error') {
      //     Utils.showToast(ret.bean.errorInfo)
      //   } else {
      //     Utils.showToast("登录失败！")
      //   }
      // })
    }
    render(){
        return (
        <View style={styles.container}>
            {/* 顶部logo */}
            <View style={{ flexDirection: "column", marginBottom: 30 }}>
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
                <TouchableOpacity activeOpacity={0.6} onPress={() => this.toRegidit()}>
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
      backgroundColor: '#fff',
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
    verifyBtn: {
      flex: 0.3,
      height: 40,
      textAlign: "center",
      lineHeight: 40,
      borderRadius: 5,
      marginTop: 15,
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
    keepPsd: {
      height: 15,
      width: 15,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#4AB567",
      marginRight: 5
    }
  })
