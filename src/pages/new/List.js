/**
 * 消息列表
 */
import React from 'react';
import {View,Text,FlatList,Image, TouchableOpacity,StyleSheet,BackHandler} from "react-native";
import TitleBar from '../../common/TitleBar'
import images from '../../common/image'
import SimpleList from '../../common/List'
import {width} from '../../common/AdapterUtil'
import api from '../../api/index'
import Config from '../../api/Config'

class Items extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {item} = this.props;
        return (
            <View style={{backgroundColor: '#F5F5F5'}}>
                <View style={{marginBottom:5 ,padding:10,backgroundColor:'#DCDCDC'}}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>{this.props.navigation.navigate('NewView',{item:item })}}>
                        <View style={{alignItems:'flex-start'}}>
                            <Image source={{uri:global.base+'image/'+item.accessory_name}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height: 250, width:width*0.95}} resizeMode="cover"></Image>
                            <View style={{position:"absolute",justifyContent:'center',bottom:0,backgroundColor:'rgba(0,0,0,0.5)',height:30,width:width*0.95}}>
                                <Text style={{left:10,color:'#fff'}}>{item.headline}</Text>
                            </View>
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
            title:'消息列表',
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
        api.post(Config.service.newlist,params).then((ret)=>{
            that._isload=false
            if (ret.errcode === 0) {
                this._isRefreshing=false
                page = ret.data.currPage
                totalPage = ret.data.totalPage
                if(page>=totalPage){
                    this._isFooter=true
                }
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
            <TitleBar title={this.state.title} navigation={this.props.navigation} hideLeftArrow={true}/>
            <SimpleList 
                onRefresh={()=>this.onRefresh()}
                refreshing={this._isRefreshing}
                onEndReached={()=>this.onEndReached()}
                isFooter={this._isFooter}
                data={this.state.data}
                renderItem={(item) => ( <Items item={item} navigation={this.props.navigation}></Items> )}
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
