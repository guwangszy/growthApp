
import { Platform} from 'react-native';
import {RNToAndroid} from '../native/index'
export default class utils {
    
    static isAndroid(){
        return Platform.OS == 'android';
    }

    /**
     * android Toast 方法
     * @param {*} msg  文本
     * @param {*} time 时间
     */
    static showToast(msg, time) {
        RNToAndroid.toastShow(msg)
    }

    /**
     * 显示loadgin 加载
     */
    static showLoading(text){
        const options = { 
        text: text||'努力加载中...',
        loadingBackgroundColor: 'rgba(0,0,0)',
        loadingViewBackgroundColor: 'rgba(0,0,0,0.9)'
        };
        RRCLoading.setLoadingOptions(options);
        RRCLoading.show();
    }
    /**
     * 隐藏 loading
     */
    static hideLoading(){
        RRCLoading.hide();
    }
}