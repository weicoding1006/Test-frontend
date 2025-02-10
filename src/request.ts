// src/request.ts
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// AxiosInstance:
// Axios 實例的型別，代表透過 axios.create() 建立的物件。

// AxiosRequestConfig:
// 發送請求時的設定選項的型別，例如 headers、params 等。

// AxiosResponse:
// 請求成功回應時返回的資料格式型別，包括 data、status 等。

// import.meta.env:
// Vite 提供的用來讀取環境變數的方式，通常在 .env 檔案中定義變數，且必須以 VITE_ 為前綴才能被讀取。

// interceptors (攔截器):
// 允許你在請求或回應到達 then 或 catch 之前進行處理，如統一處理錯誤、加入 token 等。

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 從 .env 讀取 baseURL
});

//全局攔截與預處理
//攔截器會在每次 API 請求回應到達 then 或 catch 前先經過這個函式。
request.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("全域攔截器")
    return response
  },

  //這裡捕捉到任何錯誤後，使用 Promise.reject(error)
  // 將錯誤傳遞給下游（也就是你的 try/catch 或 .catch() 中）。
  (error) => {
    console.log("錯誤攔截")
    Promise.reject(error)
  }
);

export default request;
