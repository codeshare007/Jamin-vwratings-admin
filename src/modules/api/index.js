import axios from 'axios';
import Cookie from 'js-cookie';

import apiAuth from './methods/auth';
import apiProfile from './methods/profile';

import apiDashboard from './methods/dashboard';
import apiAvis from './methods/avis';
import apiAvisComments from './methods/aviscomments';
import apiAvisAttachments from './methods/avisAttachments';
import apiParties from './methods/parties';
import apiPartiesComments from './methods/partiesComments';
import apiMessages from './methods/messages';
import apiAvisRatings from './methods/ratings';
import apiUsers from './methods/users';
import apiAdsCampaigns from './methods/adscampaigns';

export default {
  removeJWT() {
    Cookie.remove('access_token');
    Cookie.remove('refresh_token');
  },

  resetJWT(responseData) {
    Cookie.set('access_token', responseData.access_token);
    Cookie.set('refresh_token', responseData.refresh_token);
  },

  clean(obj) {
    for (const propName in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (!obj.hasOwnProperty(propName)) continue;
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  },

  trimCookie(cookie) {
    return cookie ? cookie.replace(/[А-Яа-я]/ig, "") : cookie;
  },

  // eslint-disable-next-line no-unused-vars
  setupInstance(store, router) {
    this.apiInstance = axios.create({
      baseURL: '/api/v1/admin/',
      headers: {
        common: {
          'Access': 'application/json',
          'Accept-Language': 'ru',
          'X-Requested-With': 'XMLHttpRequest'
        }
      },
      mode: 'cors'
    });

    this.apiInstance.interceptors.request.use(async config => {
      if (config.method === 'put' || config.method === 'post') {
        this.clean(config.data);
      }
      if (Cookie.get('access_token')) {
        config.headers.common['Authorization'] = `Bearer ${this.trimCookie(Cookie.get('access_token'))}`;
      }
      return config;
    }, async error => {
      return Promise.reject(error);
    });

    this.apiInstance.interceptors.response.use(async response => {
      return response;
    }, async (error) => {
      let code = 0;
      if (error.response)
        code = error.response.status;

      if (code === 401) {
        let errorUrl = error.response.config.url;
        let refreshToken = this.trimCookie(Cookie.get('refresh_token'));
        if (errorUrl !== 'auth/login') {
          if (errorUrl === 'auth/refresh' && refreshToken) {
            await store.dispatch('auth/RESET_PROFILE');
            router.push({name: 'auth.signin'});
          } else {
            await store.dispatch('auth/REFRESH_TOKEN', {
              refresh_token: refreshToken,
            });
          }

          if (store.getters['auth/loggedIn']) {
            try {
              error.response.config.headers.Authorization = `Bearer ${this.trimCookie(Cookie.get('access_token'))}`;
              let response = await axios.request(error.response.config);
              await Promise.resolve(response);
              return response;
            } catch (error) {
              Promise.reject(error);
              return error;
            }
          }
        }
      }

      return Promise.reject(error);
    });
  },

  install(Vue, store, router) {
    this.app = Vue.prototype;
    this.setupInstance(store, router);

    const repositories = {
      auth: apiAuth(this.apiInstance),
      profile: apiProfile(this.apiInstance),
      adminDashboard: apiDashboard(this.apiInstance),
      messages: apiMessages(this.apiInstance),
      users: apiUsers(this.apiInstance),
      avis: apiAvis(this.apiInstance),
      avisComments: apiAvisComments(this.apiInstance),
      parties: apiParties(this.apiInstance),
      partiesComments: apiPartiesComments(this.apiInstance),
      avisRatings: apiAvisRatings(this.apiInstance),
      adminAdsCampaigns: apiAdsCampaigns(this.apiInstance),
      avisAttachments: apiAvisAttachments(this.apiInstance)
    };

    Vue.prototype.$api = repositories;
    Vue.prototype.$apiInstance = this.apiInstance;
    store.$api = repositories;
    store.resetJWT = this.resetJWT;
    store.removeJWT = this.removeJWT;
  },
};
