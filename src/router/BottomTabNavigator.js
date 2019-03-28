import React from 'react';
import {createBottomTabNavigator } from 'react-navigation'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Growth from '../pages/growth/Growth'



//所有需要用到路由跳转的页面,需在此页面注册入路由
export default BottomTabNavigator = createBottomTabNavigator  (
  { 
    '班级圈': { 
      screen: Growth,
      navigationOptions: ({ navigation }) => ({})
    },
    '成长册': { 
      screen: Growth,
      navigationOptions: ({ navigation }) => ({})
    },
    '班级': { 
      screen: Growth,
      navigationOptions: ({ navigation }) => ({})
    },
    '我的': { 
        screen: Growth ,
        navigationOptions: ({ navigation }) => ({})
      }
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === '班级圈') {
            iconName = `ios-text`;
          } else if (routeName === '成长册') {
            iconName = `ios-desktop`;
          } else if (routeName === '班级') {
            iconName = `ios-pulse`;
          } else if (routeName === '我的') {
            iconName = `md-person`;
          }
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  );

 