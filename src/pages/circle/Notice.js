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
import api from '../../api/index'
import Config from '../../api/Config'
import Utils from '../../common/Utils'
export default class Noticecle extends React.Component{
    cycles=[];
    frequencys=[]
    constructor(props){
        title=''
        content=''
        super(props)
        this.state={
            titleBar:'添加通知',
            
        }
    }

    componentWillMount(){
        this.initCycle();
        _this =this 
        this.frequencys=[{text:'每天',value:0},{text:'周一',value:2},{text:'周二',value:3},{text:'周三',value:4},
        {text:'周四',value:5},{text:'周五',value:6},{text:'周六',value:7},{text:'周日',value:1}]
        
    }
    componentDidMount(){
        if(global.USERINFO.classId){
            let params={
                areaId:global.USERINFO.areaId,
                schoolId:global.USERINFO.schoolId,
                gradeId:global.USERINFO.gradeId,
                classId:global.USERINFO.classId,
            }
            api.post(Config.service.classDetail,params).then((ret)=>{
                if(ret.errcode === 0){ //  成功
                    let options = {
                        class:{
                            value: global.USERINFO.gradeClassId,
                            text: ret.data.area+ret.data.school+ret.data.grade+ret.data.className,
                        }
                    }
                    this.refs.form.setValue(options)
                }
            })
        }else{
            Utils.showToast('请先添加班级')
        }
    }
    initCycle(){
        let cycle=[];
        for(let item =1;item <=100 ; item ++){
            if(item%7==0){
                cycle.push({text:item+'天',value:item})
            }
        }
        this.cycles=cycle
    }
    isNotice(){
        if(this.props.navigation.state.params.type==1){//通知
            return false
        }
        return true
    }
    model={
        class:{
            type: FieldType.Picker,
            label: "发布班级",
            required: true,
            placeholder: "请选择"
        },
        frequency:{
            type: FieldType.Picker,
            label: "发布频次",
            hidden:!this.isNotice(),
            required: this.isNotice(),
            placeholder: "请选择",
            icons: 'md-add',
            onClick: () => {
                this.FrequencyPicker.show()
            }
        },
        cycle:{
            type: FieldType.Picker,
            label: "发布周期",
            hidden:!this.isNotice(),
            required: this.isNotice(),
            placeholder: "请选择",
            icons: 'md-add',
            onClick: () => {
                this.CyclePicker.show()
            }
        }
    }
    onSubmit(){
        var value = this.refs.form.getValue();
        var verify = this.refs.form.getVerify();
        if (verify) {
            api.post(Config.service.addNotices, {
                title:  this.title,
                content:  this.content,
                frequency: value.frequency,
                cycle: value.cycle,
                gradeId: global.USERINFO.gradeClassId,
                createUser: global.USERINFO.username,
            }).then((ret) => {
                if (ret.errcode === 0) {
                    Utils.showToast("提交成功！")
                    this.props.navigation.goBack();
                } else {
                    Utils.showToast("提交失败！")
                }
            })
        }
    }
    render(h) {
        return (
            <View style={{flex:1}}>
                <TitleBar title={this.state.titleBar} navigation={this.props.navigation} 
                    rightBtn={[{
                        right:'保存',
                        onPress:()=>{
                            this.onSubmit();
                        }
                    }]}
                />
                <View style={styles.container}>
                    <View style={[styles.InputBox,{ height: 50}]}>
                        <TextInput style={styles.title}
                            placeholder={"请输入标题"} 
                            editable={true} maxLength={50}
                            onChangeText={(value) => this.title=value} />
                    </View>
                    <View style={[styles.InputBox,{ height: 200}]}>
                        <TextInput style={styles.Input}
                            placeholder={"请输入内容"}
                            multiline={true} editable={true} maxLength={500}
                            onChangeText={(value) => this.content= value} />
                    </View>
                </View>
                <Form model={this.model} ref="form"/>
                <CustomPicker
                    items={this.frequencys}
                    itemKey='text'
                    ref={ref => this.FrequencyPicker = ref}
                    onPickerCancel={() => { }}
                    onPickerConfirm={(ret) => {
                        let options = {
                            frequency:{
                                value: ret.value,
                                text: ret.text,
                            }
                        }
                        this.refs.form.setValue(options)
                    }}
                     />
                <CustomPicker 
                    items={this.cycles}
                    itemKey='text'
                    ref={ref => this.CyclePicker = ref} 
                    onPickerCancel={() => { }}
                    onPickerConfirm={(ret) => {
                        let options = {
                            cycle:{
                                value: ret.value,
                                text: ret.text,
                            }
                        }
                        this.refs.form.setValue(options)
                    }}
                    />
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