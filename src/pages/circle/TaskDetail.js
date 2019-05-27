/**
 * 任务详情
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,ScrollView,TextInput,document} from 'react-native'
import Video from 'react-native-video'
import TitleBar from '../../common/TitleBar'
import Icon from 'react-native-vector-icons/Ionicons';
import {width} from '../../common/AdapterUtil'
import images from '../../common/image'
import Config from '../../api/Config';
import api from '../../api/index';
export default class TaskDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            titles:'详情',
            paused:false,
            rate:1.0,
            id:'',
            username:'',
            title:'',
            time:'',
            content:'',
            commentList:[]
        }
    }
    componentWillMount(){
        let item=this.props.navigation.state.params.item
        api.post(Config.service.growthFiles, {
            fkId:item.id
        }).then((ret) => {
            if (ret.errcode === 0) {
                this.setState({
                    adviceId:item.id,
                    username:item.create_user,
                    content:item.content,
                    title:item.title,
                    time:item.create_time,
                    istask:item.frequency||item.doneContent||item.frequency===0?true:false,
                    commentList:item.commentList,
                    files:ret.data.list
                })
            } else {
                this.setState({
                    adviceId:item.id,
                    username:item.create_user,
                    content:item.content,
                    title:item.title,
                    time:item.create_time,
                    istask:item.frequency||item.doneContent||item.frequency===0?true:false,
                    commentList:item.commentList
                })
            }
        })
    }

    render(){
        return (
            <View style={[styles.container]}>
                {this.state.istask?(<TitleBar title={this.state.titles} navigation={this.props.navigation}
                 rightBtn={[{
                    right:'完成任务',
                    onPress:()=>{
                        this.props.navigation.navigate('FinishTask',{adviceId:this.state.adviceId})
                    }
                }]}
                />):(<TitleBar title={this.state.title} navigation={this.props.navigation} />)}
                <ScrollView>
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'column',justifyContent:'center',marginTop:20,width:width*0.98,}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:20}}>{this.state.title} </Text><View style={styles.triangle}><Text style={{color:'#fff'}}>{this.state.istask?'打卡':'通知'}</Text></View>
                            </View>
                            <Text style={{fontSize:14,color:'#B3B3B3'}}>{this.state.username}   {this.state.time}</Text>
                            <Text style={{fontSize:16}}>{this.state.content}</Text>
                        </View>
                    </View>
                    {this.state.files&&this.state.files.length>0?(
                        <FlatList
                            data={this.state.files}
                            keyExtractor={(item, index)=>`${item.id}-${index}`}
                            renderItem={({item, separators}) => (
                                <View style={{marginTop:10,marginBottom:10,flexDirection:'row',justifyContent:'center',width:width}}>
                                    {item.accessory_suffix=="mp4"?(
                                        <Video source={{uri: global.base+'image/'+item.accessory_name, mainVer: 1, patchVer: 0}}
                                            ref={ref => this.player = ref}
                                            rate={this.state.rate} // 进度
                                            volume={1.0} //0静音，1正常
                                            muted={false} //完全静音音频
                                            paused={this.state.paused} //完全暂停播放
                                            resizeMode="cover"  // 以纵横比填充整个屏幕。*
                                            repeat={true} // 永远重复
                                            playInBackground={false}
                                            playWhenInactive={false}
                                            ignoreSilentSwitch={"ignore"}
                                            progressUpdateInterval={250.0}
                                            onLoadStart={(data) => {console.log('this.loadStart()',data)}}
                                            onLoad={data => {console.log('this.setDuration(data)',data)}}
                                            onProgress={(data) => {console.log('this.setTime(data)',data)}}
                                            onEnd={(data) => {console.log('this.onEnd(data)',data)}}
                                            onError={(data) => {console.log('this.videoError(data)',data)}}
                                            onBuffer={(data) => {console.log('this.onBuffer(data)',data)}}
                                            onTimedMetadata={(data) => {console.log('this.onTimedMetadata(data)',data)}}
                                            style={[styles.videoPlayer]}
                                        />
                                    ):(
                                        <Image source={{uri:global.base+'image/'+item.accessory_name}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height: 250, width:width*0.95}} resizeMode="cover"></Image>
                                     )}
                                </View>
                            )}
                        />
                    ):null}
                    {this.state.commentList&&this.state.commentList.length>0?(
                        <View style={{flexDirection:'column'}}>
                        <Text style={{marginTop:10,marginLeft:10,fontSize:14,}}>留言板</Text>
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
                    ):null}
                    
                </View>
                </ScrollView>
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
    videoPlayer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height: 200,
        width:width*0.95
    }
})
