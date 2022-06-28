import request from '@/utils/request'
export const getLogin = ({ password, username }) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data: {
      password,
      username
    }
  })
}
