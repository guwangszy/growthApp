/**
 * 班级详情
 */
import React from 'react';
import {View,ScrollView,StyleSheet,FlatList,Text,Image,TouchableOpacity} from 'react-native';
import {SimpleDetail, TitleDetail, ShortDetail, BtnBoxDetail} from '../../common/form/Detail'
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
            title:'班级详情',
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
        // let data = this.props.navigation.state.params;
        if(global.USERINFO.classId){
            let params={
                areaId:global.USERINFO.areaId,
                schoolId:global.USERINFO.schoolId,
                gradeId:global.USERINFO.gradeId,
                classId:global.USERINFO.classId,
            }
            api.post(Config.service.classDetail,params).then((ret)=>{
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
                        <SimpleDetail lable={'校区：'} value={this.state.data.area} />
                        <SimpleDetail lable={'学校：'} value={this.state.data.school} />
                        <SimpleDetail lable={'年纪：'} value={this.state.data.grade} />
                        <SimpleDetail lable={'班级：'} value={this.state.data.className} />
                        <SimpleDetail lable={'成员数量：'} value={this.state.data.total} />
                    </View>
                </View>
                <TitleDetail title='成员信息' />
                <FlatList
                    data={this.state.data.students}
                    keyExtractor={(item, index)=>`${item.id}-${index}`}
                    renderItem={({item, separators}) => (
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('UserDetail',{id:item.user_id})}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:"space-between",alignItems:'center',marginBottom:2,backgroundColor:"#fff",paddingRight:10}}>
                                <View style={{paddingLeft:10,flexDirection:'row',justifyContent:"center",alignItems:'center',height: 50,}}>
                                    <Image source={images.nan} style={{height: 40, width: 40}} resizeMode="contain" />
                                    <Text style={{paddingLeft:10,color:"#5FDA21"}}>{item.username}</Text>
                                </View>
                                <Text >{item.mobile}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
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
