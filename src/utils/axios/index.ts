import axios from 'axios'

// 创建 axios 请求实例
const serviceAxios = axios.create({
    timeout: 10000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
});

// 创建请求拦截
serviceAxios.interceptors.request.use(
    (config) => {
        // 设置请求头
        if (!config.headers["content-type"]) { // 如果没有设置请求头
            if (config.method === 'post') {
                config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
            } else {
                config.headers["content-type"] = "application/json"; // 默认类型
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error).then();
    }
);

serviceAxios.interceptors.response.use(
    (response) => {
        return response
    },
    error => {
        return Promise.reject(error)
    },
)

export default serviceAxios
