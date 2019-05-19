/**
 * 作业详情
 */
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CameraButton from '../../common/cameraButton';
import { SimpleBtn } from '../../common/form/Buttons';
import TitleBar from '../../common/TitleBar';
import utils from '../../common/Utils';
import api from '../../api/index'
import Config from '../../api/Config'
export default class TaskDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'作业修改',
            id:'',
            proposal:'',
            photos: 1,
        }
    }
    componentWillMount(){
        let item=this.props.navigation.state.params.item
        this.setState({
            fkId:item.fkId,
            username:item.username,
            accessory_name:item.accessory_name,
            proposal:item.content,
            time:item.time
        })

    }
    componentDidMount(){
        this.refs.camera.setImg([global.base+'image/'+this.state.accessory_name]);
    }
    toSubmit(){
        let files = this.refs.camera.getFiles();
        if (!this.state.proposal) {
            utils.showToast("请先填写作业内容描述！")
            return false;
        }
        api.post(Config.service.updateWork, {
            fkId:this.state.fkId,
            userId:global.USRID,
            gradeId: global.USERINFO.gradeClassId,
            username: global.USERINFO.username,
            doneContent:this.state.proposal,
            file: files
        }).then((ret) => {
            if (ret.errcode === 0) {
                utils.showToast("提交成功！")
                this.props.navigation.navigate('HomeworkList')
                this.props.navigation.goBack();
            } else {
                utils.showToast("提交失败！")
            }
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <TitleBar title={this.state.title} navigation={this.props.navigation} />
                <View style={styles.InputBox}>
                    <TextInput style={styles.Input} value={String(this.state.proposal?this.state.proposal:'')}
                        placeholder={this.state.placeholder}
                        multiline={true} editable={true} maxLength={500}
                        onChangeText={(value) => this.setState({ proposal: value })} />
                    <CameraButton ref='camera' photos={this.state.photos} onFileUpload={this.fileUpload} />
                </View>
                <SimpleBtn onPress={() =>  this.toSubmit()} text={'提交'}/>
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
    Input: {
        justifyContent: "flex-end",
        padding: 10,
        fontSize: 15,
        height: 165,
        textAlignVertical: 'top'
    },
    CameraButton: {
        // position:'absolute',
        // bottom:10,
        // left:10
    },
    btn: {
        flexDirection: "column",
        textAlign: "center",
        fontSize: 18,
        width: utils.Width * 0.9,
        color: "#fff",
        height: 50,
        borderRadius: 5,
        lineHeight: 50,
        fontWeight: "bold"
    },
})