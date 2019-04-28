import React, { Component, UIManager } from 'react';

import {
    Text,
    View,
    Animated,
    TouchableOpacity
} from 'react-native';
import {PickerView,BaseDialog} from 'react-native-pickers'

export default class CustomPicker extends BaseDialog {
    selectedIndex=0
    static defaultProps = {
        selectedValue:0,
        confirmText: '确定',
        confirmTextSize: 14,
        confirmTextColor: '#333333',

        cancelText: '取消',
        cancelTextSize: 14,
        cancelTextColor: '#333333',
        items: [],
        itemKey:'text'
    }

    constructor(props) {
        super(props);
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }
    formatPickerData(selectedValue) {
        let items=[]
        if(this.props.items&& this.props.items.length>0){
            this.props.items.map((item,index) => {
                if(this.props.itemKey){
                    items.push(item[this.props.itemKey])
                    if(selectedValue && item[this.props.itemKey] == selectedValue){
                       this.selectedIndex=index
                    }
                }else{
                    if(selectedValue && item == selectedValue){
                        this.selectedIndex=index
                    }
                    items.push(item)
                }
            })
        }
        return items
    }
    renderContent() {
        return <View style={{
            width: this.mScreenWidth, flexDirection: 'row'
        }}>
            <PickerView
                list={this.formatPickerData()}
                onPickerSelected={(toValue) => {
                    this.formatPickerData(toValue)
                }}
                selectedIndex={this.selectedIndex}
                fontSize={this.getSize(14)}
                itemWidth={this.mScreenWidth}
                itemHeight={this.getSize(40)} />
                <View style={{
                width: this.mScreenWidth, height: this.getSize(44),
                backgroundColor: '#ffffff', flexDirection: 'row',
                justifyContent: 'space-between', position: 'absolute', top: 0
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValue));
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>{this.props.cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.items[this.selectedIndex]));
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>{this.props.confirmText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

}