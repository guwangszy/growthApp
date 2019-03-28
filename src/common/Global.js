import DeviceInfo from 'react-native-device-info';


global.deviceId = DeviceInfo.getUniqueID();
global.appVersion = DeviceInfo.getVersion();
