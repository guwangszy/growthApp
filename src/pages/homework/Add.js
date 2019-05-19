/**
 * 提交家庭作业
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native';
import {SimpleBtn} from '../../common/form/Buttons'
import CameraButton from '../../common/cameraButton'
import utils from '../../common/Utils';
import api from '../../api/index'
import Config from '../../api/Config'
import storage from '../../storage/index'
import TitleBar from '../../common/TitleBar'
export default class AddGrowth extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            title: '提交作业',
            placeholder: '作业内容描述！',
            proposal: '',
            photos: 1
        }
    }
    
    toSubmit = () => {
        //   验证
        let files = this.refs.camera.getFiles();
        if (!this.state.proposal) {
            utils.showToast("请先填写作业内容描述！")
            return false;
        }
        api.post(Config.service.finishtask, {
            userId:global.USRID,
            gradeId: global.USERINFO.gradeClassId,
            username: global.USERINFO.username,
            doneContent:this.state.proposal,
            file: files
        }).then((ret) => {
            if (ret.errcode === 0) {
                utils.showToast("提交成功！")
                this.props.navigation.state.params.callback()
                this.props.navigation.goBack();
            } else {
                utils.showToast("提交失败！")
            }
        })

    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <TitleBar title={this.state.title} navigation={navigation} />
                <View style={styles.InputBox}>
                    <TextInput style={styles.Input}
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