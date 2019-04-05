/**
 * 身份选择
 */
import React from 'react';
import {View, Text,Image,TextInput,StyleSheet, TouchableWithoutFeedback, TouchableOpacity, 
} from "react-native";
import {width} from '../../common/AdapterUtil'
import Utils from '../../common/Utils'
import Icon from '../../resource/icon/Iconfont'
import TitleBar from '../../common/TitleBar'
import images from '../../common/image'
export default class Identity extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:'注册-选择身份'
    }
  }
  componentWillMount(){

  }
  /**
   * 选择身份
   * @param {} type 
   */
  toRegidit(type){
    if(type === '0'){// 老师
      this.props.navigation.navigate('Regedit');
    }else if(type === '1'){ //学生
      this.props.navigation.navigate('Regedit');
    }
  }
  render(){
    return (
    <View style={styles.container}>
      <TitleBar title={this.state.title}  navigation={this.props.navigation}  />
      <View style={{ flexDirection: "column", }}>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 50 }}>
          <Icon name={'chengchangzhi'} size={100} color={'#4AB567'} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 20}}>中小学生成长平台</Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", }}>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 50  }}>
          <Text style={{ fontSize: 16,color:'#A0A0A0'}}>请选择您的身份</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={[styles.boxItem,{backgroundColor: '#95D9F6'}]} >
          <TouchableOpacity activeOpacity={0.6} onPress={() => this.toRegidit('0')}>
            <View style={[{flex: 1,flexDirection: 'column',alignItems: "center",}]}>
              <Image source={images.laoshiNv} style={{ height: 150, width: 150}} resizeMode="contain" />
              <Text style={{fontSize: 16}}>我是老师</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.boxItem,{backgroundColor: '#FAD565'}]} >
          <TouchableOpacity activeOpacity={0.6} onPress={() => this.toRegidit('1')}>
            <View style={[{flex: 1,flexDirection: 'column',alignItems: "center"}]}>
              <Image source={images.xueshengNan} style={{ height: 150, width: 150}} resizeMode="contain" />
              <Text style={{fontSize: 16}}>我是学生</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  box:{
    width: width ,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginTop: 50
  },
  boxItem:{
    justifyContent: 'center', 
    alignItems: "center",
    borderRadius: 100,
    width: 150, 
    height: 150,
  }
})
