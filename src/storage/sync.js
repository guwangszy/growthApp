
import $api from '../api/index';
import storage from './index';
import Config from '../api/Config'
const sync = {
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    async provAndCity(params) {
        // let { id, resolve, reject, } = params;
        // let usrId
        // await storage.getItem('usrId').then(ret =>{
        //     usrId=ret
        // })
        // let param= {Request:'provcode',usrId:usrId,type:'CITY'}
        // $api.post(Config.service.provcode,JSON.stringify(param)).then(response => {
        //     if (response&& response.returnCode === '0') {
        //         if(response.bean){
        //             storage.setItem('provAndCity',response.bean,null,id);
        //         }
        //         // 成功则调用resolve
        //         resolve(JSON.stringify(response.bean));
        //     }else {
        //         // 失败则调用reject
        //         reject(new Error('data parse error'));
        //     }
        // }).catch(err => {
        //     console.warn(err);
        //     reject(err);
        // });
    }
}

export default sync;
