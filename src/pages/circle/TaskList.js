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
                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('TaskDetail',{item:this.props.item})}}>
                    <View style={{flexDirection:'column',justifyContent:'center',
                    backgroundColor:'#FEFEFE',height:50,width:width}}>
                        <View style={{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:10}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.triangle}><Text style={{color:'#fff'}}>{this.props.item.frequency||this.props.item.frequency===0?'打卡':'通知'}</Text></View>
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
            title:'列表',
            data:[],
            page:1,
            limit:10
        }
    }
    componentWillMount(){
        this.subs = [this.props.navigation.addListener('didFocus', () => this.initList()),];
    }
    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }
    // 初始化数据
    initList(){
        let data = this.props.navigation.state.params;
        let params={
            userId:global.USRID,
            gradeId: global.USERINFO.gradeClassId,
            type:data.type,
            page:this.state.page,
            limit:this.state.limit
        }
        _isRefreshing=true
        api.post(Config.service.tasklist,params).then((ret)=>{
            if (ret.errcode === 0) {
                _isRefreshing=false
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
                    data:data,
                    page:page+1
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
    render(){
        return (
            <View style={styles.container}>
                <TitleBar title={(this.props.navigation.state.params.type===1?'通知':'打卡')+this.state.title} navigation={this.props.navigation} />
                <View>
                    <SimpleList
                        onRefresh={()=>this.onRefresh()}
                        refreshing={this._isRefreshing}
                        onEndReached={()=>{}}
                        isFooter={this._isFooter}
                        data={this.state.data}
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