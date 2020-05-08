import { request } from './base';

export const getAllMessages = () => {
  return request({
    method: 'get',
    url: '/message/all',
    params: {},
  });
}