import axios from 'axios';
import * as qs from 'qs';
import {baseUrl, apiRoute} from '../../config/global'
export type TExtendsClassProps = {
  baseURL?: string;
  devMode?: boolean;
}
type TMethod = 'get'| 'post' | 'patch' | 'put' | 'delete' | string;
type THeader = {
  [key:string]: string
}

type TGetParams = {
  [key:string]: any
}

type TBody = {
  [key:string]: any
}

type TAxiosConfig = {
  url: null | string;
  method: TMethod;
  baseURL?: string;
  headers: THeader;
  params?: TGetParams;
  data?: TBody;
}

export interface ICRUDParams {
  url?: string;
  route: string;
  getParams?: TGetParams;
  bodyParams?: TBody;
  headers?: THeader;
  formData?: boolean;
  devMode?: boolean;
}

interface IRequestParams extends ICRUDParams {
  method: TMethod;
}

export type TRequestResult = {
  statusText: string;
  status: number;
  data: any;
}

 export default class BaseApi {

  private _methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
  };
  private _axios = null
  //_requestDevMode = false;

  static instanse = null;

  static getBaseUrl(){
    return baseUrl + apiRoute;
  }

  static getInstance(){
    if (!BaseApi.instanse) {
      BaseApi.instanse = new BaseApi(BaseApi.getBaseUrl());
    }
    return BaseApi.instanse;
  }

  constructor(baseURL){
    if (!BaseApi.instanse) {
      this._axios = axios.create({
        baseURL: baseURL || BaseApi.getBaseUrl(),
        headers: {
          "Accept":"application/json; charset=utf-8",
          "X-Requested-With": "XMLHttpRequest",
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, {arrayFormat: 'brackets'});
        },
      });
      BaseApi.instanse = this;
    }
    return BaseApi.getInstance();
  }

  _isMethodExist(method: TMethod): boolean {
    switch(method) {
      case this._methods.GET:
        return true;
      case this._methods.POST:
        return true;
      case this._methods.PUT:
        return true;
      case this._methods.DELETE:
        return true;
      default:
        return false;
    }
  }

  async _getRequest({url = null, method, route, getParams, bodyParams, headers = {}, formData = false, devMode = false}: IRequestParams): Promise<TRequestResult> {
    const correctUrlRegExp = /^(http|https):\/\//i;
    if (!BaseApi.getInstance()._isMethodExist(method)) {
      throw new Error([`This is not correct method ${method}`].join('; '));
    }

    const config: TAxiosConfig = {
      url: route,
      method,
      headers:{
        ...headers,
        "Content-Type": formData ? "multipart/form-data" : "application/json"
      },
    };

    if (url && correctUrlRegExp.test(url)) {
      config.baseURL = url;
    }

    if (getParams && method === BaseApi.getInstance()._methods.GET) {
      config.params = getParams;
    }

    if (bodyParams && (method === BaseApi.getInstance()._methods.POST || method === BaseApi.getInstance()._methods.PUT || BaseApi.getInstance()._methods.DELETE || BaseApi.getInstance()._methods.PATCH)) {
      config.data = bodyParams;
    }
    return await BaseApi.instanse._axios.request(config).then( response => {
      console.log(response)
      const {
        data,
        status,
        statusText,
      } = response;
      const rezult: TRequestResult = {
        statusText,
        status,
        data
      };
      return rezult;
    });
  }

  _requestErrorHandler(errorResponse){
    console.dir(errorResponse.response, 'error');
    if (process.env.NODE_ENV === 'development') {
      console.dir(errorResponse.response, 'error');
    }
    return errorResponse.response;
  }

  protected async _get({url, route, getParams, headers, devMode}: ICRUDParams): Promise<TRequestResult> {
    return await BaseApi.getInstance()._getRequest({url, method: BaseApi.getInstance()._methods.GET, route, getParams, headers, devMode})
      .then(rezult => rezult).catch(BaseApi.getInstance()._requestErrorHandler);
  }

  protected async _insert({url, route, bodyParams, headers, formData, devMode}: ICRUDParams): Promise<TRequestResult> {
    return await BaseApi.getInstance()._getRequest({url, method: BaseApi.getInstance()._methods.POST, route, bodyParams, headers, formData, devMode})
      .then(rezult => rezult).catch(BaseApi.getInstance()._requestErrorHandler);
  }

  protected async _update({url, route, bodyParams, headers, formData, devMode}: ICRUDParams): Promise<TRequestResult> {
    return await BaseApi.getInstance()._getRequest({url, method: BaseApi.getInstance()._methods.PUT, route, bodyParams, headers, formData, devMode})
      .then(rezult => rezult).catch(BaseApi.getInstance()._requestErrorHandler);
  }

  protected async _delete({url, route, headers, devMode, bodyParams}: ICRUDParams): Promise<TRequestResult> {
    return await BaseApi.getInstance()._getRequest({url, method: BaseApi.getInstance()._methods.DELETE, route, headers, devMode, bodyParams})
      .then(rezult => rezult).catch(BaseApi.getInstance()._requestErrorHandler);
  }

}
