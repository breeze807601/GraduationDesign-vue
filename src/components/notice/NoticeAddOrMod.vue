<template>
    <div style="margin: 5px;">
        <el-form :model="notice" size="large" ref="ruleRef" :rules="rules">
            <el-form-item label="标题" prop="title">
                <el-input v-model="notice.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input v-model="notice.content" type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item >
                <div style="width: 100%;text-align: center;justify-content: center;">
                    <el-button @click="emit('cancel')">取消</el-button>
                    <el-button type="primary" @click="checkForm">确定</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {defineEmits, onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import {ElMessage} from "element-plus";

const props = defineProps({
    isAdd: Boolean,
    id: String
})

const emit = defineEmits(['close','cancel']);

onMounted(() => {
    if (!props.isAdd) {
        getNoticeInfo();
    }
})

const ruleRef = ref();
const rules = {
    title: [
        {required: true, message: '请输入标题', trigger: 'blur'},
        {min: 1, max: 20, message: '长度在 1 到 32 个字符', trigger: 'blur'},
    ],
    content: [
        {required: true, message: '请输入内容', trigger: 'blur'},
        {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'},
    ],
}

const notice = reactive({
    id: '',
    title: '',
    content: '',
})

function checkForm() {
    ruleRef.value.validate(valid => {
        if (valid) {
            addOrMod();
        } else {
            ElMessage.error('信息有为空！')
        }
    })
}

async function getNoticeInfo() {
    notice.id = props.id;
    await request.get("/notice/info", {params: {id: notice.id}}).then(res => {
        notice.title = res.data.title;
        notice.content = res.data.content;
    })
}
async function addOrMod() {
    if (props.isAdd) {
        await request.post("/notice/add", notice).then(res => {
            ElMessage.success(res.data)
            emit('close');
        })
    } else {
        await request.put("/notice/update", notice).then(res => {
            ElMessage.success(res.data)
            emit('close');
        })
    }
}
</script>

<style>

</style>