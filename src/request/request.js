import axios from "axios";
import { ElMessage } from 'element-plus'
import router from "@/router";

const baseURL = '/api';
const instance = axios.create({baseURL})

instance.interceptors.response.use(
    (result) => {
        // 检查是否是文件下载请求
        if (result.config.isDownload) {
            return result; // 直接返回原始响应
        }
        //判断业务状态
        if(result.data.code === 1){
            return result.data;
        } else {
            ElMessage({
                message: result.data.msg ? result.data.msg : "发生错误！",
                type: 'error',
            })
        }
        return Promise.reject(result.data)
    },
    err=>{
        // 401 token过期
        if (err.response.status == 401) {
            ElMessage({
                message: "请先登录!",
                type: 'error',
            })
            router.push("/")
        }
        return Promise.reject(err);
    }
)

export default instance;