/*
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-13 09:09:46
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-14 18:29:25
 */
import request from '@/config/request'

// 2.出单/支付系统业务登记
export function recon_record(data) {   //请求接口
  return request({
    url: `/recon/record`,
    method: `post`,
    data
  })
}
// 3.出单/支付系统支付结果登记

export function recon_result(data) {   //请求接口
  return request({
    url: `/recon/result`,
    method: `post`,
    data
  })
}
// 4.核心系统业务登记
export function recon_core(data) {   //请求接口
  return request({
    url: `recon/core`,
    method: `post`,
    data
  })
}
// 5.核心系统批量登记
export function recon_batchcore(data) {   //请求接口
  return request({
    url: `/recon/batchcore`,
    method: `post`,
    data
  })
}
// 6.web端：业务主体信息核对查询
export function recon_business_list(data) {   //请求接口
  return request({
    url: `/recon/business/list`,
    method: `get`,
    data
  })
}
// 7.web端:对账主体信息核对查询

export function recon_recon_list(data) {   //请求接口
  return request({
    url: `/recon/recon/list`,
    method: `get`,
    data
  })
}
// 8.web端:账务主体信息核对查询
export function recon_account_list(data) {   //请求接口
  return request({
    url: `/recon/account/list`,
    method: `get`,
    data
  })
}


// export function getInfo(token) {
//   return request({
//     url: `/user/info`,
//     method: `get`,
//     params: { token }
//   })
// }


//2.出单/支付系统业务登记
// let ReconRecordParams = {

// };
// recon_record(ReconRecordParams).then(res => {
//   console.log(res);
// })
//   .catch(() => {
//   });
