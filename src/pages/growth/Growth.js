/**
 * 成长册
 */
import React from 'react';
import {View,Text,FlatList,Image, TouchableOpacity,StyleSheet,BackHandler} from "react-native";
import TitleBar from '../../common/TitleBar'
import images from '../../common/image'
import SimpleList from '../../common/List'
import {width} from '../../common/AdapterUtil'
import api from '../../api/index'
import Config from '../../api/Config'

class Groethitem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {item} = this.props;
        return (
            <View style={{backgroundColor: '#F5F5F5'}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',margin: 5}}>
                    <Image source={images.nv} style={{justifyContent: "center", height: 50, width: 50}} resizeMode="contain"></Image>
                    <View style={{flexDirection:'column',marginLeft: 5}}>
                        <Text style={styles.font12}>{item.username}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.font12}>{item.growup_time}</Text>
                            <Text style={[styles.font12,{color:'#A6A6A6',marginLeft: 5}]}>{item.classes}</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom:10}}>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>{this.props.navigation.navigate('GrowthDetail',{item:item })}}>
                    <View style={{alignItems:'center'}}>
                        <Image source={{uri:global.base+'image/'+item.accessory_name}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height: 250, width:width*0.95}} resizeMode="contain"></Image>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default class Growth extends React.Component{
    _isRefreshing = false;
    _isFooter=false
    _isload=false
    constructor(props){
        super(props)
        this.state = {
            title:'成长册',
            data:[],
            page:1,
            start:0,
            limit:10
        }
    }
    componentWillMount(){
        this.subs = [this.props.navigation.addListener('didFocus', () => this.initList()),];
    }
    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }
    initList(){
        let params={
            roleId:global.USERINFO.roleId,
            gradeId: global.USERINFO.gradeClassId,
            userId:global.USRID,
            page:this.state.page,
            limit:this.state.limit
        }
        this._isload=true
        this._isRefreshing=true
        that=this
        api.post(Config.service.growthList,params).then((ret)=>{
            that._isload=false
            if (ret.errcode === 0) {
                this._isRefreshing=false
                page = ret.data.currPage
                totalPage = ret.data.totalPage
                if(page>=totalPage){
                    this._isFooter=true
                }
                console.log(11111)
                data = [...this.state.data, ...ret.data.list];
                this.setState({
                    data: data,
                    page: page+1
                })
            }
        })
    }
    onRefresh(){
        this.setState({
            data:[],
            page:1,
            start:0,
        }, () => {
            this.initList()
        })
    }
    onEndReached(){
        let length = this.state.data.length;
        if (length < this.state.total) {
            this.setState({
                start:this.state.start+this.state.limit,
            }, () => {
                this.initList()
            })
        }else{
            this._isload=true
        }
    }
    render(){
        return (
          <View style={styles.container}>
            <TitleBar title={this.state.title} navigation={this.props.navigation} hideLeftArrow={true}
                rightBtn={[{
                    right:'新增',
                    onPress:()=>{
                        this.props.navigation.navigate('GrowthAdd',{callback: (ret) => this.onRefresh() })
                    }
                }]}
            />
            <SimpleList 
                onRefresh={()=>this.onRefresh()}
                refreshing={this._isRefreshing}
                onEndReached={()=>this.onEndReached()}
                isFooter={this._isFooter}
                data={this.state.data}
                renderItem={(item) => ( <Groethitem item={item} navigation={this.props.navigation}></Groethitem> )}
            />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    font12:{
        fontSize:12
    }
})
