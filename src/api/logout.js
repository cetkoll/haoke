import request from '@/utils/request'
export const getLogout = () => {
  return request({
    method: 'POST',
    url: 'user/logout'

  })
}
