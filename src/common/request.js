

import axios from 'axios';
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus';
import store from '@/store';
import Common from "./common.js";
const $router = useRouter();
export default{
	get(url, data) {
		return this.newPromise('get', url, data)
	},
	post(url, data) {
		return this.newPromise('POST', url, data)
	},
	// Promise
	newPromise(methods, url, data) {
		store.commit('loadingShow',true)
		var header ={}
    var token = Common.getToken('access_token') || ''
    if (token) {
      header.Authorization ='Bearer '+token
    }
		return new Promise((resolve, reject) => {
        let objs = {
					url: process.env.VUE_APP_URL+ url,
					headers: header || null,
					method: methods,
				}
				axios(methods == 'get' ? {...objs, params: data}: {...objs, data: data}).then((res)=>{
         
					if (res.status >= 200 && res.status <= 399) {
						if (res.data.code === 401) {
              // ElMessage({ showClose: true, message: res.data.msg, type: 'warning'});
              Common.removeToken('userInfo')
              Common.removeToken('access_token')
              store.commit('setUserInfo', null)
              $router.push('/home')
							return
						} else if(res.data.code === 500){
              ElMessage({ showClose: true, message: res.data.msg, type: 'warning'});
              return
            }
						resolve(res.data);
            store.commit('loadingShow',false)
					} else {
						reject(res);
					}
				}).catch((err)=>{
          console.log(err);
          store.commit('loadingShow',false)
          if(err.response&&err.response.data&&err.response.data.code===401){
            ElMessage({ showClose: true, message: err.response.data.msg, type: 'warning'});
            Common.removeToken('userInfo')
            Common.removeToken('access_token')
            store.commit('setUserInfo', null)
            $router.push('/home')
          }
          reject(err);
        }).finally(()=>{
					// store.commit('loadingShow',false)
				})
		})
	},
	

}
