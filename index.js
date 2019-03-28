/** 入口页面 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import './src/common/Global'

AppRegistry.registerComponent(appName, () => App);
