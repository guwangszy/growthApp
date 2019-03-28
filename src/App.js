/**
 * 路由配置界面
 */
import React from 'react';
import {View, StyleSheet} from "react-native";
import Router from './router/Index';
import StackNavigator from './router/StackNavigator'

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin:false, // 是否登录
      }
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