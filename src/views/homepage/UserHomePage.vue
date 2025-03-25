<template>
    <div class="common-layout">
        <el-container style="height: 100vh;">
            <el-aside width="200px" style="height: 100vh;border-right: 1px solid #ccc;background-color: #304156;" >
                <el-menu :default-active="router.currentRoute.value.path" background-color="#304156" text-color="#fff" @select="handleSelect" >
                    <div class="centered-item">
                        <span class="my-font" style="font-family:华文行楷">幸&nbsp;福&nbsp;小&nbsp;区</span>
                    </div>
                    <el-menu-item index="/uMainPage">
                        <svg style="margin-right: 8px;" t="1741418748700" class="icon" viewBox="0 0 1029 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2899" id="mx_n_1741418748701" width="24" height="24"><path d="M1001.423238 494.592q21.504 20.48 22.528 45.056t-16.384 40.96q-19.456 17.408-45.056 16.384t-40.96-14.336q-5.12-4.096-31.232-28.672t-62.464-58.88-77.824-73.728-78.336-74.24-63.488-60.416-33.792-31.744q-32.768-29.696-64.512-28.672t-62.464 28.672q-10.24 9.216-38.4 35.328t-65.024 60.928-77.824 72.704-75.776 70.656-59.904 55.808-30.208 27.136q-15.36 12.288-40.96 13.312t-44.032-15.36q-20.48-18.432-19.456-44.544t17.408-41.472q6.144-6.144 37.888-35.84t75.776-70.656 94.72-88.064 94.208-88.064 74.752-70.144 36.352-34.304q38.912-37.888 83.968-38.4t76.8 30.208q6.144 5.12 25.6 24.064t47.616 46.08 62.976 60.928 70.656 68.096 70.144 68.096 62.976 60.928 48.128 46.592zM447.439238 346.112q25.6-23.552 61.44-25.088t64.512 25.088q3.072 3.072 18.432 17.408l38.912 35.84q22.528 21.504 50.688 48.128t57.856 53.248q68.608 63.488 153.6 142.336l0 194.56q0 22.528-16.896 39.936t-45.568 18.432l-193.536 0 0-158.72q0-33.792-31.744-33.792l-195.584 0q-17.408 0-24.064 10.24t-6.656 23.552q0 6.144-0.512 31.232t-0.512 53.76l0 73.728-187.392 0q-29.696 0-47.104-13.312t-17.408-37.888l0-203.776q83.968-76.8 152.576-139.264 28.672-26.624 57.344-52.736t52.224-47.616 39.424-36.352 19.968-18.944z" p-id="2900" fill="#cdcdcd"></path></svg>
                        <span>首页</span>
                    </el-menu-item>
                    <el-menu-item index="/uNotice">
                        <svg style="margin-right: 9px;" t="1741419054376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3960" width="22" height="23"><path d="M922.368 325.696c21.312 21.312 32.256 47.68 32.832 79.168v431.36c-0.576 31.488-11.52 57.728-32.832 78.72-21.312 20.992-47.68 32.064-79.168 33.28h-672c-31.488-1.152-57.92-12.224-79.168-33.28-21.312-20.992-32.256-47.232-32.832-78.72v-431.36c0.576-31.488 11.52-57.856 32.832-79.168s47.68-32.256 79.168-32.832h67.392L467.84 74.112c11.648-11.072 24.768-16.64 39.36-16.64 14.592 0 27.712 5.568 39.36 16.64l224 218.752h72.64c31.488 0.576 57.856 11.52 79.168 32.832zM820.48 454.72c0-11.648-4.544-21.888-13.568-30.656-9.024-8.768-19.392-13.44-31.04-14.016H238.592c-11.648 0.576-22.016 5.248-31.04 14.016-9.024 8.768-13.568 18.944-13.568 30.656v347.392c0 11.648 4.544 22.016 13.568 31.04 9.024 9.024 19.392 13.568 31.04 13.568h537.28c11.648 0 22.016-4.544 31.04-13.568 9.024-9.024 13.568-19.392 13.568-31.04V454.72z m-537.28 302.784h448v-257.28h-448v257.28z m117.248-459.392h213.504L507.2 197.504 400.448 298.112z" p-id="3961" fill="#cdcdcd"></path></svg>
                        <span>公告</span>
                    </el-menu-item>
                    <el-menu-item index="/uStatistics">
                        <svg style="margin-right: 9px;" t="1742629036884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="23" height="24"><path d="M992 672h-24c-4.4 0-8-3.6-8-8V136c0-4.4 3.6-8 8-8h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H580c-2.2 0-4-1.8-4-4 0-16.6-6.7-31.6-17.6-42.4C547.6 6.7 532.6 0 516 0h-8c-33.1 0-60 26.9-60 60 0 1.1-0.4 2.1-1.2 2.8-0.7 0.7-1.7 1.2-2.8 1.2H32C14.3 64 0 78.3 0 96c0 8.8 3.6 16.8 9.4 22.6 5.8 5.8 13.8 9.4 22.6 9.4h24c4.4 0 8 3.6 8 8v528c0 4.4-3.6 8-8 8H32c-17.7 0-32 14.3-32 32 0 8.8 3.6 16.8 9.4 22.6 5.8 5.8 13.8 9.4 22.6 9.4h364.1c10.2 0 17.8 9.5 15.6 19.5L360.4 986c-4.3 19.5 10.5 38 30.5 38 7.3 0 14.2-2.5 19.6-6.9 5.4-4.3 9.4-10.5 10.9-17.6l50.7-228c1-4.7 7.9-3.9 7.9 0.9v220.3c0 17.3 14 31.2 31.2 31.2h1.5c17.3 0 31.2-14 31.2-31.2V772.4c0-4.8 6.9-5.5 7.9-0.9l50.7 228c3.2 14.3 15.8 24.4 30.5 24.5h0.1c20 0 34.9-18.5 30.5-38l-51.3-230.5c-2.2-10 5.4-19.5 15.6-19.5H992c17.7 0 32-14.3 32-32 0-8.8-3.6-16.8-9.4-22.6-5.8-5.8-13.8-9.4-22.6-9.4z m-704-68V420c0-2.2 1.8-4 4-4h56c2.2 0 4 1.8 4 4v184c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4z m128 0V388c0-2.2 1.8-4 4-4h56c2.2 0 4 1.8 4 4v216c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4z m128 0V324c0-2.2 1.8-4 4-4h56c2.2 0 4 1.8 4 4v280c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4z m192 0c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V228c0-2.2 1.8-4 4-4h56c2.2 0 4 1.8 4 4v376z" p-id="2648" fill="#cdcdcd"></path></svg>
                        <span>统计</span>
                    </el-menu-item>
                    <el-menu-item index="/personalHomepage">
                        <svg style="margin-right: 8px;" t="1742889204549" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="23" height="24"><path d="M512 1024c282.309 0 512-229.693 512-512S794.309 0 512 0 0 229.693 0 512s229.691 512 512 512z m0-960c247.044 0 448.002 200.956 448.002 448 0 247.038-200.958 448.002-448.002 448.002S64 759.038 64 512C64 264.956 264.956 64 512 64z m0 135.995c102.048 0 184.801 82.054 184.801 183.303 0 101.218-82.716 183.265-184.801 183.265-102.078 0-184.769-82.053-184.769-183.265 0-101.25 82.723-183.303 184.769-183.303z m0 314.18c72.9 0 132.002-58.62 132.002-130.914 0-72.32-59.101-130.908-132.002-130.908S379.998 310.974 379.998 383.26c0 72.325 59.101 130.914 132.002 130.914z m0 0c145.826 0 264.004 117.217 264.004 261.829h-52.806c0-115.649-94.556-209.441-211.198-209.441s-211.202 93.79-211.202 209.44h-52.8c0-144.61 118.176-261.828 264.002-261.828z m0 0" p-id="2648" fill="#cdcdcd"></path></svg>
                        <span>个人主页</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="header-centered">
                    <el-dropdown>
                        <el-avatar :size="40" style="cursor: pointer;border: 2px solid #d3cccc" :src="userInfo.pic" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="isOpen = true">修改密码</el-dropdown-item>
                                <el-dropdown-item @click="isModPhone = true">修改电话</el-dropdown-item>
                                <el-dropdown-item>
                                    <el-upload action="#" :show-file-list="false" :before-upload="beforeAvatarUpload"
                                               :http-request="httpRequest" accept="image/*">
                                        <template #trigger>更换头像</template>
                                    </el-upload>
                                </el-dropdown-item>
                                <el-dropdown-item @click="router.push('/personalHomepage')">个人主页</el-dropdown-item>
                                <el-dropdown-item divided @click="logOut()">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog v-model="isOpen" :before-close="handleClose" title="修改密码" width="400" destroy-on-close center>
            <el-form :model="pwInfo" :rules="rules" scroll-to-error ref="ruleRef" size="large">
                <el-form-item prop="oldPw">
                    <el-input v-model="pwInfo.oldPw" placeholder="请输入原密码"  :prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item prop="newPw">
                    <el-input v-model="pwInfo.newPw" placeholder="请输入新密码" :prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item prop="confirmPw">
                    <el-input v-model="pwInfo.confirmPw" placeholder="请确认新密码" :prefix-icon="Lock" show-password />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button size="large" @click="cancel" round>取消</el-button>
                <el-button type="primary" size="large" @click="checkForm" round>确定</el-button>
            </template>
        </el-dialog>
        <el-dialog v-model="isModPhone" :before-close="phoneDialogClose" title="修改电话" width="400" destroy-on-close center>
            <div class="form-content">
                <el-form :model="phoneInfo" :rules="phoneRules" scroll-to-error ref="phoneRef" size="large">
                    <el-form-item prop="code">
                        <el-input style="width: 210px" v-model="phoneInfo.code" placeholder="请输入短信验证码" clearable/>
                        <el-button style="width: 90px;" type="primary" :disabled="isCounting" @click="sendCode" link>
                            {{ countdownText }}
                        </el-button>
                    </el-form-item>
                    <el-form-item prop="newPhone">
                        <el-input style="width: 300px" :disabled="!phoneInfo.code" v-model="phoneInfo.newPhone" placeholder="请输入新手机" :prefix-icon="Phone" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <el-button size="large" @click="phoneDialogClose" round>取消</el-button>
                <el-button type="primary" size="large" @click="phoneCheckForm" round>确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup>
