/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_USER_INFO,
  RECEIVE_WORLD,
  RECEIVE_HOMEMESSAGE
} from './mutation-types'

export default {
 [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo
  },
  //
  [RECEIVE_WORLD](state,{world}){
   state.world=world
  },

  [RECEIVE_HOMEMESSAGE](state,{homeMessage}){
    state.homeMessage=homeMessage
  },
}
