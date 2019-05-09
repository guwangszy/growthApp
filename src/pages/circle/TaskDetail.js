/**
 * 任务详情
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,TextInput,document} from 'react-native'
import TitleBar from '../../common/TitleBar'
import {width} from '../../common/AdapterUtil'
import images from '../../common/image'

export default class TaskDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'详情',
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
        console.log(item)
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
    render(){
        return (
            <View style={[styles.container]}>
                {this.state.istask?(<TitleBar title={this.state.title} navigation={this.props.navigation}
                 rightBtn={[{
                    right:'完成任务',
                    onPress:()=>{
                        this.props.navigation.navigate('FinishTask',{adviceId:this.state.adviceId})
                    }
                }]}
                />):(<TitleBar title={this.state.title} navigation={this.props.navigation} />)}
                
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'column',justifyContent:'center',marginTop:20,width:width*0.98,}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:20}}>{this.state.title}</Text><View style={styles.triangle}><Text style={{color:'#fff'}}>{this.state.istask?'打卡':'通知'}</Text></View>
                            </View>
                            <Text style={{fontSize:14,color:'#B3B3B3'}}>{this.state.username}   {this.state.time}</Text>
                            <Text style={{fontSize:16}}>{this.state.content}</Text>
                        </View>
                    </View>
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
        
    }
})
