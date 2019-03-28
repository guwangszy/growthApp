
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
}