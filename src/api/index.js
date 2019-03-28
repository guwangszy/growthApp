import {RNToAndroid} from '../native/index'

import storage from '../storage/index'
import Utils from '../common/Utils'

import Router from '../router/Index';


let host = global.nanji_host
function Host(){
  host = !global.isLy?global.nanji_host:global.luoyang_host
  return host
}

/**
 * API 请求
 */
async function apiFetch (method, url, params, contentType) {
    Utils.showLoading();
    let token
    // 重置手势密码失效时间
    Utils.setHandPwdtoken();
    await storage.getItem('accesstoken').then(ret => {
        token = ret
    }).catch(err => {
        token = ''
    })
    let headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "accesstoken":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
    if(contentType){
        headers["Content-Type"]=contentType;
    }
    // console.log(headers)
    url =  Host()+url;
    if(global.ISDEBUG){
        console.log("==========发起请求(start)============")
        console.log("====url===="+url,method)
        // console.log("====method===="+method)
        // console.log("====body===="+(method === 'POST' ? params : null))
        // console.log("==========发起请求(end)============")
    }
    return new Promise(function (resolve, reject) {  
        fetch(url, {  
              method: method,  
              headers: headers,  
              body: method === 'POST' ? params : null,  
            }) 
            .then((response) => { 
                Utils.hideLoading();
                if(global.ISDEBUG){
                    console.log("==========返回数据(start)============")
                    // console.log("====response对象====",response)
                }
                if (response.ok) {  
                    return response.json(); 
                } else {  
                    reject({status:response.status})  
                }  
            })
            .then((response) => {
                if(response.returnCode === 0){ // 成功
                    return RNToAndroid.decode3Des(response.bean).then((data)=> { 
                        if(global.ISDEBUG){
                            console.log("====解密====",JSON.parse(data))
                        }
                        return JSON.parse(data);
                    }, (code, message)=> {
                        console.log("====解密失败====",message)
                    })
                }
            }) 
            .then((json) => {
                if(global.ISDEBUG){
                    console.log("==========返回数据(end)============")

                }
                if (json.returnCode == '42001') {
                    storage.removeItem('userInfo');
                    storage.removeItem('usrId');
                    storage.removeItem('accesstoken');
                    storage.removeItem('handPwd');
                    storage.removeItem('provAndCity');
                    storage.removeItem('provcode');
                    Utils.showToast("登录已过期,请重新登录")
                    Router.navigate('Login',{});
                }
                console.log(json)
                resolve(json);
            }) 
            .catch((err)=> {
                Utils.hideLoading();
                // Utils.showToast('connection timed out')
                // console.log("请求出错", err)
                // Utils.showToast('请求失败')
                reject({ status: -1 }); 
            }) 
        }
    ) 
}
/**
 * 检查空值，是空就删除该属性
 * @param {*} params
 */
function checkParams(params){
    for(let key in params){
        const value = params[key];
        if( value === '' ||
            value === undefined ||
            ( Object.prototype.toString.call(value) === '[object Array]' && value.length ==0 )
        ){
            delete params[key];
        }
    }
    return params;
}
// 返回在fetch模板中的调用接口
export default {
    
    get: function (url) {
      return apiFetch('GET', url)
    },
    post: function (url, params) {
        if(params){
            params = checkParams(params);
            if(global.ISDEBUG){
                console.log("====请求参数====",params)
            }
            return RNToAndroid.encode3Des(params).then((data)=> { 
               return apiFetch('POST', url, data)
            }, (code, message)=> {
                console.log("====加密失败====",message)
            });
        }else{
            return apiFetch('POST', url, params)
        }
    },
    upload: function (url, params){
        if(params){
           // contentType='multipart/form-data;charset=utf-8'
            params = checkParams(params);
            return RNToAndroid.encode3Des(params).then((data)=> { 
               return apiFetch('POST', url, data, contentType)
            }, (code, message)=> {
                console.log("====加密失败====",message)
            });
        }
    }
  }