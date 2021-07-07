import Axios, { Method} from "axios";
import humps from "humps";
export interface IApiResponse<T> {
  status: number
  body: T
}
const baseURL:string="http://127.0.0.1:3000"
function getRequest(url:string):Promise<IApiResponse<any>>{
  const headers: { [key: string]: string } = {};
  headers['Content-Type'] = 'application/json';
  return new Promise<any>(resolve => {
    Axios.get(
      baseURL + url,
    )
      .then(next => {
        resolve({
          body: humps.camelizeKeys(next.data),
          status: next.status
        })
      })
      .catch(error => {
        try {
          resolve({
            status: error.response.status,
            body: humps.camelizeKeys(error.response.data)
          });
        } catch (e) {
          resolve({
            status: 500,
            body: e
          });
        }
      });
  });
}
function apiCall(url: string, method: Method,data?: { [key: string]: any }): Promise<IApiResponse<any>> {
  const headers: { [key: string]: string } = {};
  headers['Content-Type'] = 'application/json';
  return new Promise<any>(resolve => {
    Axios(
      {
        url: baseURL + url,
        method: method,
        headers: headers,
        data: data ? JSON.stringify(data) : undefined
      }
    )
      .then(next => {
        resolve({
          body: humps.camelizeKeys(next.data),
          status: next.status
        })
      })
      .catch(error => {
        try {
          resolve({
            status: error.response.status,
            body: humps.camelizeKeys(error.response.data)
          });
        } catch (e) {
          resolve({
            status: 500,
            body: e
          });
        }
      });
  });
}
function postRequest(url: string, data?: { [key: string]: any }): Promise<IApiResponse<any>> {
  return apiCall(url, "POST", data);
}

function putRequest(url: string, data?: { [key: string]: any }) {
  return apiCall(url, "PUT", data);
}

function deleteRequest(url: string, data?: { [key: string]: any }) {
  return apiCall(url, "DELETE", data);
}

export {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
}