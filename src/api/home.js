import request from '@/utils/request'

export const getSwiper = () => {
  return request({
    url: 'home/swiper'
  })
}

export const getHotCity = () => {
  return request({
    url: 'area/hot'
  })
}

export const allCity = () => {
  return request({
    url: 'area/city',
    params: {
      level: 1
    }
  })
}

export const houseGroup = (id) => {
  return request({
    url: 'home/groups',
    params: {
      area: id
    }
  })
}
