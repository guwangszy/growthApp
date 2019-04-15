/**
 * 统一列表页面 支持下拉刷新和上拉加载
 */

 import React from 'react'
 import {View,Text,StyleSheet,FlatList,ActivityIndicator} from 'react-native'
 import PropTypes from 'prop-types';
 class FooterLoadMore extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    static propTypes = {
        isNoMore : PropTypes.bool,
    }
    static defaultProps = {
        isNoMore : false
    }
    render(){
        const {isNoMore} = this.props;
        const title = isNoMore? '没有更多数据了~':'玩命加载数据~';
        return (
            <View style={styles.container}>
                {!isNoMore  && <ActivityIndicator/>}
                <Text style={styles.title}>{title}</Text>
            </View>
        )
    }
 }
 export default class SimpleList extends React.Component{
    constructor(props){
        super(props)
    }
    // 尾部加载更多
    _renderFooter = (isNoMore)=>{
        return(
            <FooterLoadMore
                // isNoMore: 是否还有数据可加载
                isNoMore={isNoMore}
            />
        );
    };

    render(){
        return (
            <View>
                <FlatList
                    style={{marginBottom:50}}
                    data={this.props.data}
                    renderItem={({item, separators})=>this.props.renderItem(item,separators)}
                    onRefresh={() => this.props.onRefresh()}
                    refreshing={this.props.refreshing}
                    ListFooterComponent={() => this._renderFooter(this.props.isFooter)}
                    onEndReached={() => this.props.onEndReached()}
                    // 注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发(0---1之间)
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index)=>`${item.item_id}-${index}`}
                />
            </View>
        )
    }
 }

 const styles = StyleSheet.create({
    container :{
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:15,
        color:'#666',
        marginLeft:5,
    }

 })