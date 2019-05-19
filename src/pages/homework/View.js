/**
 * 作业详情
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,TextInput,document} from 'react-native'
import TitleBar from '../../common/TitleBar'
import {width} from '../../common/AdapterUtil'
import images from '../../common/image'
import {SmallBtn} from '../../common/form/Buttons'
import api from '../../api/index'
import Config from '../../api/Config'

export default class TaskDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            titles:'作业详情',
            replyShow:false,
            id:'',
            username:'',
            time:'',
            content:'',
            commentList:[]
        }
    }
    componentWillMount(){
        let item=this.props.navigation.state.params.item
        this.setState({
            fkId:item.id,
            username:item.username,
            accessory_name:item.accessory_name,
            content:item.done_content,
            title:item.title,
            time:item.create_time,
            commentList:item.commentList
        })
    }
    saveReact(){
        let _this= this
        if(this.state.reply){
            var params={
                issueId:this.state.fkId,
                userId:global.USRID,
                type:2,
                commentContent:this.state.reply
            }
            api.post(Config.service.addReply,params).then((ret)=>{
                if(ret.errcode === 0){
                    let reply=[{
                        "id": this.state.fkId,
                        "username": global.USERINFO.username,
                        "commentContent": _this.state.reply
                    }]
                    let comment=_this.state.commentList
                    _this.state.commentList=[...comment,...reply]
                    
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
            <View style={[styles.container]}>
                <TitleBar title={this.state.titles} navigation={this.props.navigation} 
                    rightBtn={[{
                        right:'修改',
                        onPress:()=>{
                            this.props.navigation.navigate('HomeworkEdit',{item:this.state,callback: (ret) => this.onRefresh() })
                        }
                    }]}
                />
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'column',justifyContent:'center',marginTop:20,width:width*0.98,}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.triangle}><Text style={{color:'#fff'}}>作业</Text></View><Text style={{fontSize:14,color:'#B3B3B3'}}>   {this.state.username}   {this.state.time}</Text>
                            </View>
                            <Text style={{fontSize:16}}>{this.state.content}</Text>
                            <View style={{alignItems:'center',marginBottom:5 ,padding:10,backgroundColor:'#F0F1F5'}}>
                                <Image source={{uri:global.base+'image/'+this.state.accessory_name}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height: 250, width:width*0.95}}></Image>
                            </View>
                        </View>
                    </View>
                        <View style={{flexDirection:'column'}}>
                        <View  style={{flexDirection:'row',justifyContent: 'space-between',width:width*0.95}}>
                            <Text style={{marginTop:10,marginLeft:10,fontSize:14,}}>留言板</Text>
                            {global.USERINFO.roleId===1?(<TouchableOpacity onPress={()=>this.setState({ replyShow: true })}>
                                <Text style={{marginTop:10,marginLeft:10,fontSize:14,}}>写留言</Text>
                            </TouchableOpacity>):null}
                        </View>
                        
                        <FlatList
                            data={this.state.commentList}
                            keyExtractor={(item, index)=>`${item.id}-${index}`}
                            renderItem={({item, separators}) => (
                                <View style={{marginTop:10,flexDirection:'row',justifyContent:'flex-start',width:width}}>
                                    <Image  source={images.nv} style={{justifyContent: "center", height: 50, width: 50,marginLeft: 5}} resizeMode="contain"></Image>
                                    <View style={{marginLeft:5,marginTop:5,width:width*0.85}}>
                                        <Text style={{color:'#727272'}}>{item.username}</Text>
                                        <Text>{item.commentContent}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
                {this.state.replyShow?this._replyView():null}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F1F5',
    },
    InputBox: {
        width: width,
        backgroundColor: '#fff',
        marginBottom: 5
    },
    triangle:{
        width: 40,
        height: 20,
        backgroundColor:'#4AB567',
        borderRadius:20,
        alignItems:'center',
        
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
