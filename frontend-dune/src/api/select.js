import {axios} from '@/utils/request'

const api = {
  selectPre: '/api/v3/query'
};

export function changeSelectionAPI(data) {
  return axios({
    url: `${api.selectPre}/series`,
    method: 'post',
    data
  })
}

export function getCarGraphAPI(id) {
  return axios({
    url: `${api.selectPre}/series/graph/${id}`,
    method: 'get',
  })
}


