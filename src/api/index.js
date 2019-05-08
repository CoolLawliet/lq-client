//包含n个接口请求函数的模块
//函数的返回值：promise对象
import ajax from './ajax'
// const BASE_URL='http://localhost:4000'
const BASE_URL='/api'

// 1、世界圈
export const reqWorld=()=>ajax('http://server.nsloop.com:17882/world/')
// 2、获取食品分类列表
// export const reqFoodCategorys=()=>ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
// export const reqShops=(longitude,latitue)=>ajax(BASE_URL+'/shops',{longitude,latitue})
// 4、根据用户信息登录
export const reqPwdLogin=({name,pwd,captcha})=>ajax('http://server.nsloop.com:17882/users/',{name,pwd,captcha},'POST')
// 7、发送短信验证码
// export const reqSendCode=(phone)=>ajax(BASE_URL+'/sendcode',{phone})
// 8、手机号验证码登陆
// export const reqSmsLogin=(phone,code)=>ajax(BASE_URL+'/login_sms',{phone,code},'POST')
// 9、根据会话获取用户信息
export const reqUserInfo=()=>ajax(BASE_URL+'/userinfo')
// 10、用户登出
// export const reqLogout=()=>ajax(BASE_URL+'/logout')

