<template>
    <div style="width: 100%;height: 100%;">
        <el-card style="width: 35%;height: 90%;;margin-left: 3%" v-loading="loading">
            <template #header>
                <span>我的信息</span>
            </template>
            <div style="text-align: center;margin-top: 1rem">
                <el-tooltip placement="bottom" effect="light" content="点击更换头像">
                    <el-upload action="#" :show-file-list="false" :before-upload="beforeAvatarUpload"
                               :http-request="httpRequest" accept="image/*">
                        <template #trigger>
                            <el-avatar :size="175" style="cursor: pointer;border: 2px solid #000000" :src="userInfo.pic" />
                        </template>
                    </el-upload>
                </el-tooltip>
            </div>
            <el-divider style="margin-top: 3rem;margin-bottom: 1.2rem">
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div style="width: 100%;">
                <el-row>
                    <el-col :span="8">
                        <svg clas="icon" t="1742907226088" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3788" width="30" height="30"><path d="M588.8 522.24l-25.6 25.6-120.32 64c-12.8 7.68-17.92 20.48-10.24 33.28l58.88 120.32 10.24 53.76h-104.96C273.92 819.2 179.2 819.2 179.2 752.64v-12.8C179.2 614.4 276.48 512 396.8 512h128c23.04 0 43.52 2.56 64 10.24zM448 128c92.16 0 166.4 79.36 166.4 179.2s-74.24 179.2-166.4 179.2-166.4-79.36-166.4-179.2 74.24-179.2 166.4-179.2z" fill="#A5C8F4" p-id="3789"></path><path d="M519.68 663.04l53.76 56.32c5.12 5.12 7.68 12.8 7.68 20.48l-12.8 79.36c-2.56 20.48 15.36 33.28 33.28 25.6l66.56-35.84c7.68-2.56 15.36-2.56 20.48 0l66.56 35.84c17.92 10.24 35.84-5.12 33.28-25.6l-12.8-79.36c-2.56-7.68 0-15.36 7.68-20.48l53.76-56.32c12.8-12.8 5.12-38.4-12.8-40.96l-74.24-10.24c-7.68 0-12.8-5.12-17.92-12.8l-33.28-71.68c-2.56-7.68-12.8-12.8-20.48-12.8-7.68 0-17.92 5.12-20.48 12.8l-33.28 71.68c-2.56 7.68-10.24 12.8-17.92 12.8l-74.24 10.24c-20.48 2.56-28.16 25.6-12.8 40.96z" fill="#2589FF" p-id="3790"></path></svg>
                        <span class="label">姓名</span>
                    </el-col>
                    <el-col :span="8" :offset="8" style="text-align: right;">
                        <span class="value">{{userInfo.name}}</span>
                    </el-col>
                    <el-divider style="margin: 1.2rem 0;"/>
                    <el-col :span="8">
                        <svg clas="icon" t="1742907096429" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2684" width="30" height="30"><path d="M545.18272 342.68672a234.21952 234.21952 0 1 0-275.79904 231.37792v300.0832a35.13344 35.13344 0 1 0 70.26688 0V576a235.13088 235.13088 0 0 0 205.53216-233.31328zM310.9632 507.29984a164.61824 164.61824 0 1 1 163.95264-164.61312 164.46976 164.46976 0 0 1-163.95264 164.61312z m434.47808-59.08992V165.14048a35.13344 35.13344 0 1 0-70.26688 0v284.48256a234.24512 234.24512 0 1 0 70.26688-1.41312z m-30.44864 397.72672a164.61312 164.61312 0 1 1 163.95776-164.61824 164.46464 164.46464 0 0 1-163.95776 164.61312z" fill="#4A4A4A" p-id="2685"></path><path d="M502.2464 724.51072h-395.4176a35.28704 35.28704 0 0 1 0-70.56896h395.4176a35.28704 35.28704 0 0 1 0 70.56896z m420.01408-328.13568a34.95424 34.95424 0 0 1-24.42752-9.92256L710.10816 204.2368l-172.3904 174.08a35.21536 35.21536 0 1 1-49.85344-49.75104l187.008-188.84096a49.3312 49.3312 0 0 1 69.21728-0.67584l202.5984 196.67456a35.38432 35.38432 0 0 1 0.83968 49.88928 34.98496 34.98496 0 0 1-25.2672 10.76224z" fill="#FF7214" p-id="2686"></path></svg>
                        <span class="label">性别</span>
                    </el-col>
                    <el-col :span="8" :offset="8" style="text-align: right;">
                        <span class="value">{{userInfo.sex}}</span>
                    </el-col>
                    <el-divider style="margin: 1.2rem 0;"/>
                    <el-col :span="8">
                        <svg clas="icon" t="1742907280359" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4920" width="30" height="30"><path d="M512 512m-273.066667 0a273.066667 273.066667 0 1 0 546.133334 0 273.066667 273.066667 0 1 0-546.133334 0Z" fill="#3FE699" p-id="4921"></path><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m0 921.6a409.6 409.6 0 1 1 409.6-409.6 409.6 409.6 0 0 1-409.6 409.6z" fill="#2D515E" p-id="4922"></path><path d="M563.2 490.837333V256a51.2 51.2 0 0 0-102.4 0V512a51.2 51.2 0 0 0 15.018667 36.181333l136.533333 136.533334a51.2 51.2 0 0 0 72.362667-72.362667z" fill="#2D515E" p-id="4923"></path></svg>
                        <span class="label">入住时间</span>
                    </el-col>
                    <el-col :span="8" :offset="8" style="text-align: right;">
                        <span class="value">{{userInfo.time}}</span>
                    </el-col>
                    <el-divider style="margin: 1.2rem 0;"/>
                    <el-col :span="8">
                        <svg clas="icon" t="1742907345838" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6047" width="30" height="30"><path d="M503.7056 378.7264H338.944c-8.4992 0-15.36-6.8608-15.36-15.36s6.8608-15.36 15.36-15.36h164.7616c1.6896 0 3.1232-1.3824 3.1232-3.1232V274.0224c0-1.6896-1.3824-3.1232-3.1232-3.1232h-231.424c-1.6896 0-3.1232 1.3824-3.1232 3.1232v70.8608c0 1.6896 1.3824 3.1232 3.1232 3.1232h18.0224c8.4992 0 15.36 6.8608 15.36 15.36s-6.8608 15.36-15.36 15.36h-18.0224c-18.6368 0-33.8432-15.1552-33.8432-33.8432V274.0224c0-18.6368 15.1552-33.8432 33.8432-33.8432h231.424c18.6368 0 33.8432 15.1552 33.8432 33.8432v70.8608a33.8432 33.8432 0 0 1-33.8432 33.8432zM503.7056 583.0144H341.8112c-8.4992 0-15.36-6.8608-15.36-15.36s6.8608-15.36 15.36-15.36h161.9456c1.6896 0 3.1232-1.3824 3.1232-3.1232V478.3104c0-1.6896-1.3824-3.1232-3.1232-3.1232h-231.424c-1.6896 0-3.1232 1.3824-3.1232 3.1232v70.8608c0 1.6896 1.3824 3.1232 3.1232 3.1232h18.3296c8.4992 0 15.36 6.8608 15.36 15.36s-6.8608 15.36-15.36 15.36h-18.3296c-18.6368 0-33.8432-15.1552-33.8432-33.8432V478.3104c0-18.6368 15.1552-33.8432 33.8432-33.8432h231.424c18.6368 0 33.8432 15.1552 33.8432 33.8432v70.8608c-0.0512 18.688-15.2064 33.8432-33.8944 33.8432zM503.7056 787.3024H339.8144c-8.4992 0-15.36-6.8608-15.36-15.36s6.8608-15.36 15.36-15.36h163.9424c1.6896 0 3.1232-1.3824 3.1232-3.1232v-70.8608c0-1.6896-1.3824-3.1232-3.1232-3.1232h-231.424c-1.6896 0-3.1232 1.3824-3.1232 3.1232v70.8608c0 1.6896 1.3824 3.1232 3.1232 3.1232h18.0224c8.4992 0 15.36 6.8608 15.36 15.36s-6.8608 15.36-15.36 15.36h-18.0224c-18.6368 0-33.8432-15.1552-33.8432-33.8432v-70.8608c0-18.6368 15.1552-33.8432 33.8432-33.8432h231.424c18.6368 0 33.8432 15.1552 33.8432 33.8432v70.8608c-0.0512 18.688-15.2064 33.8432-33.8944 33.8432z" fill="#FF4D7C" p-id="6048"></path><path d="M124.6208 380.7232c8.4992 0 15.36-6.8608 15.36-15.36v-25.6512c0-8.4992-6.8608-15.36-15.36-15.36s-15.36 6.8608-15.36 15.36v25.6512c0 8.448 6.8608 15.36 15.36 15.36zM124.6208 717.312c8.4992 0 15.36-6.8608 15.36-15.36V433.2032c0-8.4992-6.8608-15.36-15.36-15.36s-15.36 6.8608-15.36 15.36v268.7488c0 8.4992 6.8608 15.36 15.36 15.36zM835.7376 385.4336h-114.8928c-8.4992 0-15.36 6.8608-15.36 15.36s6.8608 15.36 15.36 15.36h114.8928c8.4992 0 15.36-6.8608 15.36-15.36s-6.8608-15.36-15.36-15.36zM835.7376 563.456h-114.8928c-8.4992 0-15.36 6.8608-15.36 15.36s6.8608 15.36 15.36 15.36h114.8928c8.4992 0 15.36-6.8608 15.36-15.36s-6.8608-15.36-15.36-15.36zM835.7376 735.6416h-114.8928c-8.4992 0-15.36 6.8608-15.36 15.36s6.8608 15.36 15.36 15.36h114.8928c8.4992 0 15.36-6.8608 15.36-15.36s-6.8608-15.36-15.36-15.36z" fill="#4C35D3" p-id="6049"></path><path d="M973.7216 886.0672h-55.1424V307.4048c0-33.8944-27.5456-61.44-61.44-61.44h-190.3616v-80.384c0-36.9664-30.0544-67.0208-67.0208-67.0208H176.2304c-36.9664 0-67.0208 30.0544-67.0208 67.0208v74.5984c0 8.4992 6.8608 15.36 15.36 15.36s15.36-6.8608 15.36-15.36V165.5808c0-20.0192 16.2816-36.3008 36.3008-36.3008h423.5264c20.0192 0 36.3008 16.2816 36.3008 36.3008v720.4864H139.9808v-128.7168c0-8.4992-6.8608-15.36-15.36-15.36s-15.36 6.8608-15.36 15.36v128.7168H52.48c-8.4992 0-15.36 6.8608-15.36 15.36s6.8608 15.36 15.36 15.36h921.2416c8.4992 0 15.36-6.8608 15.36-15.36s-6.912-15.36-15.36-15.36z m-306.688 0V276.6848h190.1056c16.9472 0 30.72 13.7728 30.72 30.72v578.6624h-220.8256z" fill="#4C35D3" p-id="6050"></path></svg>
                        <span class="label">住宅</span>
                    </el-col>
                    <el-col :span="12" :offset="4" style="text-align: right;">
                        <span style="font-size: 1.3rem; vertical-align: middle;">
                            <el-tag size="large" type="primary">
                                <template #default>
                                    <span class="tag">{{ userInfo.buildingNum }}</span>
                                </template>
                            </el-tag>
                            <el-tag style="margin-left: 0.8rem;margin-right: 0.8rem" size="large" type="success">
                                <template #default>
                                    <span class="tag">{{ userInfo.floor }}</span>
                                </template>
                            </el-tag>
                            <el-tag size="large" type="info">
                                <template #default>
                                    <span class="tag">{{ userInfo.doorplate }}</span>
                                </template>
                            </el-tag>
                        </span>
                    </el-col>
                    <el-divider style="margin: 1.2rem 0;"/>
                    <el-col :span="16" :offset="3" style="margin-top: 6rem">
                        <el-button size="large" type="primary" >修改信息</el-button>
                        <el-button size="large" type="primary" @click="modPwDialog = true">修改密码</el-button>
                        <el-button size="large" type="primary" @click="isModPhone = true">修改电话</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-dialog v-model="modPwDialog" :before-close="handleClose" title="修改密码" width="400" destroy-on-close center>
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
import request from "@/request/request";
import {onMounted, ref, reactive} from "vue";
import {ElMessage} from "element-plus";
import {Lock, Phone} from "@element-plus/icons-vue";

