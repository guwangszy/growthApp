/**
 * 班级圈
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList} from 'react-native'
import TitleBar from '../../common/TitleBar';
import {width} from '../../common/AdapterUtil'
import images from '../../common/image'
import Icon from '../../resource/icon/Iconfont'



class ListItem extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return (
            <View style={[styles.container,{flexDirection:'row',justifyContent:'flex-start',marginTop: 15}]}>
                <Image  source={images.nv} style={{justifyContent: "center", height: 50, width: 50,marginLeft: 5}} resizeMode="contain"></Image>
                <View style={{width:width*0.8,flexDirection:'column',marginTop: 20,marginLeft: 5}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-start'}}><Text style={{fontSize:12}}>四班张三丰</Text></View>
                    <View style={{borderRadius:10,borderWidth:1,borderColor:'#8DBE4E',backgroundColor:'#FBFBFB',padding: 10}}>
                        <Text style={{fontSize:18}}>标题标题</Text>
                        <Text style={{fontSize:16}}>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 10,alignItems:'center'}}>
                            <Text style={{fontSize:10}}>1小时前</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flexDirection:'row',alignItems:'center',marginRight: 10}}>
                                    <Icon name={'chakan'} size={20} color={'#8DBE4E'}></Icon>
                                    <Text style={{fontSize:10}}>已阅</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',marginRight: 10}}>
                                    <Icon name={'dianzan'} size={20} color={'#8DBE4E'}></Icon>
                                    <Text style={{fontSize:10}}>点赞</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',marginRight: 10}}>
                                    <Icon name={'pinglun'} size={20} color={'#8DBE4E'}></Icon>
                                    <Text style={{fontSize:10}}>评论</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default class Circle extends React.Component{
    _keyExtractor = (item, index) => item.id;
    constructor(props){
        super(props)
        this.state={
            title:'班级圈',
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} hideLeftArrow={true} />
                <View style={styles.iconBtnBox}>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <View style={styles.iconBtn}>
                            <Icon name={'tongzhi'} size={15} color={'#8DBE4E'}></Icon>
                        </View>
                        <Text>通知</Text>
                    </View>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <View style={styles.iconBtn}>
                            <Icon name={'daka'} size={15} color={'#8DBE4E'}></Icon>
                        </View>
                        <Text>打卡</Text>
                    </View>
                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={[{id:'3',name: 'Title Text',type:'1', code: 'item1',num:'12'},{id:'1',name: 'Title Text',type:'1', code: 'item1',num:'12'},{id:'2',name: 'Title Text3',type:'0', code: 'item1',num:'12'}]}
                    renderItem={({item, separators}) =>(<ListItem item={item}/>)}
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
    }
})
