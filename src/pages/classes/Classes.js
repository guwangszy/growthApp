/**
 * 班级页面
 */
import React from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
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
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:12}}>
                <TouchableOpacity onPress={()=>{console.log(this.props.item.id);this.props.navigation.navigate('ClassDetail',{id:this.props.item.id})}}>
                    <View style={{flexDirection:'column',justifyContent:'center',
                    backgroundColor:'#FEFEFE',height:70,width:width*0.95}}>
                        <View style={{height:100,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:10}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name={'banjizhuye'} size={40} color={'#4AB567'}></Icon>
                                <View style={{flexDirection:'column',marginLeft:10}}>
                                    <Text>{this.props.item.name}</Text>
                                    <View style={{flexDirection:'row',marginTop:8}}>
                                        <Text style={{color:'#A6A6A6'}}>班级号：{this.props.item.code}</Text>
                                        <Text style={{color:'#A6A6A6',marginLeft:12}}>成员：{this.props.item.num}</Text>
                                    </View>
                                </View>
                            </View>
                            <Icon name={'xiangyou'} size={20} color={'#bfbfbf'}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default class Classes extends React.Component{
    _isRefreshing = false;
    _isFooter=false
    constructor(props){
        super(props)
        this.state={
            title:'班级',
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
        api.post(Config.service.classList,params).then((ret)=>{
            if (ret.errcode === 0) {
                _isRefreshing=false
                page = ret.data.myself.page
                total = ret.data.myself.total
                if(total/this.state.pageSize === page || !ret.data.myself.data){
                    this._isFooter=true
                }
                this.setState({
                    myself:ret.data.myself.list,
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
                <TitleBar title={this.state.title} navigation={this.props.navigation} hideLeftArrow={true} />
                <Dashedbtn width={width*0.9} onPress={() => this.toAddClasses()} text={'新建班级'}/>
                <View style={{marginTop:20}}>
                    <Text style={{marginLeft:10}}>我创建的</Text>
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
    }
})