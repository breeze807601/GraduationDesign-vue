<template>
    <div>
        <el-card style="">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 16px;color: black">公告</span>
                <el-button type="primary" link size="large" style="font-size: 16px" @click="router.push('/noticeManage')">
                    更多<el-icon class="el-icon--right"><DArrowRight /></el-icon>
                </el-button>
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <el-table :data="noticeList" style="width: 100%;margin-bottom: 5px" stripe v-loading="loading" :cell-style="{ textAlign: 'center' }"
                      table-layout="fixed" >
                <el-table-column label="标题" header-align="center">
                    <template #default="scope">{{ scope.row.title }}</template>
                </el-table-column>
                <el-table-column label="发布时间" header-align="center">
                    <template #default="scope">{{ scope.row.time }}</template>
                </el-table-column>
                <el-table-column label="操作" header-align="center">
                    <template #default="scope">
                        <el-button type="primary" link @click="openDetails(scope.row.id)">
                            <el-icon><View /></el-icon>详情
                        </el-button>
                    </template>
                </el-table-column>
                <template #empty><el-empty v-if="noticeList.length === 0 && !loading" description="暂无数据" /></template>
            </el-table>
        </el-card>
        <el-dialog style="height: auto" v-model="detailsDialogVisible" width="600" :before-close="detailsClose" destroy-on-close center>
            <template #title>
                <div style="display: flex; align-items: center; justify-content: flex-start;">
                    <svg style="margin-right: 10px" t="1741425926920" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5254" width="22" height="22"><path d="M600.96 677.92a329.12 329.12 0 1 0-94.08 68.16L606.72 880a58.4 58.4 0 0 0 93.6-69.76zM112 449.12a252.16 252.16 0 1 1 252.64 251.52A252.48 252.48 0 0 1 112 449.12z m829.76-187.68a39.04 39.04 0 0 0 0-77.6H743.2a39.04 39.04 0 0 0 0 77.6h198.56z m41.76 181.76a38.72 38.72 0 0 0-27.52-11.2H790.56a39.04 39.04 0 0 0 0 77.6h165.44a38.56 38.56 0 0 0 38.72-38.4 39.36 39.36 0 0 0-11.2-27.52z m-115.2 236.32a39.04 39.04 0 0 0 0 77.6h82.4a39.04 39.04 0 1 0 7.84-77.6 32 32 0 0 0-7.84 0z" fill="#4592D8" p-id="5255"></path></svg>
                    <span style="font-size: 18px">公告详情</span>
                </div>
            </template>
            <el-divider />
            <notice-details @close="detailsClose" :id="noticeDetailId" />
        </el-dialog>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import request from "@/request/request";
import {Delete, EditPen} from "@element-plus/icons-vue";
import NoticeDetails from "@/components/NoticeDetails.vue";

document.title = "首页";
document.body.style.overflow = 'hidden';

onMounted(() => {
    getNotice();
})

const loading = ref(false)

const noticeList = reactive([])
async function getNotice() {
    loading.value = true;
    // 只查出4个，更多按钮再跳转到公告页面
    const form = reactive({
        pageNo: 1,
        pageSize: 4,
    })
    await request.get('/notice/list', {params: form}).then(res => {
        noticeList.splice(0, noticeList.length);
        noticeList.push(...res.data.list);
        loading.value = false;
    })
}

// 详情
const detailsDialogVisible = ref(false)
const noticeDetailId = ref('')
function openDetails(id) {
    noticeDetailId.value = id;
    detailsDialogVisible.value = true;
}
function detailsClose() {
    noticeDetailId.value = '';
    detailsDialogVisible.value = false;
}
</script>

<style scoped>

</style>