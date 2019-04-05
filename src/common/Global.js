import DeviceInfo from 'react-native-device-info';


global.deviceId = DeviceInfo.getUniqueID();
global.appVersion = DeviceInfo.getVersion();

global.ISDEBUG =true ;// 是否开发模式 true 开发 false 生产


