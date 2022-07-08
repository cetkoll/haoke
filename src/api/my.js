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

export const getMyFavorite = () => {
  return request({
    url: '/user/favorites'
  })
}

export const getMy = () => {
  return request({
    url: 'user/houses'
  })
}

export const getDetails = (code) => {
  return request({
    url: `/houses/${code}`
  })
}

export const addLike = (code) => {
  return request({
    method: 'POST',
    url: `user/favorites/${code}`
  })
}

export const delLike = (code) => {
  return request({
    method: 'DELETE',
    url: `user/favorites/${code}`
  })
}
