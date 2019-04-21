/**
 * 班级详情
 */
import React from 'react';
                            <Image source={images.nv} style={{justifyContent: "center", height: 100, width: 100}} resizeMode="contain" />
import {View,ScrollView,StyleSheet,FlatList,Text,Image} from 'react-native';
import {SimpleDetail, DoubleRowDetail, TitleDetail, ShortDetail, BtnBoxDetail} from '../../common/form/Detail'
import {width} from '../../common/AdapterUtil'
import TitleBar from '../../common/TitleBar'
import images from '../../common/image'
import api from '../../api/index'
import Config from '../../api/Config'


export default class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'班级详情',
            data:{}
        }
    }
    componentWillMount(){
        let data = this.props.navigation.state.params;
        let _this =this 
        let params={
            id:data.id
        }
        api.post(Config.service.classDetail,params).then((ret)=>{
            if(ret.errcode === 0){ //  成功
                _this.setState({
                    data:ret.data
                })
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
            <TitleBar title={this.state.title} navigation={this.props.navigation} />
            <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
                {/* 头部企业信息部分 */}
                <View style={{ alignItems: "center", backgroundColor: "#fff" }}>
                    <View style={{ width: width * 0.9, marginTop: 15, marginBottom: 15 }}>
                        <SimpleDetail lable={'班级名称：'} value={this.state.data.name} />
                        <SimpleDetail lable={'班级号：'} value={this.state.data.code} />
                        <SimpleDetail lable={'成员数量：'} value={this.state.data.num} />
                    </View>
                </View>
                <TitleDetail title='成员信息' />
                <FlatList
                    data={this.state.data.student}
                    keyExtractor={(item, index)=>`${item.id}-${index}`}
                    renderItem={({item, separators}) => (
                        <View style={{flex:1,flexDirection:'row',justifyContent:"space-between",alignItems:'center',marginBottom:2,backgroundColor:"#fff",paddingRight:10}}>
                            <View style={{paddingLeft:10,flexDirection:'row',justifyContent:"center",alignItems:'center',height: 50,}}>
                                <Image source={images.nan} style={{height: 40, width: 40}} resizeMode="contain" />
                                <Text style={{paddingLeft:10,color:"#5FDA21"}}>{item.name}</Text>
                            </View>
                            <Text >{item.phone}</Text>
                        </View>
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
