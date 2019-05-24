
import React from 'react';
import { StatusBar } from "react-native";
import { createStackNavigator } from 'react-navigation'
import Utils from '../common/Utils'
import BottomTabNavigator from './BottomTabNavigator'
import BottomTabNavigatorStu from './BottomTabNavigatorStu'
import Login from '../pages/Login'

// 注册
import Identity from '../pages/regediter/Identity'
import Regedit from '../pages/regediter/Regedit'

import Password from '../pages/account/Password'
import Modify from '../pages/account/Motify'
// 班级
import ClassAdd from '../pages/classes/Add'
import ClassDetail from '../pages/classes/Detail'
import UserDetail from '../pages/classes/UserDetail'

// 班级圈
import TaskList from '../pages/circle/TaskList'
import AddNotice from '../pages/circle/Notice'
import TaskDetail from '../pages/circle/TaskDetail'
import FinishTask from '../pages/circle/FinishTask'
import CameraRecordScreen from '../pages/circle/CameraRecordScreen'

// 成长册
import GrowthAdd from '../pages/growth/Add'
import GrowthDetail from '../pages/growth/Detail'
import Growth from '../pages/growth/Growth'

// 知识库
import KnowledgeList from '../pages/knowledge/List'
import KnowledgeDetail from '../pages/knowledge/Detail'

// 家庭作业
import  HomeworkList from '../pages/homework/List'
import HomeworkEdit from '../pages/homework/Edit'
import HomeworkView from '../pages/homework/View'
import HomeworkAdd from '../pages/homework/Add'

// 新闻
import NewView from '../pages/new/View'

function TopLevelNavigator(isLogin) {
    return createStackNavigator({
        CameraRecordScreen: {
            screen: CameraRecordScreen,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        Growth: {
            screen: Growth,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        NewView: {
            screen: NewView,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        HomeworkAdd: {
            screen: HomeworkAdd,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        HomeworkView: {
            screen: HomeworkView,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        HomeworkEdit: {
            screen: HomeworkEdit,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        HomeworkList: {
            screen: HomeworkList,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        UserDetail: {
            screen: UserDetail,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        KnowledgeDetail: {
            screen: KnowledgeDetail,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        KnowledgeList: {
            screen: KnowledgeList,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        GrowthDetail: {
            screen: GrowthDetail,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        GrowthAdd: {
            screen: GrowthAdd,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        Password: {
            screen: Password,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        Modify: {
            screen: Modify,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        Home: {//首页
            screen: BottomTabNavigator,
            navigationOptions: ({ navigation }) => ({header: null}),
        },
        HomeStu: {//首页
            screen: BottomTabNavigatorStu,
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
        },
        ClassDetail: {
            screen: ClassDetail,
            navigationOptions:({navigation}) =>({header:null})
        },
        AddNotice: {
            screen: AddNotice,
            navigationOptions:({navigation}) =>({header:null})
        },
        TaskList: {
            screen: TaskList,
            navigationOptions:({navigation}) =>({header:null})
        },
        TaskDetail: {
            screen: TaskDetail,
            navigationOptions:({navigation}) =>({header:null})
        },
        FinishTask: {
            screen: FinishTask,
            navigationOptions:({navigation}) =>({header:null})
        }
    }, {
            initialRouteName: isLogin ? global.TYPE===1?'Home':'HomeStu' : 'Login',//系统默认进入的第一个页面
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
