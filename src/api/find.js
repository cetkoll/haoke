import request from '@/utils/request'
export const getCitySon = (id) => {
  return request({
    url: 'area',
    params: {
      id
    }
  })
}

export const allCitySon = (id) => {
  return request({
    url: 'area/map',
    params: {
      id
    }
  })
}
