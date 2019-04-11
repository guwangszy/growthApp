/**
 * 路由配置界面
 */
import React from 'react';
import {View, StyleSheet} from "react-native";
import Router from './router/Index';
import storage from './storage/index'
import StackNavigator from './router/StackNavigator'

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin:false, // 是否登录
      }
    }
    componentWillMount(){
      let that = this
      storage.getItem('userInfo').then(ret => {
        if (ret) {
          global.USRID = ret.userId // 全局的用户id 
          that.setState({
            isLogin:true
          })
        }
      }).catch(err => {
        that.setState({
          isLogin:false
        })
      })
    }
    render() {
      const TopLevelNavigator = StackNavigator.TopLevelNavigator(this.state.isLogin)
      return (
        <View style={styles.container}>
          <TopLevelNavigator
            ref={navigatorRef => {
              Router.setTopLevelNavigator(navigatorRef);
            }}
          />
  
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });