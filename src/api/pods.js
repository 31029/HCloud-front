import request from '@/utils/request'

//获取所有 pods列表 by ns  ,,增加了 页码
export function getPodsByNs(ns,page) {
  return request({
    url: '/pods?ns=' + ns + '&current=' +page,
    method: 'get',
  })
}
