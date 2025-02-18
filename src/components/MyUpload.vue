<template>
    <div style="display: flex; flex-direction: column; align-items: center;">
        <el-upload style="width: 100%;" drag action="" :http-request="httpRequest" :on-remove="handleRemove" :limit="1" :file-list="fileList" accept=".xlsx,.xls">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                在此处放入文件或点击上传
            </div>
        </el-upload>
        <el-button type="success" @click="upload" :loading="loading">
            上传
        </el-button>
    </div>
</template>

<script setup>
import {reactive,ref} from "vue";
import request from '@/request/request'
import { ElMessage } from 'element-plus';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isWater: Boolean
});

const emit = defineEmits(['close']);

const loading = ref(false)

const file = ref(null);  // 存储当前上传的文件
const fileList = ref([]);  // 存储已上传文件的信息

function httpRequest(data) {
    file.value = data.file;
    fileList.value = [data.file];  // 添加文件到列表
}

function handleRemove(){
    file.value = null;
    fileList.value = [];  // 移除文件时清空列表
}

const electricityMeter = ref('/electricityMeter/upload')
const waterMeter = ref('/waterMeter/upload')
async function upload(){        // 上传
    loading.value = true;
    if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value);
        await request.post(
            props.isWater ? waterMeter.value : electricityMeter.value,
            formData
        ).then(res => {
            file.value = null;
            fileList.value = [];  // 上传成功后清空列表
            ElMessage.success('录入成功!');
            now.value = res.data;
            generateBill();
            emit('close');  // 关闭父组件窗口
        })
    } else{
        ElMessage.error("未选中文件！")
    }
    loading.value = false;
}

// 生成账单
const electricityBill = ref('/electricityBill/save')
const waterBill = ref('/waterBill/save')
const now = ref()
async function generateBill() {
    const formData = new FormData();
    formData.append('now', now.value);
    await request.post(props.isWater ? waterBill.value : electricityBill.value,formData).then(res => {
        console.log(res.data);
    })
}
</script>

<style>

</style>