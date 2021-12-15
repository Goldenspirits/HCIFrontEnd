import {axios} from '@/utils/request'

const api = {
  userPre: '/api/user'
};

export function loginAPI(data) {
  return axios({
    url:`/login`,
    // url:`/api/user/login`,
    method: 'POST',
    data
  }).catch((r) => {
    console.log("catch: ", r)
  })
}

export function logoutAPI(data) {
  return axios({
    url:`/logout`,
    method: 'POST',
    data
  }).catch((r) => {
    console.log("catch: ", r)
  })
}


export function registerAPI(data) {
  console.log(data)
  return axios({

    url: `${api.userPre}/register/individual`,
    method: 'POST',
    data
  })
}

export function getUserInfoAPI(id) {
  return axios({
    url: `${api.userPre}/${id}/userInfo`,
    method: 'GET'
  });
}

export function updateUserInfoAPI(data) {
  return axios({
    url: `${api.userPre}/${data.id}/userInfo/update`,
    method: 'POST',
    data
  })
}

export function getuserpicAPI(id) {
  return axios({
    url: `${api.userPre}/${id}/userInfo/pic`,
    method: 'GET'
  })
}



