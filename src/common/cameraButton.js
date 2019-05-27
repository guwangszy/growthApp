import React from 'react'
import {
    Image,
    TouchableNativeFeedback,
    StyleSheet,
    Platform,
    View,
    PermissionsAndroid
} from 'react-native'
import RNFS from 'react-native-fs';
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Router from '../router/Index';

const options = {
    title: '',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从图库选择照片',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        path: 'images'
    }
};
class CameraButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            delIndex: 0,
            imgArr: [],
            files: []
        }
    }
    componentWillMount() {
        // this.requestCameraPermission();
    }
    // async  requestCameraPermission() {
    //     console.log("获取相机权限")
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: '申请摄像头权限',
    //                 message:
    //                     '使用该页面功能需要摄像头权限',
    //                 buttonNegative: '拒绝',
    //                 buttonPositive: '同意',
    //             },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("已获取摄像头权限")
    //             return true
    //         } else {
    //             // Utils.showToast("未获取摄像头权限，有功能无法使用")
    //             return false
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // }
    // checkCameraPermission() {
    //     console.log('提前获取')
    //     try {
    //         //返回Promise类型
    //         const granted = PermissionsAndroid.check(
    //             PermissionsAndroid.PERMISSIONS.CAMERA
    //         )
    //         granted.then((data) => {
    //             if (data == true) {
    //                 this.showImagePicker()
    //             } else {
    //                 Utils.showToast('请打开摄像头权限')
    //             }
    //         }).catch((err) => {
    //             Utils.showToast(err.toString())
    //         })
    //     } catch (err) {
    //         Utils.showToast(err.toString())
    //     }
    // }
    setImg(imgArr){
        this.setState({
            imgArr: imgArr,
        })
    }
    render() {
        const { photos,video } = this.props;
        let btnStyle = styles.hiddenCamera
        if (photos ===1 || this.state.imgArr.length < photos) {
            btnStyle = styles.showCamera
        } else {
            btnStyle = styles.hiddenCamera
        }
        return (
            <View style={[this.props.style, { flex: 1 }]}>
                <View style={{ marginRight: 10, flexWrap: 'wrap', paddingLeft: 10, flexDirection: 'row' }}>
                    {this.state.imgArr.map((photo, index) => {
                        let source = { uri: photo }
                        return (
                            <View  key={`image-${index}`} style={{ width: '25%' }}>
                                <TouchableNativeFeedback key={`image-${index}`} onLongPress={() => {
                                    this.setState({
                                        delIndex: `${index}`
                                    })
                                    this.showActionSheet()
                                }}>
                                    <View>
                                        <Image
                                            style={styles.image}
                                            source={source}
                                            resizeMode={"contain"}
                                        />
                                    </View>

                                </TouchableNativeFeedback>
                            </View>
                        )
                    })
                    }
                    <View style={[{ width: '25%' }, btnStyle]}>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                console.log('----------',(video&&video===true))
                                if(video&&video===true){
                                    this.VideoActionSheet.show();
                                }else{
                                    this.showImagePicker()
                                }
                            }}
                            >
                            <View style={[styles.cameraBtn]}>
                                <Icon name="ios-add" color="#aaa" size={50} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <ActionSheet
                    ref={o => this.VideoActionSheet = o}
                    options={['图片','视频', '取消']}
                    destructiveButtonIndex={2}
                    cancelButtonIndex={2}
                    onPress={(index) => { 
                        console.log(index)
                        if(index === 0){ // 图片
                            this.showImagePicker();
                        }else if(index === 1){// 视频
                            Router.navigate('CameraRecordScreen',{callback:(u)=>this.getMp4(u)});
                        }
                    }}
                />
                {/* <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['删除', '取消']}
                    destructiveButtonIndex={0}
                    cancelButtonIndex={1}
                    onPress={(index) => { this.deleteFile(index) }}
                /> */}

            </View>
        )
    }

    getMp4(uri){
        if(uri){
            //"file:///data/data/com.growthapp/cache/Camera/1f96bb7f-d89f-401a-8d70-219640b3c121.mp4"
            this.state.imgArr.push(uri)
            if(this.props.photos===1){
                this.state.imgArr=[uri]
            }
            let files = this.state.files
            if(this.props.photos===1){
                files=[]
            }
            let fileName =uri.substring(uri.lastIndexOf("/")+1);
            console.log(fileName,uri)
            RNFS.readFile(uri, 'base64')
                .then((content) => {
                    // content 为base64数据
                    console.log("content",content)
                    files.push({
                        fileCode: content,
                        fileName: fileName
                    })
                    this.setState({
                        files: files
                    })
                })
                .catch((err) => {
                    console.log("reading error: " + err);
                });
        }
        
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let uri;
                if (Platform.OS === 'android') {
                    uri = response.uri
                } else {
                    uri = response.uri.replace('file://', '')
                }
                this.state.imgArr.push(uri)
                if(this.props.photos===1){
                    this.state.imgArr=[uri]
                }
                let file = response.data;
                this.setState({
                    loading: true
                });
                let files = this.state.files
                if(this.props.photos===1){
                    files=[]
                }
                files.push({
                    fileCode: file,
                    fileName: response.fileName
                })
                console.log(files)
                this.setState({
                    files: files
                })
            }
        });
    }
    deleteFile(idx) {
        if (idx === 0) {
            let index = this.state.delIndex
            let imgArr = this.state.imgArr
            let files = this.state.files
            imgArr.remove(index)
            files.remove(index)
            this.setState({
                file: files,
                imgArr: imgArr
            })
        }
    }

    getFiles = () => {
        console.log(this.state.files)
        return this.state.files
    }
}

const styles = StyleSheet.create({
    hiddenCamera: {
        display: 'none'
    },
    showCamera: {
        display: 'flex'
    },
    image: {
        // marginRight:10,
        height: 80,
        width: '100%'
        // width: 80,
    },
    cameraBtn: {
        padding: 5,
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 8,
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#aaa'
    },
    cameraBox: {
        flexDirection: "row"
    }
});

export default CameraButton;