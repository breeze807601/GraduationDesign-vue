<template>
    <el-card class="u-login">
        <el-card class="u-login-card" >
            <template #header>
                <div class="u-container">
                    <span>幸福小区系统-住户登录</span>
                </div>
            </template>
            <div>
                <el-form :rules="rules" :model="form" size="large" ref="formRef">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入手机号"  :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" :prefix-icon="Lock" show-password />
                    </el-form-item>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item>
                                <el-link @click="toAdminLogin()"  :underline="false">忘记密码 ?</el-link>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="15">
                            <el-form-item>
                                <el-link @click="toAdminLogin()"  :underline="false">管理登录 →</el-link>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item >
                        <el-button class="btn btn-loading" type="primary" :loading="loading" size="large" @click="login()" round>
                            <span v-if="!loading">登录</span>
                            <span v-else>登录中...</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </el-card>
</template>

<script setup>
import {reactive,ref} from "vue";
import { User,Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import request from "@/request/request";
import router from "@/router";

document.title = "幸福小区系统-登录";
document.body.style.overflow = 'hidden';
const form = reactive({
    username: '',
    password: ''
})

const formRef = ref(null);
const rules = {
  username: [{ required: true, message: '请输入手机号', trigger: 'blur' },
    {
        pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
        message: '手机号错误',
        trigger: 'blur'
    }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loading = ref(false)

async function login() {
    loading.value = true;
    formRef.value.validate((valid) => {
        if (valid) {
            // 模拟登录请求
            setTimeout(() => {
                loading.value = false;
                ElMessage.success('登录成功');
            }, 2000);
            router.push("/uHomepage")
        } else {
            ElMessage.error('登录信息有误！');
        }
    });
    loading.value = false;
}

function toAdminLogin() {
    router.push("/adminLogin")
}

</script>

<style scoped>
.u-login {
  background-image: url(//homework1015.oss-cn-beijing.aliyuncs.com/login.jpg);
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}
.u-login-card{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 450px;
    transform: translate(-50%, -50%);
}
.u-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    display: block;
    margin:  auto;
    width: 40%;
}
.btn-loading:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    margin-right: -0.0em;
}
</style>