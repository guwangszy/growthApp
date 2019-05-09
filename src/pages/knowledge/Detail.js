/**
 * 任务详情
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
            conent:''
        }
    }
    componentWillMount(){
        let item=this.props.navigation.state.params.item
        api.post(Config.service.fileDetail, {
            accessoryAddress:item.accessory_name
        }).then((ret) => {
            if (ret.errcode === 0) {
                this.setState({
                    conent:ret.data.content,
                    accessory_name:item.accessory_name,
                    username:item.create_user,
                    growup_time:item.create_time
                })
            }
        })
        
    }
    render(){
        return (
            <View style={[styles.container]}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} />
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flexDirection:'column',marginTop:20,justifyContent:'center',width:width*0.98,}}>
                            <Text style={{fontSize:20}}>{this.state.accessory_name}</Text>
                            <Text style={{fontSize:14,color:'#B3B3B3'}}>{this.state.username}   {this.state.growup_time}</Text>
                            <Text style={{fontSize:16}}>{this.state.conent}</Text>
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
