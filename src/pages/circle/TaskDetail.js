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
        }
    }
    render(){
        return (
            <View style={[styles.container]}>
                <TitleBar title={this.state.title} navigation={this.props.navigation}
                 rightBtn={[{
                    right:'完成任务',
                    onPress:()=>{
                        this.props.navigation.navigate('FinishTask')
                    }
                }]}
                />
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'column',justifyContent:'center',width:width*0.98,}}>
                            <Text style={{fontSize:18}}>标题</Text>
                            <Text style={{fontSize:14,color:'#B3B3B3'}}>作者 时间</Text>
                            <Text style={{fontSize:16,textIndent:25}}>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10,marginBottom:10,width:width*0.98,justifyContent:'space-between'}}>
                            <Text style={{fontSize:14,color:'#B3B3B3'}}>阅读 78454</Text>
                            <Text style={{fontSize:14,color:'#B3B3B3'}}>点赞 5682</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{marginTop:10,marginLeft:10,fontSize:14,}}>留言板</Text>
                        <View style={{marginTop:10,flexDirection:'row',justifyContent:'flex-start',width:width}}>
                            <Image  source={images.nv} style={{justifyContent: "center", height: 50, width: 50,marginLeft: 5}} resizeMode="contain"></Image>
                            <View style={{marginLeft:5,marginTop:5,width:width*0.85}}>
                                <Text style={{color:'#727272'}}>名称</Text>
                                <Text>名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称</Text>
                            </View>
                        </View>
                        <View style={{marginTop:10,flexDirection:'row',justifyContent:'flex-start',width:width}}>
                            <Image  source={images.nv} style={{justifyContent: "center", height: 50, width: 50,marginLeft: 5}} resizeMode="contain"></Image>
                            <View style={{marginLeft:5,marginTop:5,width:width*0.85}}>
                                <Text style={{color:'#727272'}}>名称</Text>
                                <Text>ahahjahsfahfhashfahsfasasdhasjkfdhasjkdfhakjsdhfajksdhfa jsdfhajksdfh</Text>
                            </View>
                        </View>
                        <View style={{marginTop:10,flexDirection:'row',justifyContent:'flex-start',width:width}}>
                            <Image  source={images.nv} style={{justifyContent: "center", height: 50, width: 50,marginLeft: 5}} resizeMode="contain"></Image>
                            <View style={{marginLeft:5,marginTop:5,width:width*0.85}}>
                                <Text style={{color:'#727272'}}>名称</Text>
                                <Text>名称</Text>
                            </View>
                        </View>
                    </View>
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
})
