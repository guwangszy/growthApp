import React from 'react';
import {createBottomTabNavigator } from 'react-navigation'

import Icon from '../resource/icon/Iconfont'

import Growth from '../pages/growth/Growth'
import Account from '../pages/account/Account'
import Classes from '../pages/classes/Classes'


//所有需要用到路由跳转的页面,需在此页面注册入路由
export default BottomTabNavigator = createBottomTabNavigator  (
  { 
    '班级圈': { 
      screen: Classes,
      navigationOptions: ({ navigation }) => ({})
    },
    '成长册': { 
      screen: Growth,
      navigationOptions: ({ navigation }) => ({})
    },
    '班级': { 
      screen: Classes,
      navigationOptions: ({ navigation }) => ({})
    },
    '我的': { 
      screen: Account ,
      navigationOptions: ({ navigation }) => ({})
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === '班级圈') {
          iconName = `banjidongtai`;
        } else if (routeName === '成长册') {
          iconName = `chengchang`;
        } else if (routeName === '班级') {
          iconName = `banjizhuye`;
        } else if (routeName === '我的') {
          iconName = `wode`;
        }
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#4AB567',
      inactiveTintColor: 'gray',
    },
  }
);

 