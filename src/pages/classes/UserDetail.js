/**
 * 班级详情
 */
import React from 'react';
import {View,ScrollView,StyleSheet,FlatList,Text,Image} from 'react-native';
import {SimpleDetail, DoubleRowDetail, TitleDetail, ShortDetail, BtnBoxDetail} from '../../common/form/Detail'
import {width} from '../../common/AdapterUtil'
import TitleBar from '../../common/TitleBar'
import images from '../../common/image'
import api from '../../api/index'
import Config from '../../api/Config'
import Utils from '../../common/Utils';

export default class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'成员详情',
            data:{}
        }
    }
    componentWillMount(){
        this.subs = [this.props.navigation.addListener('didFocus', () => this.init()),];
    }
    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }
    init(){
        let _this =this 
        let data = this.props.navigation.state.params;
        console.log(data)
        if(global.USERINFO.classId){
            let params={
                userId:data.id
            }
            api.post(Config.service.getUserInfo,params).then((ret)=>{
                if(ret.errcode === 0){ //  成功
                    _this.setState({
                        data:ret.data
                    })
                }
            })
        }else{
            Utils.showToast('暂无班级信息')
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
                    {/* 头部企业信息部分 */}
                    <View style={{ alignItems: "center", backgroundColor: "#fff" }}>
                        <View style={{ width: width * 0.9, marginTop: 15, marginBottom: 15 }}>
                            <SimpleDetail lable={'姓名：'} value={this.state.data.username} />
                            <SimpleDetail lable={'手机号码：'} value={this.state.data.mobile} />
                            <SimpleDetail lable={'年龄：'} value={this.state.data.age} />
                            <SimpleDetail lable={'邮箱：'} value={this.state.data.email} />
                            <SimpleDetail lable={'性别：'} value={this.state.data.sex === 0?'男':'女'} />
                        </View>
                    </View>
                    
                </ScrollView>  
            </View>
        );
    }

}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
}
})
