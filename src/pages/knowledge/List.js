/**
 * 知识库
 */
import React from 'react';
import {View,Text,FlatList,Image, TouchableOpacity,StyleSheet,BackHandler} from "react-native";
import TitleBar from '../../common/TitleBar'
import Icon from '../../resource/icon/Iconfont'
import SimpleList from '../../common/List'
import {width} from '../../common/AdapterUtil'
import api from '../../api/index'
import Config from '../../api/Config'


export default class Growth extends React.Component{
    _isRefreshing = false;
    _isFooter=false
    _isload=false
    constructor(props){
        super(props)
        this.state = {
            title:'知识库',
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
        this._isload=true
        this._isRefreshing=true
        that=this
        api.post(Config.service.filelist,{}).then((ret)=>{
            that._isload=false
            if (ret.errcode === 0) {
                this._isRefreshing=false
                page = ret.data.currPage
                totalPage = ret.data.totalPage
                if(page>=totalPage){
                    this._isFooter=true
                }
                if(page===1){
                    data = ret.data.list;
                }else{
                    data = [...this.state.data, ...ret.data.list];
                }
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
            <TitleBar title={this.state.title} navigation={this.props.navigation}/>
            
            <SimpleList 
                onRefresh={()=>this.onRefresh()}
                refreshing={this._isRefreshing}
                onEndReached={()=>this.onEndReached()}
                isFooter={this._isFooter}
                data={this.state.data}
                renderItem={(item) => (
                    <View style={[{flex: 1,flexDirection:'row',justifyContent:'center',
                    backgroundColor: '#fff',borderBottomWidth:1,borderBottomColor:'#ebebeb',marginTop:10}]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('KnowledgeDetail',{item:item })}}>
                            <View style={{flexDirection:'column',justifyContent:'center',width:width,height:70,pandingTop:20}}>
                                <Text style={{marginTop:5,marginLeft:10,fontSize:20,color:'#000'}}>{item.accessory_name}</Text>
                                <View style={{marginTop:5,flex: 1,width:width*0.95,flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{marginLeft:10}}><Icon name={'yonghu1'} size={20} color={'#bfbfbf'}/> {item.create_user}</Text>
                                    <Text style={{marginLeft:10}}><Icon name={'yonghu1'} size={20} color={'#bfbfbf'}/> {item.create_time}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                 )}
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
