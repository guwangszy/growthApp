/**
 * 添加通知和打卡
 */
import React from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,TextInput,document} from 'react-native'
import {SimpleBtn} from '../../common/form/Buttons'
import CustomPicker from '../../common/CustomPicker'
import TitleBar from '../../common/TitleBar'
import {width} from '../../common/AdapterUtil'
import Utils from '../../common/Utils'
import api from '../../api/index'
import Config from '../../api/Config'
export default class FinishTask extends React.Component{
    cycles=[];
    frequencys=[]
    constructor(props){
        super(props)
        this.state={
            title:'提交任务',
            adviceId:'',
            doneContent:''
        }
    }
    componentWillMount(){
        let adviceId = this.props.navigation.state.params.adviceId
        this.setState({
            adviceId:adviceId
        })
    }
    onSubmit(){
        let params={
            userId:global.USRID,
            gradeId: global.USERINFO.gradeClassId,
            adviceId:this.state.adviceId,
            doneContent:this.state.doneContent
        }
        api.post(Config.service.finishtask,params).then((ret)=>{
            if (ret.errcode === 0) {
                Utils.showToast("提交成功！")
                this.props.navigation.navigate('TaskList')
            }
        }) 
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
                            onChangeText={(value) => this.setState({ doneContent: value })} />
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