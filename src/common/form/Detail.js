import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    Dimensions, ScrollView, TouchableNativeFeedback,
} from 'react-native';
import { width, unitWidth, titleHeight, statusBarHeight } from '../AdapterUtil'

export class SimpleDetail extends Component {
    render() {
        return (
            <View style={styles.flexDirectionInfo}>
                <Text style={styles.InfoColorFont}>{this.props.lable}</Text>
                <Text style={styles.InfoColorFontValue}>{this.props.value}</Text>
            </View>
        )
    }
}

export class ShortDetail extends Component {
    render() {
        return (
            <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 1 }}>
                <Text style={styles.unifyFontSizeLeft}>{this.props.lable}</Text>
                <Text style={styles.textRight}> {this.props.value}</Text>
            </View>
        )
    }
}
export class DoubleRowDetail extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.unifyFontSizeLeft}>{this.props.lable}</Text>
                <Text style={styles.unifyFontSizeRight}>{this.props.value}</Text>
            </View>
        )
    }
}
//审核详情顶部
export class CheckHeader extends Component {
    render() {
        return (
            <View style={[styles.checkHeader]}>
                <Text style={{ marginRight: 20, color: "#999" }}>提交人： {this.props.name}</Text>
                <Text style={{ color: "#999" }}>提交时间： {this.props.time}</Text>
            </View>
        )
    }
}
export class TitleDetail extends Component {
    render() {
        return (
            <View style={{ width: width, flexDirection: "row", justifyContent: "space-between", paddingRight: 20, paddingLeft: 20, alignItems: 'center', marginTop: 10, height: 40, borderBottomColor: "#e8e8e8", borderBottomWidth: 0.4, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 20, width: 4, backgroundColor: "#39C3EB", marginRight: 10,alignSelf:'center' }}></View>
                    <Text style={{ lineHeight: 40, fontSize: 14, color: "#39C3EB" }}>{this.props.title}</Text>
                </View>
                {this.props.tips ?
                    <View style={{ flexDirection: "row" }}>
                        {this.props.tips}
                    </View>
                : null}


            </View>
        )
    }
}
export class BtnBoxDetail extends Component {

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                {this.props.buttons && this.props.buttons.length > 0 ? this.props.buttons.map((item, index) => this.renderButton(item, index)) : null}
            </View>
        )
    }
    renderButton = (item, index) => {
        let btnBackgroundColor = item.backgroundColor
        return !item.hidden?(
            <TouchableNativeFeedback onPress={item.onPress} key={index}>
                <View style={[styles.button, { backgroundColor: btnBackgroundColor }]}>
                    <Text style={styles.buttonText}>{item.text}</Text>
                </View>
            </TouchableNativeFeedback>
        ):null
    };
}

const styles = StyleSheet.create({

    InfoColorFont: {
        fontSize: 14,
        color: "#9E9E9E",
    },
    InfoColorFontValue: {
        color: "#000",
        marginLeft: 14,
    },
    flexDirectionInfo: {
        flexDirection: "row",
        fontSize: 14,
        marginBottom: 12
    },
    unifyFontSizeLeft: {
        fontSize: 14,
        color: "#A8A8A8",
        marginBottom: 4
    },
    unifyFontSizeRight: {
        fontSize: 14,
        lineHeight: 20
    },
    textRight: {
        fontSize: 14,
        lineHeight: 20,
    },
    button: {
        height: 40,
        flex: 1,
        borderRadius: 3,
        marginLeft: 5,
        marginRight: 5
    },
    buttonText: {
        textAlign: 'center',
        lineHeight: 40,
        color: "#fff"
    },
    checkHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#fff',
        borderBottomColor: '#d6d6d6',
        borderBottomWidth: 1,
        height: 40
    },
});