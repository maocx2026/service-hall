import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import {URLSearchParams} from "url";

/**
 * 获取 access_token
 */
function getAccessToken() {
  return Cookies.get('access_token') || '';
}

// 获取年龄标签
export function getAgeTags() {
  return axios({
    url: '/api/appdic/getAgeTags',
    method: 'get',
    params: {
      access_token: getAccessToken()
    }
  });
}

export function getBookDetail_Search(metaid: string) {
  return axios({
    url: '/api/appdic/getBookDetail_Search',
    method: 'get',
    params: {
      metaid:metaid,
      access_token: getAccessToken()
    }
  });
}

//  点一级-》变二级
export function getClass2_ByClass1Age(class1List: string[], ageList?: string[]) {
  const class1Str = class1List.join(',');
  const ageStr = ageList ? ageList.join(',') : '';

  const param = qs.stringify({
    class1_list: class1Str,
    age_list: ageStr,
    access_token: getAccessToken()
  });

  return axios({
    url: '/api/appdic/getClass2_ByClass1Age',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: param,
  });
}

//点年龄-》变一级
export function getClass1ByAge (ageList: string[]) {
  // 支持 0 个、1 个或多个一级分类
  const ageStr = ageList.join(',');
  return axios({
    url: '/api/appdic/getClass1ByAge',
    method: 'get',
    params: {
      age_list: ageStr,
      access_token: getAccessToken()
    },
  });
}

//点年龄-》变一级、二级
export function getClass1Class2_ByAge (ageList: string[]) {
  // 支持 0 个、1 个或多个一级分类
  const ageStr = ageList.join(',');
  return axios({
    url: '/api/appdic/getClass1Class2_ByAge',
    method: 'get',
    params: {
      age_list: ageStr,
      access_token: getAccessToken()
    },
  });
}

export function getClass2ByAge (ageList: string[]) {
  // 支持 0 个、1 个或多个一级分类
  const ageStr = ageList.join(',');
  return axios({
    url: '/api/appdic/getClass2ByAge',
    method: 'get',
    params: {
      age_list: ageStr,
      access_token: getAccessToken()
    },
  });
}






export function searchByTags(class2List: string[],
                             ageList?: string[],
                             pageNo: number = 1,
                             pageSize: number = 10    ) {
  const class2Str = class2List.join(',');
  const ageStr = ageList ? ageList.join(',') : '';

  const param = qs.stringify({
    class2_list: class2Str,
    age_list: ageStr,
    pageNo,                 // 后端分页字段
    pageSize,               // 后端分页字段
    access_token: getAccessToken()
  });

  return axios({
    url: '/api/appdic/searchByTags',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: param,
  });
}
