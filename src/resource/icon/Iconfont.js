
import createIconSet from 'react-native-vector-icons/lib/create-icon-set';


const IconMapper = {
    "chengchangzhi":58922,
    "chengchang":58996
}

const iconSet = createIconSet(IconMapper, 'Icon', 'iconfont.ttf');   //  'DIYIcon'可自定义名称
 
export default iconSet;
 
export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;


