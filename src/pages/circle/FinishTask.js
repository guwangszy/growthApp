/**
 * 添加通知和打卡
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,TextInput,document} from 'react-native'
import {SimpleBtn} from '../../common/form/Buttons'
import CustomPicker from '../../common/CustomPicker'
import TitleBar from '../../common/TitleBar'
import {width} from '../../common/AdapterUtil'
import {Form,FieldType} from '../../common/form/Form'

export default class FinishTask extends React.Component{
    cycles=[];
    frequencys=[]
    constructor(props){
        super(props)
        this.state={
            title:'提交任务',
        }
    }

    onSubmit(){
        alert(1)
    }
    render(h) {
        return (
            <View style={{flex:1}}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} 
                    rightBtn={[{
                        right:'提交',
                        onPress:()=>{
                            this.onSubmit();
                        }
                    }]}
                />
                <View style={styles.container}>
                    <View style={[styles.InputBox,{ height: 200}]}>
                        <TextInput style={styles.Input}
                            placeholder={"请输入内容"}
                            multiline={true} editable={true} maxLength={500}
                            onChangeText={(value) => this.setState({ proposal: value })} />
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
    },
    InputBox: {
        width: width,
        backgroundColor: '#fff',
        marginBottom: 5
    },
    title: {
        justifyContent: "flex-end",
        padding: 10,
        fontSize: 15,
        height: 50
    },
    Input: {
        justifyContent: "flex-end",
        padding: 10,
        fontSize: 15,
        height: 165,
        textAlignVertical: 'top'
    },
})