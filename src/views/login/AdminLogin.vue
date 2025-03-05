<template>
    <el-card class="a-login">
        <el-card class="a-login-card" >
            <template #header>
                <div class="a-container">
                    <span>幸福小区系统-物业登录</span>
                </div>
            </template>
            <div>
                <el-form :rules="rules" :model="form" size="large" scroll-to-error ref="ruleRef">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入用户名"  :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" :prefix-icon="Lock" show-password />
                    </el-form-item>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item>
                                <el-link @click="isOpen = true" :underline="false"><span>忘记密码 ?</span></el-link>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="15">
                            <el-form-item>
                                <el-link @click="toLogin()"  :underline="false">← 住户登录</el-link>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item >
                        <el-button class="btn btn-loading" type="primary" :loading="loading" size="large" @click="checkForm()" round>
                            <span v-if="!loading">登录</span>
                            <span v-else>登录中...</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-dialog v-model="isOpen" :before-close="handleClose" title="忘记密码" width="600" destroy-on-close center>
            <div class="dialog-content">
                <forgot-password :isAdmin="true" @handleClose="handleClose" @close="close" />
            </div>
        </el-dialog>
    </el-card>
</template>

<script setup>
import {reactive,ref} from "vue";
import { User,Lock } from '@element-plus/icons-vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import router from "@/router";
import request from "@/request/request"
import ForgotPassword from "@/components/ForgotPassword.vue"

document.title = "幸福小区系统-登录";
document.body.style.overflow = 'hidden';
const form = reactive({
    username: '',
    password: ''
})

const ruleRef = ref(null)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
function checkForm() {
    ruleRef.value.validate(valid => {
        if (valid) {
            // 登录
            login();
        } else {
            ElMessage.error('登录信息有误！')
        }
    })
}

const loading = ref(false)

async function login() {
    loading.value = true;
    try {
        await request.post('/admin/login', form).then(res => {
            ElMessage({
                message: res.msg ? res.msg : "登录成功！",
                type: 'success',
            });
            router.push('/aHomepage')
        })
    } finally {
        loading.value = false;
    }
}

function toLogin() {
    router.push("/")
}

// 忘记密码
const isOpen = ref(false)
function handleClose() {
    ElMessageBox.confirm(
        '确定需要关闭修改密码页面吗?',
        '提示',
        {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(() => {
            isOpen.value = false;
        }).catch(() => {
            ElMessage.info('已取消')
        }
    )
}
// 修改成功后调用方法关闭窗口
function close() {
    isOpen.value = false;
}
</script>

<style scoped>
.a-login {
  background-image: url(//homework1015.oss-cn-beijing.aliyuncs.com/login.jpg);
  background-size: cover;
  width: 100%;
  height: 100%;
}
.a-login-card{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 450px;
    transform: translate(-50%, -50%);
}
.a-container{
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
.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 确保容器有足够的高度 */
  margin-top: 15px;
}
</style>