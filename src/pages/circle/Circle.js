/**
 * 班级圈
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,TextInput,TouchableWithoutFeedback} from 'react-native'
import TitleBar from '../../common/TitleBar';
import SimpleList from '../../common/List'
import {width} from '../../common/AdapterUtil'
import {SmallBtn} from '../../common/form/Buttons'
import Utils from '../../common/Utils'
import api from '../../api/index'
import Config from '../../api/Config'
import images from '../../common/image'
import Icon from '../../resource/icon/Iconfont'



class ListItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            content:""
        }
    }
    toOperation(type,id,index){
        this.props.onPress(type,id,index);
    }
    render(){
        const {item,index} = this.props
        return (
            <View style={[styles.container,{flexDirection:'row',justifyContent:'flex-start',marginBottom: 15}]}>
                <Image  source={images.nv} style={{justifyContent: "center", height: 50, width: 50,marginLeft: 5}} resizeMode="contain"></Image>
                <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('TaskDetail',{item:this.props.item})}}>
                    <View style={{width:width*0.8,flexDirection:'column',marginTop: 20,marginLeft: 5}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-start'}}><Text style={{fontSize:12}}>{item.classes}{item.username}</Text></View>
                        <View style={{borderRadius:10,borderWidth:1,borderColor:'#8DBE4E',backgroundColor:'#FBFBFB',padding: 10}}>
                            <Text style={{fontSize:18}}>{item.title}</Text>
                            <Text style={{fontSize:16}}>{item.doneContent?item.doneContent:item.content}</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 10,alignItems:'center'}}>
                                <Text style={{fontSize:10}}>{item.time}</Text>
                                <View style={{flexDirection:'row'}}>
                                    {/* <TouchableOpacity activeOpacity={0.6} onPress={()=>this.toOperation(1,item.id,index)}>
                                    <View style={{flexDirection:'row',alignItems:'center',marginRight: 10}}>
                                        <Icon name={item.read?'yikan':'chakan'} size={20} color={'#8DBE4E'}></Icon>
                                        <Text style={{fontSize:10}}>已阅</Text>
                                    </View>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.toOperation(2,item.id,index)}>
                                    <View style={{flexDirection:'row',alignItems:'center',marginRight: 10}}>
                                        <Icon name={item.num>0?'yizan':'dianzan'} size={20} color={'#8DBE4E'}></Icon>
                                        <Text style={{fontSize:10}}>点赞</Text>
                                    </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.toOperation(3,item.id,index)}>
                                        <View style={{flexDirection:'row',alignItems:'center',marginRight: 10}}>
                                            <Icon name={'pinglun'} size={20} color={'#8DBE4E'}></Icon>
                                            <Text style={{fontSize:10}}>评论</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {item.commentList.length>0?(<View style={{padding:5,flex:1,flexDirection:'row',justifyContent:'space-between',marginTop: 10,alignItems:'center',backgroundColor:'#E7E7E7'}}>
                                <FlatList
                                    data={item.commentList}
                                    keyExtractor={(item, index)=>`${item.id}-${index}`}
                                    renderItem={({item, separators}) => (
                                        <View style={{flex:1,flexDirection:'row',alignSelf:'flex-start',marginBottom:5,fontSize:12}}>
                                            <Text style={{color:"#5FDA21"}}>{item.username}: <Text style={{color:"#000"}}>{item.commentContent}</Text></Text>
                                        </View>
                                    )}
                                />
                            </View>):null}
                            
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

export default class Circle extends React.Component{
    _isRefreshing = false;
    _isFooter=false
    _isload=false
    constructor(props){
        super(props)
        this.state={
            title:'班级圈',
            replyShow:false,
            reply:"",
            index:0,
            circleId:"",
            data:[],
            page:1,
            start:0,
            limit:10,
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
            gradeId: global.USERINFO.gradeClassId,
            userId:global.USRID,
            page:this.state.page,
            limit:this.state.limit
        }
        this._isload=true
        this._isRefreshing=true
        api.post(Config.service.circleList,params).then((ret)=>{
            this._isload=false
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
        }, () => {
            this.initList()
        })
    }
    onEndReached(){
        if(!this._isload){
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
    }
    /**
     * 回复
     */
    toReply(type,id,index){
       let _this =this
       if(type=== 3){ //评论
        // 显示评论框
        this.setState({
            replyShow:true,
            index:index,
            circleId:id,
            reply:''
        })
       }else if(type === 2){ // 点赞
        let params={
            issueId:id,
            type:1,
            userId:global.USRID,
        }
        api.post(Config.service.dianzan,params).then((ret)=>{
            if(ret.errcode === 0){
                _this.state.data[index].num=1
                _this.setState({
                    circleId:'',
                    data:_this.state.data
                })
                Utils.showToast("点赞成功！")
            }
        })
       }
    }
    saveReact(){
        let _this= this
        if(this.state.reply){
            var params={
                issueId:this.state.circleId,
                userId:global.USRID,
                type:2,
                commentContent:this.state.reply
            }
            api.post(Config.service.addReply,params).then((ret)=>{
                if(ret.errcode === 0){
                   
                    let reply=[{
                        "id": this.state.circleId,
                        "username": global.USERINFO.username,
                        "commentContent": _this.state.reply
                    }]
                    let comment=_this.state.data[_this.state.index].commentList
                    _this.state.data[_this.state.index].commentList=[...comment,...reply]
                    
                    _this.setState({
                        circleId:'',
                        replyShow:false,
                        data:_this.state.data
                    })
                    Utils.showToast("提交成功！")
                }
            })
        }else{
            _this.setState({
                circleId:'',
                replyShow:false
            })
        }
    }
    _replyView(){
        return (
            <View style={styles.replyBox}>
                <TextInput
                    style={{width:width*0.81,height: 40,backgroundColor:'#fff',borderRadius: 3, borderColor: '#fff', borderWidth: 2}}
                    onChangeText={(text) => this.setState({reply:text})}
                    value={this.state.reply}
                />
                <SmallBtn style={styles.btn} width={50} onPress={() => this.saveReact()} text={this.state.reply?'提交':'取消'}/>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container} >
                <TitleBar title={this.state.title} navigation={this.props.navigation} hideLeftArrow={true} />
                {global.USERINFO.roleId===1?(
                    <View style={styles.iconBtnBox}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() =>this.props.navigation.navigate('AddNotice',{type:1})}>
                        <View style={{flexDirection:'column',alignItems:'center'}}>
                                <View style={styles.iconBtn}>
                                    <Icon name={'tongzhi'} size={15} color={'#8DBE4E'}></Icon>
                                </View>
                                <Text>通知</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() =>this.props.navigation.navigate('AddNotice',{type:2})}>
                        <View style={{flexDirection:'column',alignItems:'center'}}>
                            <View style={styles.iconBtn}>
                                <Icon name={'daka'} size={15} color={'#8DBE4E'}></Icon>
                            </View>
                            <Text>打卡</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    ):(
                    <View style={styles.iconBtnBox}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() =>this.props.navigation.navigate('TaskList')}>
                            <View style={{flexDirection:'column',alignItems:'center'}}>
                                <View style={styles.iconBtn}>
                                    <Icon name={'banjitongzhi'} size={20} color={'#8DBE4E'}></Icon>
                                </View>
                                <Text>任务</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    )}
                {this.state.replyShow?this._replyView():null}
                <SimpleList 
                    style={{marginBottom:120}}
                    onRefresh={()=>this.onRefresh()}
                    refreshing={this._isRefreshing}
                    onEndReached={()=>this.onEndReached()}
                    isFooter={this._isFooter}
                    data={this.state.data}
                    renderItem={(item,index) => ( <ListItem item={item} index={index} onPress={(type,id,index)=>this.toReply(type,id,index)} navigation={this.props.navigation}/> )}
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
    btn: {
        justifyContent:'center',
        alignItems: "center", 
        backgroundColor:"#4AB567" , 
        width: width * 0.8,
        borderRadius: 5,
        height: 35,
        lineHeight: 35
    },
    iconBtnBox:{
        width:width,height:80,
        flexDirection:'row',
        justifyContent:'space-around', 
        alignItems:'center',
        backgroundColor:'#FFF'
    },
    iconBtn:{
        width:35,
        height:35,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:40,
        borderWidth:1,
        borderColor:'#8DBE4E',
        marginBottom: 5
    },
    replyBox:{
        width:width,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#E5E5E5',
        zIndex:9999,
        position:'absolute',
        bottom:0,
        padding:5
    }
})
