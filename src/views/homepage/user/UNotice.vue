<template>
    <div style="display: flex; width: 100%; gap: 2rem;">
        <div style="width: 1%;" />
        <el-card style="width: 40%;height: 52rem;margin-left: 2rem" v-loading="noticeListLoading">
            <div style="height: 3.5rem">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 1.5rem; font-weight: bold">公告</div>
                </div>
            </div>
            <el-scrollbar height="49rem">
                <el-timeline style="max-width: 600px" center>
                    <el-timeline-item v-for="item in noticeList" :timestamp="item.time" placement="top" hollow color="primary">
                        <el-card>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <el-text style="font-size: 17px; font-weight: bold; color: #000000;">
                                    {{ item.title }}
                                </el-text>
                                <el-button type="primary" link :icon="View" @click="detailsDisplay(item)">详情</el-button>
                            </div>
                            <!-- 内容 -->
                            <div style="margin-top: 20px;width: 100%">
                                <el-text line-clamp="1">
                                    <div v-html="item.content" style="width: 100%;;font-size: 16px;white-space: pre-wrap;"></div>
                                </el-text>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
        </el-card>
        <div style="width: 6%;" />
        <el-card v-if="noticeDetails" style="width: 40%; height: 52rem; margin-left: 2rem; display: flex; justify-content: center; align-items: center;">
            <el-empty  >
                <template #description>
                    <el-text style="font-size: 20px; color: #909399;"><el-icon style="font-size: 20px"><InfoFilled /></el-icon>  点击左侧的公告详情按钮进行查看</el-text>
                </template>
            </el-empty>
        </el-card>
        <el-card v-else style="width: 40%;height: 52rem;margin-left: 2rem">
            <template #header>
                <!-- 标题和时间 -->
                <div style="text-align: center; width: 100%;">
                    <el-text style="font-size: 22px; font-weight: bold; color: #000000;">
                        {{ noticeInfo.title }}
                    </el-text><br>
                    <div style="margin-top: 10px;" />
                    <el-text style="font-size: 17px;">
                        <el-icon style="margin-right: 2px"><Timer /></el-icon>{{ noticeInfo.time }}
                    </el-text><br>
                </div>
            </template>
            <el-scrollbar height="38rem">
                <div style="position: relative; width: 100%;">
                    <!-- 内容 -->
                    <div style="margin-top: 20px;height: 100%">
                        <div v-html="noticeInfo.content" style="font-size: 18px;white-space: pre-wrap;"></div>
                    </div>
                </div>
            </el-scrollbar>
            <template #footer>
                <div style="margin-top: 1rem; text-align: right; padding: 0 1rem;">
                    <span style="font-size: 17px;">
                        发布者---{{ noticeInfo.creator }}
                    </span>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import request from "@/request/request";
import {View} from "@element-plus/icons-vue";

onMounted(() => {
    getList();
})

// 加载
const noticeListLoading = ref(true)

const noticeList = reactive([])

async function getList() {
    noticeListLoading.value = true;
    await request.get('/notice/getList').then(res => {
        noticeList.splice(0, noticeList.length);
        noticeList.push(...res.data);
    })
    noticeListLoading.value = false;
}

const noticeDetails = ref(true)
const noticeInfo = reactive({
    title: '',
    content: '',
    time: '',
    creator: ''
})
function detailsDisplay(notice) {
    noticeInfo.title = notice.title;
    noticeInfo.content = notice.content;
    noticeInfo.time = notice.time;
    noticeInfo.creator = notice.creator;
    noticeDetails.value = false;
}
</script>

<style scoped>

</style>