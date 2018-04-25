import axios from 'axios';

let base = '';//本地js开发后台地址
// let base = 'http://120.24.73.75:8200/CI/index.php';//服务器后台地址
// let base = 'http://localhost/CI/index.php';//本地后台地址
// export const test = params => { return axios.post(`${base}/Message/show`).then(res => res.data);};//调试
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getInfusion = params => { return axios.get(`${base}/getInfusion` , {params: params})};

export const getPatInfo = params => { return axios.get(`${base}/getPatInfo` , {params: params})};

export const getOEOrderItm = params => { return axios.get(`${base}/getOEOrderItm` , {params: params})};


// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };