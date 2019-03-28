import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import sync from './sync';

/**
 * 
 */
let storage =  new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: sync  
})

export default {
    
    /**
     * 设置缓存
     * @param {string} key 必传 唯一标识
     * @param {any} data  数据 
     * @param {an} expires 过期时间  不传默认永久  单位：ms
     * @param {string} id  非必传 标识
     */
    setItem(key,data,expires,id){
          
        let setValue = JSON.stringify(data)
        if(id){
            storage.save({
                key:key,
                id:id,
                data:setValue,
                expires:expires ? expires:null
            })
        }else{
            storage.save({
                key:key,
                data:setValue,
                expires:expires ? expires:null
            })
        }
 
    },
    /**
     * 根据key 或者 key-id的到数据
     * @param {string} key 必传
     * @param {string} id  可为空
     */
     getItem(key,id){
          
        if(id){
           return storage.load({
                key:key,
                id:id
            }).then(ret =>{
                return JSON.parse(ret)
            }).catch(err => {
                throw err;
            })
        }else{
            return storage.load({
                key:key
            }).then(ret =>{
                return JSON.parse(ret)
            }).catch(err => {
                throw err;
            })
        }
    },                             
    /**
     * 删除单个数据
     * @param {string} key 删除kay所对应的数据，必传
     * @param {string} id 删除id对应的数据 若删除的数据中有id，则必传
     */
    removeItem(key,id){
          
        if(id){
            storage.remove({
                key:key,
                id:id
            })
        }else{
            storage.remove({
                key:key
            })
        }
    },
    /**
     * 清空所有map，移除所有key-id数据（但会保留只有key的数据）
     * 测试 刷新之后有效，所以应该是在退出app时执行的
     */
    clearMaps(){
          
        storage.clearMap();
    },
    /**
     * 清空某个key下的所有数据（仅key-id数据）
     * @param {} key  
     * @param {} key 
     */
    clearMapForKey(key){
          
        storage.clearMapForKey(key)
    },
    /**
     * 获取key下的 所有数据(仅key-id数据)
     * @param {} key  
     * @param {} key 
     */
    getAllDataForKey(key){
          
        return storage.getAllDataForKey(key).then(ret => {
            return ret
        })
    },
    /**
     * 获取某个key下的所有ID（仅key-id数据）
     * @param {} key  
     * @param {} key 
     */
    getIdsForKey(key){
          
        return storage.getIdsForKey(key).then(ids => {
            return ids;
        })
    }
}