import router from '@/router';
import request from "@/request/request"
import { reactive,onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Lock,Phone } from '@element-plus/icons-vue';

onMounted(async () => {
    await getUserInfo();
});
  
function handleSelect(key, keyPath) {
    router.push(key)
}
// 使用者信息
const userInfo = reactive({
    id:'',
    name:'',
    phone:'',
    pic:'',
})
  
async function getUserInfo() {
    await request.get('/user/getUserInfo').then(res => {
        userInfo.name = res.data.name;
        userInfo.phone = res.data.phone;
        userInfo.id = res.data.id;
        userInfo.pic = res.data.pic;
    })
}
// 修改密码
const isOpen = ref(false)
const pwInfo = reactive({
    id:'',
    oldPw:'',
    newPw:'',
    confirmPw:''
})
const ruleRef = ref(null)
const rules = {
    oldPw: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    newPw: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
    ],
    confirmPw: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
        { 
            validator: (rule, value, callback) => {
                if (value !== pwInfo.newPw) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ]
  }
function cancel() {
    isOpen.value = false;
    pwInfo.id = '';
    pwInfo.oldPw = '';
    pwInfo.newPw = '';
    pwInfo.confirmPw = '';
    ElMessage.info('已取消')
}
function checkForm() {
    ruleRef.value.validate(valid => {
        if (valid) {
            // 修改
            update();
        } else {
            ElMessage.error('登录信息有误！')
        }
    })
}
async function update() {
    pwInfo.id = userInfo.id;
    await request.put('/user/updatePassword',pwInfo).then(res => {
        ElMessage.success(res.data)
        isOpen.value = false;
        pwInfo.id = '';
        pwInfo.oldPw = '';
        pwInfo.newPw = '';
        pwInfo.confirmPw = '';
    })
}
function handleClose() {
    pwInfo.oldPw = '';
    pwInfo.newPw = '';
    pwInfo.confirmPw = '';
}
  
