/**
 * 成长册
 */
import React from 'react';
import {View,Text,FlatList,Image, TouchableHighlight,StyleSheet,BackHandler} from "react-native";
import TitleBar from '../../common/TitleBar'
import images from '../../common/image'
import {width} from '../../common/AdapterUtil'


class Groethitem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',margin: 5}}>
                    <Image source={images.nv} style={{justifyContent: "center", height: 50, width: 50}} resizeMode="contain"></Image>
                    <View style={{flexDirection:'column',marginLeft: 5}}>
                        <Text style={styles.font12}>张三丰</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.font12}>03/12 2019</Text>
                            <Text style={[styles.font12,{color:'#A6A6A6',marginLeft: 5}]}>四年级三班</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom:20}}>
                    <View style={{alignItems:'center'}}>
                        <Image source={{uri:'http://lorempixel.com/640/480/technics/'}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height: 250, width:width*0.95}} resizeMode="contain"></Image>
                    </View>
                </View>
            </View>
        )
    }
}

export default class Growth extends React.Component{
    _keyExtractor = (item, index) => item.id;
    constructor(props){
        super(props)
        this.state = {
            title:'成长册'
        }
    }

    render(){
        return (
          <View style={styles.container}>
            <TitleBar title={this.state.title} navigation={this.props.navigation} hideLeftArrow={true}/>
            <FlatList 
                keyExtractor={this._keyExtractor}
                data={[{title: 'Title Text1', key: 'item1'},{title: 'Title Text', key: 'item2'}]}
                renderItem={({item, separators}) => (
                    <Groethitem></Groethitem>
                )}
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
    font12:{
        fontSize:12
    }
})
