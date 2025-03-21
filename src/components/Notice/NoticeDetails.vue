<template>
    <div style="position: relative; width: 100%;">
        <!-- 标题和时间 -->
        <div style="text-align: center; width: 100%;">
            <el-text style="font-size: 22px; font-weight: bold; color: #000000;">
                {{ noticeInfo.title }}
            </el-text>
            <br>
            <div style="margin-top: 10px;" />
            <el-text style="font-size: 17px;">
                <el-icon style="margin-right: 2px"><Timer /></el-icon>
                {{ noticeInfo.time }}
            </el-text>
            <br>
        </div>
        <!-- 内容 -->
        <div style="margin-top: 20px;">
            <div v-html="noticeInfo.content" style="font-size: 18px;white-space: pre-wrap;"></div>
        </div>
        <!-- 发布者 -->
        <div style="margin-top: 20px; text-align: right; padding: 0 10px;">
            <span style="font-size: 17px;">
                发布者---{{ noticeInfo.creator }}
            </span>
        </div>
    </div>
</template>

<script setup>
import {defineEmits, onMounted, ref} from "vue";
import request from "@/request/request";

onMounted(() => {
    getNoticeInfo()
})

const props = defineProps({
    id: String
})

const emit = defineEmits(['close']);

const noticeInfo = ref({
    title: '',
    content: '',
    time: '',
    creator: '',
})

async function getNoticeInfo() {
    await request.get('/notice/info', {params: {id: props.id}}).then(res => {
        noticeInfo.value = res.data;
        console.log(res.data);
    })
}

</script>

<style scoped>

</style>