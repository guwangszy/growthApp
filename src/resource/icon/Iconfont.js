
import createIconSet from 'react-native-vector-icons/lib/create-icon-set';


const IconMapper = {
    "banjitongzhi": 58880,
    "mine-selected": 58881,
    "wode": 58882,
    "laoshi-nv": 58883,
    "icon-nan": 58884,
    "touxiangnvhai": 58885,
    "touxiang1": 58886,
    "touxiangnv": 58887,
    "pinglun": 58888,
    "yizan": 58889,
    "bofang": 58890,
    "tobottom": 58891,
    "banjigonggao": 58894,
    "banben": 58896,
    "banjizhuye": 58897,
    "dianzan": 58898,
    "yonghu": 59283,
    "banjidongtai": 58902,
    "chengchang": 58905,
    "xuesheng": 58907,
    "yikan": 58908,
    "banjiquan": 58919,
    "chengchangzhi": 58922,
    "banjibang": 58924,
    "tongzhi": 58925,
    "dianhua": 58926,
    "banbengengxin": 58930,
    "chakan": 58933,
    "shijian": 59062,
    "yonghu1": 59962,
    "xuesheng-nan": 59200,
    "touxiang": 59333,
    "xiangyou": 59334,
    "paishex": 58952,
    "daka": 58953,
    "touxiangnanhai": 58962,
    "fanhui": 59009,
    "xiugaimima": 58975,
    "xuesheng1": 58989,
    "banjifengcai": 59128,
    "paishe": 59130,
    "zuoye": 59006,
};



const iconSet = createIconSet(IconMapper, 'Icon', 'iconfont.ttf');   //  'DIYIcon'可自定义名称

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;


