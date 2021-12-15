import {axios} from '@/utils/request'

const api = {
  recommendPre: '/api/v3/recommend',
  portraitPre: '/api/v3/userPortrait'
};

export function sendUserBehaviorInfoAPI(data) {
  return axios({
    url: `${api.portraitPre}/${data.userid}/${data.carid}/${data.behaviorType}`,
    method: 'post'
  })
}


export function getRecommendCarListByUserIdAPI(data) {
  return axios({
    url: `${api.recommendPre}/getRecommendCars/${data}`,
    method: 'get'
  })
}

export function getHotCarListImplAPI(data) {
  return axios({
    url: `${api.recommendPre}/getHotCars/${data.page}/${data.pagesize}`,
    method: 'get'
  })
}
