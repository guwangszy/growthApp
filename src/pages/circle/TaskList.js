/**
 * 班级页面
 */
import React from 'react'
import {View,Text,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import TitleBar from '../../common/TitleBar'
import Icon from '../../resource/icon/Iconfont'
import {width} from '../../common/AdapterUtil'
import {Dashedbtn} from '../../common/form/Buttons'
import SimpleList from '../../common/List'
import api from '../../api/index'
import Config from '../../api/Config'
class ClassListItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:12}}>
                <Text style={{color:'#B6B6B6'}}>{this.props.item.time}</Text>
                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('TaskDetail',{id:this.props.item.id})}}>
                    <View style={{flexDirection:'column',justifyContent:'center',
                    backgroundColor:'#FEFEFE',height:50,width:width}}>
                        <View style={{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:10}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={styles.triangle}><Text style={{color:'#fff'}}>打卡</Text></View>
                                <View style={{flexDirection:'column',marginLeft:10}}>
                                    <Text>{this.props.item.title}</Text>
                                </View>
                            </View>
                            <Icon name={'xiangyou'} size={20} color={'#bfbfbf'}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
export default class TaskList extends React.Component{
    _isRefreshing = false;
    _isFooter=false
    constructor(props){
        super(props)
        this.state={
            title:'任务列表',
            myself:[],
            page:1,
            pageSize:10
        }
    }
    componentWillMount(){
        this.initList(1);//初始化列表数据
    }
    // 初始化数据
    initList(page){
        let params={
            userId:global.USRID,
            page:page
        }
        _isRefreshing=true
        api.post(Config.service.tasklist,params).then((ret)=>{
            if (ret.errcode === 0) {
                _isRefreshing=false
                page = ret.data.list.page
                total = ret.data.list.total
                if(total/this.state.pageSize === page || !ret.data){
                    this._isFooter=true
                }
                this.setState({
                    myself:ret.data.list,
                    page:page+1
                })
            }
        })
    }
    /**
     * 跳转添加班级
     */
    toAddClasses(){
        this.props.navigation.navigate('ClassAdd', { callback: (ret) => this.initList() });
    }
    onRefresh(){
        this.initList(1)
    }
    render(){
        return (
            <View style={styles.container}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} />
                <View>
                    <SimpleList
                        onRefresh={()=>this.onRefresh()}
                        refreshing={this._isRefreshing}
                        onEndReached={()=>{}}
                        isFooter={this._isFooter}
                        data={this.state.myself}
                        renderItem={(item) => (<ClassListItem item ={item} navigation={this.props.navigation} />  )}
                    /> 
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F1F5',
    },
    triangle:{
        width: 40,
        height: 20,
        backgroundColor:'#4AB567',
        borderRadius:20,
        alignItems:'center',
        
    }
})