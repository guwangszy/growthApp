/**
 * 添加通知和打卡
 */
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Config from '../../api/Config';
import api from '../../api/index';

import { width } from '../../common/AdapterUtil';
import CameraButton from '../../common/cameraButton';
import TitleBar from '../../common/TitleBar';
import Utils from '../../common/Utils';
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
        let files = this.refs.camera.getFiles();
        console.log(files)
        let params={
            userId:global.USRID,
            username: global.USERINFO.username,
            gradeId: global.USERINFO.gradeClassId,
            adviceId:this.state.adviceId,
            doneContent:this.state.doneContent,
            file: files
        }
        api.post(Config.service.finishtask,params).then((ret)=>{
            if (ret.errcode === 0) {
                Utils.showToast("提交成功！")
                this.props.navigation.navigate('TaskList')
            }
        }) 
    }
   chooseImageOrVideo(index){
        console.log(index);
   }
    render(h) {
        return (
            <View style={styles.container}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} 
                    rightBtn={[{
                        right:'提交',
                        onPress:()=>{
                            this.onSubmit();
                        }
                    }]}
                />
                <View style={[styles.InputBox]}>
                    <TextInput style={styles.Input}
                        placeholder={"请输入内容"}
                        multiline={true} editable={true} maxLength={500}
                        onChangeText={(value) => this.setState({ doneContent: value })} />
                    <CameraButton ref='camera' video={true} photos={1} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
    },
    InputBox: {
        width: '95%',
        height: 260,
        borderColor: '#BCBCBC',
        backgroundColor: '#fff',
        borderWidth: 1,
        marginTop: 12
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
    }
})