import {RNToAndroid} from '../native/index'

import storage from '../storage/index'
import Utils from '../common/Utils'


let host = ''

/**
 * API 请求
 */
async function apiFetch (method, url, params, contentType) {
    Utils.showLoading();
    let token
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
    url =  Host()+url;
    if(global.ISDEBUG){
        console.log("==========发起请求(start)============")
        console.log("====url====",url,method,params)
        console.log("==========发起请求(end)============")
        return new Promise(function (resolve, reject) {reject({ status: 0 });  })
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
                }
                if (response.ok) {  
                    return response.json(); 
                } else {  
                    reject({status:response.status})  
                }  
            })
            .then((response) => {
                json = response.bean
                if(global.ISDEBUG){
                    console.log(json)
                    console.log("==========返回数据(end)============")
                }
                resolve(json);
            }) 
            .catch((err)=> {
                Utils.hideLoading();
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
      return apiFetch('POST', url, params)
    }
  }