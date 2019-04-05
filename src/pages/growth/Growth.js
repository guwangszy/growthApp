/**
 * 成长册
 */
import React from 'react';
import {View,Text,FlatList, TouchableHighlight,StyleSheet,BackHandler} from "react-native";
import TitleBar from '../../common/TitleBar'
export default class Growth extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:'成长册'
        }
    }

    render(){
        return (
          <View>
            <TitleBar title={this.state.title}  navigation={this.props.navigation} hideLeftArrow={true}/>
            <FlatList
                ItemSeparatorComponent={({highlighted}) => (
                    <View style={{height: 1, backgroundColor: 'red'}} />
                )}
                data={[{title: 'Title Text', key: 'item1'},{title: 'Title Text', key: 'item1'}]}
                renderItem={({item, separators}) => (
                    <TouchableHighlight
                    onPress={() => this._onPress(item)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View style={{backgroundColor: 'white'}}>
                        <Text>{item.title}</Text>
                    </View>
                    </TouchableHighlight>
                )}
            />
          </View>
        )
    }
}