
import React from 'react';
import { StatusBar } from "react-native";
import { createStackNavigator } from 'react-navigation'
import Utils from '../common/Utils'
import BottomTabNavigator from './BottomTabNavigator'
import Login from '../pages/Login'
// 注册
import Identity from '../pages/regediter/Identity'
import Regedit from '../pages/regediter/Regedit'
// 班级
import ClassAdd from '../pages/classes/Add'

function TopLevelNavigator(isLogin) {
    return createStackNavigator({
        Home: {//首页
            screen: BottomTabNavigator,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        Login: {
            screen: Login,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        Regedit: {
            screen: Regedit,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        Identity: {
            screen: Identity,
            navigationOptions:({navigation}) =>({header:null})
        },
        ClassAdd: {
            screen: ClassAdd,
            navigationOptions:({navigation}) =>({header:null})
        }
    }, {
            initialRouteName: isLogin ? 'Home' : 'Home',//系统默认进入的第一个页面
            headerMode: 'screen',
            headerTransparent: true,
            headerBackground: '#5691EF',
            navigationOptions: ({ navigation }) => StackOptions({ navigation }),
        })
}
const StackOptions = ({ navigation }) => {
    let { state } = navigation;
    console.log('---路由跳转',state)
    const headerStyle = { backgroundColor: '#5691EF' };
    // const headerTitle = '';//state.param s.title;
    let header;
    const headerTintColor = '#fff';
    const headerTitleStyle = { fontSize: 20, color: 'white', fontWeight: '500' }
    const headerBackTitle = false;
    let BackgroundColor = '#4AB567'
    Utils.isAndroid && StatusBar.setBackgroundColor(BackgroundColor, true)
    return { headerStyle, headerTitleStyle, headerTintColor, headerBackTitle, header }
};
export default {
    TopLevelNavigator
}
