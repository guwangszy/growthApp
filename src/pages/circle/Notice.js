/**
 * 添加通知和打卡
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,TextInput,document} from 'react-native'
import TitleBar from '../../common/TitleBar'
import {width} from '../../common/AdapterUtil'
import {Form,FieldType} from '../../common/form/Form'

export default class Noticecle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'添加通知',

        }
    }
    model ={
        class:{
            type: FieldType.Picker,
            label: "发布班级",
            required: true,
            placeholder: "请选择"
        },
        frequency:{
            type: FieldType.Picker,
            label: "发布频次",
            required: true,
            placeholder: "请选择"
        },
        cycle:{
            type: FieldType.Picker,
            label: "发布周期",
            required: true,
            placeholder: "请选择"
        }
    }
    render(h) {
        return (
            <View>
                <TitleBar title={this.state.title} navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={[styles.InputBox,{ height: 50}]}>
                        <TextInput style={styles.title}
                            placeholder={"请输入标题"} 
                            editable={true} maxLength={50}
                            onChangeText={(value) => this.setState({ proposal: value })} />
                    </View>
                    <View style={[styles.InputBox,{ height: 200}]}>
                        <TextInput style={styles.Input}
                            placeholder={"请输入内容"}
                            multiline={true} editable={true} maxLength={500}
                            onChangeText={(value) => this.setState({ proposal: value })} />
                    </View>
                </View>
                <Form model={this.model} ref="form"/>
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