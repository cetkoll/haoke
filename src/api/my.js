import request from '@/utils/request'
export const getLogout = () => {
  return request({
    method: 'POST',
    url: 'user/logout'

  })
}
export const getMyInfo = () => {
  return request({
    url: 'user'
  })
}
