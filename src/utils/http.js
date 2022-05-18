import axios from "axios";
import myLocalStorage from "../constants/myLocalStorage";

//api cần token : user profile... (call api đính kèm token)
//api ko cần token: products..

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response
        const result = { ...response.data, status: response.status };
        return result;
      },
      ({ response }) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const result = { ...response.data, status: response.status };
        return Promise.reject(result);
      }
    );

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        let accessToken = localStorage.getItem(myLocalStorage.accessToken);
        if (accessToken) {
          config.headers.authorization = accessToken;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error.response);
      }
    );
  }

  get(url, config = null) {
    return this.instance.get(url, config);
  }

  post(url, data, config = null) {
    return this.instance.post(url, data, config);
  }

  put(url, data, config = null) {
    return this.instance.put(url, data, config);
  }

  delete(url, data, config = null) {
    return this.instance.delete(url, {
      data,
      ...config,
    });
  }
}

const http = new Http();

export default http;



