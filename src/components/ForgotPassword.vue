<template>
    <el-form size="large" :model="pwInfo" :rules="rules" scroll-to-error ref="ruleRef">
        <el-form-item prop="phone">
            <el-input style="width: 300px" v-model="pwInfo.phone" placeholder="请输入手机号"  :prefix-icon="Phone" />
        </el-form-item>
        <el-form-item prop="code">
            <el-input style="width: 210px" v-model="pwInfo.code" placeholder="请输入短信验证码" clearable/>
            <el-button style="width: 90px;" type="primary" :disabled="isCounting" @click="sendCode" link>
                {{ countdownText }}
            </el-button>
        </el-form-item>
        <el-form-item prop="newPw">
            <el-input style="width: 300px" :disabled="!pwInfo.code" v-model="pwInfo.newPw" placeholder="请输入新密码" :prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item prop="confirmPw">
            <el-input style="width: 300px" :disabled="!pwInfo.code" v-model="pwInfo.confirmPw" placeholder="请确认新密码" :prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item prop="confirmPw">
            <div style="width: 100%;display: flex;justify-content: center;gap: 10px; ">
                <el-button style="width: 90px;" @click="emit('handleClose')" round>取消</el-button>
                <el-button style="width: 90px;" type="primary" round @click="submitForm">确定</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script setup>
import {reactive,ref} from "vue";
import { defineProps, defineEmits } from 'vue';
import request from "@/request/request"
import { Lock,Phone } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'

const props = defineProps({
    isAdmin: Boolean,
});
const emit = defineEmits(['close','handleClose']);

// 校验
const ruleRef = ref(null);
const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  newPw: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPw: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
        if (value !== pwInfo.newPw) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ]
};

const pwInfo = reactive({
    phone: null,
    code: null,
    newPw: null,
    confirmPw: null
})

const getUCode = ref('/user/getCode')
const getACode = ref('/admin/getCode')
async function sendCode() {
    const phoneValid = await ruleRef.value.validateField('phone', (valid) => {
        return valid === true;
    });
    if (!phoneValid) {
        ElMessage.error('内容有误');
        return;
    }
    // 手机号校验通过，执行发送验证码的逻辑
    await request.get(props.isAdmin ? getACode.value : getUCode.value,{
        params: {
            phone: pwInfo.phone
        }
    }).then(res => {
        ElMessage.success(res.data);
        // 启动倒计时
        startCountdown();
    })
};

// 修改密码
function submitForm() {
    ruleRef.value.validate((valid) => {
        if (valid) {
            forgetPassword();
        } else {
            ElMessage.error('信息有误');
        }
    });
}

const modAPw = ref('/admin/forgetPassword')
const modUPw = ref('/user/forgetPassword')
async function forgetPassword() {
    await request.put(props.isAdmin ? modAPw.value : modUPw.value , pwInfo).then(res => {
        ElMessage.success(res.data);
        emit('close')
    })
}

// 倒计时相关
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
};

</script>

<style>

</style>