// 修改电话相关
const isModPhone = ref(false)
  
const phoneRef = ref(null);
const phoneRules = {
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ],
    newPhone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
    ],
};
const phoneInfo = reactive({
    id: null,
    code: null,
    newPhone: null,
})
function phoneDialogClose() {
    isModPhone.value = false;
    phoneInfo.id = null;
    phoneInfo.code = null;
    phoneInfo.newPhone = null;
}
function phoneCheckForm() {
    phoneRef.value.validate((valid) => {
        if (valid) {
            updatePhone();
        } else {
            ElMessage.error('信息有误');
        }
    });
}
async function updatePhone() {
    phoneInfo.id = userInfo.id;
    await request.put('/user/updatePhone', phoneInfo).then(res => {
        ElMessage.success(res.data)
        phoneDialogClose();
    })
}
  
// 获取code和倒计时相关
async function sendCode() {
    await request.get('/user/getCode',{params: {phone: userInfo.phone}}).then(res => {
        ElMessage.success(res.data);
        // 启动倒计时
        startCountdown();
    })
}
const countdownTime = ref(60);
const isCounting = ref(false);
const countdownText = ref('获取验证码');
const startCountdown = () => {
    isCounting.value = true; // 禁用按钮
    countdownText.value = `${countdownTime.value} s`;
    const countdownInterval = setInterval(() => {
        countdownTime.value--;
        if (countdownTime.value <= 0) {
            clearInterval(countdownInterval);
            countdownText.value = '获取验证码';
            isCounting.value = false;
            countdownTime.value = 60; // 重置倒计时
        } else {
            countdownText.value = `${countdownTime.value} s`;
        }
    }, 1000);
}

// 更换头像
function beforeAvatarUpload(file) {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
        ElMessage.error('只能上传图片文件!');
    }
    return isImage;
}
async function httpRequest(data) {     // 添加图片
    let formData = new FormData();
    formData.append("multipartFile", data.file);
    formData.append("id", userInfo.id);
    await request.post('/common/images',formData).then(res => {
        userInfo.pic = res.data;
        ElMessage.success('上传成功!');
    })
}
// 登出
async function logOut() {
    await request.get('/admin/logout').then(res => {
        ElMessage.success(res.data)
        router.push('/')
    })
}
</script>
  
<style>
.el-menu-item {
    height: 60px; /* 设置高度 */
    line-height: 70px; /* 设置行高，使内容垂直居中 */
}
.header-centered {
    text-align: right;
    font-size: 12px;
    border-bottom: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.centered-item {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.my-font {
    font-family: 'Arial', sans-serif;
    font-size: 33px;
    color: #35e60e;
}
.button-group {
    display: block;
    margin: 0 auto;
}
.form-content {
display: flex;
justify-content: center;
align-items: center;
height: 100%; /* 确保容器有足够的高度 */
margin-top: 15px;
}
</style>