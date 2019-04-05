import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { width, unitWidth, titleHeight, statusBarHeight } from './AdapterUtil'
export default class TitleBar extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigation: PropTypes.object.isRequired,
        hideLeftArrow: PropTypes.bool,
        pressLeft: PropTypes.func,
        pressRight: PropTypes.func,
        left: PropTypes.string,
        backgroundColor: PropTypes.string,
        titleColor: PropTypes.string,
        rightBtn: PropTypes.array,
        statusBarBgColor: PropTypes.string,
        barStyle: PropTypes.string,
        onPress: PropTypes.bool
    }

    static defaultProps = {
        title: "",
        hideLeftArrow: false,
        pressRight: () => {
        },
    }
    constructor(props) {
        super(props)
        this.state = {
            routesArr: []
        }
    }
    back() {
        if (this.props.pressLeft) {
            this.props.pressLeft()
            return
        }
        this.props.navigation.goBack();
    }
    componentWillMount() {
    }
    actionPress = (index) => {
        //有路由组则进行路由跳转
        if (this.state.routesArr.length > 0) {
            let route = this.state.routesArr[index];
            if (route) {
                this.props.navigation.navigate(route);
            }
        }
        
    }
    render() {
        const { backgroundColor, titleColor } = this.props
        return (
            <View style={[TitleStyle.titleBar, backgroundColor ? { backgroundColor: backgroundColor } : null]}>
                <StatusBar
                    backgroundColor={this.props.statusBarBgColor || "transparent"}
                    barStyle={this.props.barStyle || 'light-content'}
                    translucent={true} />
                <View style={TitleStyle.statusBar} />

                <View style={TitleStyle.titleBarContent}>
                    {this.props.hideLeftArrow ? (
                        <View style={TitleStyle.left} />
                    ) : (
                            <TouchableOpacity activeOpacity={1} onPress={this.back.bind(this)}
                                style={TitleStyle.left}>
                                {this.props.LifeImage ? (<Image style={TitleStyle.titleLeftImage}
                                    source={this.props.LifeImage} />)
                                    : (<Icon style={{ paddingLeft: unitWidth * 10 }} name="ios-arrow-back" color="#fff" size={30} />)}

                                <Text style={TitleStyle.leftText}>{this.props.left}</Text>
                            </TouchableOpacity>
                        )}
                    <View style={TitleStyle.middle} >
                        <Text numberOfLines={1} style={[TitleStyle.middleTitle, titleColor ? { color: titleColor } : null]}>{this.props.title} {this.props.onPress ? (<Icon name={'md-arrow-dropdown'} size={20} color='#fff' />) : ('')} </Text>
                    </View>
                    {this.renderRight()}
                </View>
            </View>
        );
    }

    renderRight() {
        if (!this.props.rightBtn && typeof rightBtn != 'object') {
            return <View style={TitleStyle.right} />
        }
        return (
            <View style={TitleStyle.right}>
                {this.props.rightBtn.map((item, index) => this.RightBtnrender(item, index))
                }
            </View>
        )
    }
    RightBtnrender = (item, index) => {
        return !item.hidden?(
            <TouchableOpacity activeOpacity={1} key={index} style={{
                height: titleHeight,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: unitWidth * 20
            }} onPress={item.onPress}>
                {item.right && typeof item.right == 'object' ? (item.right) : (
                    <Text style={TitleStyle.rightText}>{item.right}</Text>
                )}
                {item.rightImage ? (
                    <Image style={TitleStyle.rightImage} source={item.rightImage} />
                ) : (null)}
            </TouchableOpacity>
        ):null
    }
}

const TitleStyle = StyleSheet.create({

    titleBar: {
        width: width,
        height: titleHeight,
        backgroundColor: '#4AB567',
    },
    titleBarContent: {
        flexDirection: 'row',
        height: titleHeight,
        alignItems: 'center',
        width: width,
        justifyContent: 'space-between',
        height: titleHeight - statusBarHeight,
    },
    titleBarSearchContent: {
        flexDirection: 'row',
        height: titleHeight,
        alignItems: 'center',
        width: width,
        height: titleHeight - statusBarHeight,
    },

    searchLeftIcon: {
        width: unitWidth * 30,
        height: unitWidth * 38,
        resizeMode: 'stretch',
        marginLeft: unitWidth * 24,
        marginRight: unitWidth * 15
    },
    searchLeftText: {
        width: unitWidth * 140,
        fontSize: unitWidth * 30,
        color: "#ffffff",
    },

    searchBlock: {
        flexDirection: 'row',
        width: unitWidth * 500,
        height: unitWidth * 60,
        borderRadius: unitWidth * 30,
        backgroundColor: "white",
        alignItems: 'center',
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 30
    },

    searchIcon: {
        width: unitWidth * 40,
        height: unitWidth * 40,
        resizeMode: 'stretch',
        marginRight: unitWidth * 30
    },

    searchBarInput: {
        width: unitWidth * 350,
        height: unitWidth * 60,
        fontSize: unitWidth * 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },


    left: {
        width: unitWidth * 180,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: unitWidth * 10,
    },
    middle: {
        width: width - unitWidth * 360,
        height: titleHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleTitle: {
        fontSize: unitWidth * 36,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },

    right: {
        width: unitWidth * 180,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: unitWidth * 20,
    },

    leftText: {
        fontSize: unitWidth * 30,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },

    rightText: {
        fontSize: unitWidth * 30,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightImage: {
        width: unitWidth * 40,
        height: unitWidth * 40,
        resizeMode: 'contain',
        marginLeft: unitWidth * 5
    },

    titleLeftImage: {
        width: unitWidth * 50,
        height: unitWidth * 35,
        marginRight: unitWidth * 5,
        resizeMode: 'contain'
    },

    homeTitleIcon: {
        width: unitWidth * 213,
        height: unitWidth * 52,
        resizeMode: 'stretch'
    },
    titleRightImage: {
        width: unitWidth * 65,
        height: unitWidth * 65,
        resizeMode: 'contain'
    },
    statusBar: {
        width: width,
        height: statusBarHeight,
        backgroundColor: 'transparent'

    }
})