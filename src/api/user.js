/**
 * 用户请求模块
 *
 */
import request from '@/utils/request'

/**
 * 用户登录
 */

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码，
 * 注意：手机号每分钟只能发送一次
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
