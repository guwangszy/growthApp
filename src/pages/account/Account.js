/**
 * 账号页面
 */
import React from 'react'
import {View,Text,Image,ScrollView,StyleSheet,TouchableOpacity} from "react-native";
import {SimpleBtn} from '../../common/form/Buttons'
import images from '../../common/image'
import Icon from '../../resource/icon/Iconfont'
import {width} from '../../common/AdapterUtil'
import console = require('console');

class Listitem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View style={[{flex: 1,flexDirection:'row',justifyContent:'center',
            backgroundColor: '#fff'},this.props.showBorder?{borderBottomWidth:1,borderBottomColor:'#ebebeb'}:{}]}>
                <TouchableOpacity onPress={this.props.onPress?this.props.onPress():()=>{}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',
                    alignItems: "center",height:50,width:width*0.95}}>
                        {this.props.icon?(<Icon name={this.props.icon} size={20} color={'#4AB567'}/>):null}
                        <View style={{flex: 1,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{marginLeft:10}}>{this.props.text}</Text>
                            {this.props.subtext?(<Text style={{marginLeft:10}}>{this.props.subtext}</Text>):null}
                        </View>
                        {this.props.onPress?(<Icon name={'xiangyou'} size={20} color={'#bfbfbf'}/>):null}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default class Account extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    /**
     * 完善信息
     */
    toUpUser(){

    }
    /**
     * 修改密码
     */
    toPassw(){

    }
    /**
     * 跳转班级
     */
    toClass(){
        console.log('1111111111')
        this.props.navigation.navigate('班级')
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{height:180,backgroundColor:'#4AB567',flexDirection:"row", alignItems: "center",}}>
                    <View style={{marginLeft: 20,marginTop: 20,flexDirection:"row",justifyContent: "center", alignItems: "center"}}>
                        <Image source={images.nv} style={{justifyContent: "center", height: 100, width: 100}} resizeMode="contain" />
                        <View style={{marginTop: 15,marginLeft: 20,flexDirection:"column"}}>
                            <View style={{flexDirection:"row",alignItems: "center"}}>
                                <Text style={{fontSize:18,color:'#fff'}}>张无忌</Text>
                                <View style={{borderRadius:20,marginLeft: 20,width:50, backgroundColor:'red',alignItems: "center"}}>
                                    <Text style={{color:'#fff'}}>教师</Text>
                                </View>  
                            </View>
                            <View style={{marginTop: 5}}><Text style={{color:'#fff'}}>13574194350</Text></View>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <Listitem showBorder={true} icon={'yonghu1'} text={'完善信息'} onPress={()=>this.toUpUser()}></Listitem>
                        <Listitem showBorder={true} icon={'xiugaimima'} text={'修改密码'} onPress={()=>this.toPassw()}></Listitem>
                    </View>
                    <View style={{marginTop:20}}>
                        <Listitem showBorder={true} icon={'banjizhuye'} text={'我的班级'} onPress={()=>this.toClass()}></Listitem>
                        <Listitem icon={'banben'} text={'版本信息'} subtext={'v. '+global.appVersion}></Listitem>
                    </View>
                    <SimpleBtn onPress={() => this.submit()} text={'退出'}/>
                </ScrollView>
            </View>
        ) 
    }
} 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
})