document.title = "幸福小区系统-个人主页";
document.body.style.overflow = 'hidden';

onMounted(() => {
    getUserInfo()
})

const loading = ref(true);

const userInfo = reactive({
    id: '',
    name: '',
    sex: '',
    phone: '',
    time: '',
    balance: 0,
    buildingNum: '',
    floor: '',
    doorplate: '',
    pic: '',
})
// 获取用户信息
async function getUserInfo() {
    await request.get('/user/getUserInfo').then(res => {
        userInfo.id = res.data.id;
        userInfo.name = res.data.name;
        userInfo.sex = res.data.sex;
        userInfo.phone = res.data.phone;
        userInfo.time = res.data.time;
        userInfo.balance = res.data.balance;
        userInfo.buildingNum = res.data.buildingNum;
        userInfo.floor = res.data.floor;
        userInfo.doorplate = res.data.doorplate;
        userInfo.pic = res.data.pic;
        console.log(userInfo)
    })
    loading.value = false;
}

// 上传头像
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
// 修改密码相关
const modPwDialog = ref(false)
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
    modPwDialog.value = false;
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
        modPwDialog.value = false;
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

</script>

<style scoped>
/* 公共样式 */
.icon {
    font-size: 1.3rem;
    vertical-align: middle;
}
.label {
    font-size: 1.3rem;
    vertical-align: middle;
    margin-left: 0.7rem;
    color: gray;
}
.value {
    font-size: 1.3rem;
    vertical-align: middle;
}
.tag {
    font-size: 1.1rem;
}
</style>