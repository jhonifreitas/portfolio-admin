import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { CookieService } from '../cookie.service';

export abstract class BaseApi {

  protected host = process.env.REACT_APP_HOST_API;

  protected async get(endpoint: String, params?: Object, reqOpts?: AxiosRequestConfig): Promise<any> {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders
      }
    }

    if (params) {
      reqOpts.params = params;
    }

    return axios.get(`${this.host}/${endpoint}`, reqOpts).then(res => {
      return this.transformTimestampToDate(res.data);
    });
  }

  protected async post(endpoint: String, data: Object, reqOpts?: AxiosRequestConfig): Promise<any> {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders
      }
    }

    return axios.post(`${this.host}/${endpoint}`, data, reqOpts).then(res => {
      return this.transformTimestampToDate(res.data);
    });
  }

  protected async put(endpoint: String, data: Object, reqOpts?: AxiosRequestConfig): Promise<any> {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders
      }
    }

    return axios.put(`${this.host}/${endpoint}`, data, reqOpts).then(res => {
      return this.transformTimestampToDate(res.data);
    });
  }

  protected async patch(endpoint: String, data?: Object, reqOpts?: AxiosRequestConfig): Promise<any> {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders
      }
    }

    return axios.patch(`${this.host}/${endpoint}`, data, reqOpts).then(res => {
      return this.transformTimestampToDate(res.data);
    });
  }

  protected async delete(endpoint: String, data?: Object, reqOpts?: AxiosRequestConfig): Promise<any> {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders
      }
    }
    if (data) reqOpts.data = data;

    return axios.delete(`${this.host}/${endpoint}`, reqOpts).then(res => {
      return this.transformTimestampToDate(res.data);
    });
  }

  protected get getHeaders() {
    const httpHeaders: AxiosRequestHeaders = {};
    const token = CookieService.getCookie('token');
    if (token) httpHeaders.authorization = `Bearer ${token}`;
    return httpHeaders;
  }

  private transformTimestampToDate(obj: any): any {
    if (typeof obj === 'string' && Date.parse(obj) && new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/).test(obj))
      return new Date(obj);

    if (null === obj || "object" !== typeof obj) return obj;

    if (obj instanceof Array) {
      const copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.transformTimestampToDate(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      const copy: any = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr))
          copy[attr] = this.transformTimestampToDate(obj[attr]);
      }
      return copy;
    }

    throw new Error(
      "The object could not be transformed! Type is not supported."
    );
  }
}
