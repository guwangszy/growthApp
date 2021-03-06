/**
 * 消息详情
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,TextInput,document} from 'react-native'
import TitleBar from '../../common/TitleBar'
import {width} from '../../common/AdapterUtil'
import images from '../../common/image'
import api from '../../api/index'
import Config from '../../api/Config'

export default class GrowthDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'详情',
            item:''
        }
    }
    componentWillMount(){
        let item=this.props.navigation.state.params.item
        this.setState({
            item:item
        })
    }
    render(){
        return (
            <View style={[styles.container]}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} />
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'column',padding:10,justifyContent:'center',width:width*0.98,}}>
                            <Text style={{fontSize:20}}>{this.state.item.headline}</Text>
                            <Text style={{fontSize:14,color:'#B3B3B3'}}>{this.state.item.username}   {this.state.item.create_time}</Text>
                            <Image source={{uri:global.base+'image/'+this.state.item.accessory_name}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height: 250, width:width*0.95}} resizeMode="cover"></Image>
                            <Text style={{fontSize:16}}>{this.state.item.content}</Text>
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
