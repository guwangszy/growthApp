/**
 * 我的成长
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
export default class TaskList extends React.Component{
    _isRefreshing = false;
    _isFooter=false
    constructor(props){
        super(props)
        this.state={
            title:'我的成长',
            data:[],
            page:1,
            limit:10
        }
    }
    
    
    
    render(){
        return (
            <View style={styles.container}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} hideLeftArrow={true} />
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:12}}>
                    <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('Growth')}}>
                        <View style={{flexDirection:'column',justifyContent:'center',
                        backgroundColor:'#FEFEFE',height:50,width:width}}>
                            <View style={{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:10}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <View style={{flexDirection:'row',marginLeft:10}}>
                                        <Icon name={'chengchangzhi'} size={20} color={'#4AB567'}/>
                                        <Text style={{marginLeft:10}}>我的成长</Text>
                                    </View>
                                </View>
                                <Icon name={'xiangyou'} size={20} color={'#bfbfbf'}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
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