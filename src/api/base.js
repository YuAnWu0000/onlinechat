import axios from 'axios'
import { Notification } from 'element-ui';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // withCredentials: true,
});

export const request = (options) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(function (res) {
        resolve(res.data.data);
      })
      .catch(function (err) {
        console.log(err.response);
        Notification.error({
          title: `${err.response.status} ${err.response.statusText}`,
          message: err.response.data
        });
        reject(err.response);
      })
  });
}