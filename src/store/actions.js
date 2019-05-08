/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USER_INFO,RECEIVE_WORLD
} from './mutation-types'
 import {
  // reqPwdLogin
} from '../api'
import {reqWorld} from "../api";

export default {
  //异步获取地址
  // async getAddress ({commit,state}){
  //   //发送异步ajax请求
  //   const geohash=state.latitude+','+state.longitude
  //  const result=await reqAddress(geohash)
  //   //提交一个mutation
  //   if (result.code===0){
  //     const address=result.data
  //     commit(RECEIVE_ADDRESS,{address})
  //   }
  // },
  // //异步获取食品分类列表
  // async getCategorys ({commit}){
  //   //发送异步ajax请求
  //   const result=await reqFoodCategorys()
  //   //提交一个mutation
  //   if (result.code===0){
  //     const categorys=result.data
  //     commit(RECEIVE_CATEGORYS,{categorys})
  //   }
  // },
  // //异步获取商家列表
  // async getShops ({commit,state}){
  //   //发送异步ajax请求
  //   const {longitude,latitude}=state
  //   const result=await reqShops(longitude,latitude)
  //   //提交一个mutation
  //   if (result.code===0){
  //     const shops=result.data
  //     commit(RECEIVE_SHOPS,{shops})
  //   }
  // },

  //同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },

  //异步
  async getWorld({commit}) {
    const result=await reqWorld()
    const world=result.results
    commit(RECEIVE_WORLD,{world})
  }

}
