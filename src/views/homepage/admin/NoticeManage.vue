<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :model="form" size="large" inline>
                    <el-form-item label="标题">
                        <el-input style="width: 220px" v-model="form.title" placeholder="请输入标题" clearable />
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-config-provider :locale="zhCn">
                            <el-date-picker style="width: 220px" v-model="form.time" type="date" placeholder="请选择日期"
                                            format="YYYY-MM-DD" value-format="YYYY-MM-DD"  :disabled-date="disabledDate"/>
                        </el-config-provider>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :icon="Search" @click="getNoticeList">搜索</el-button>
                        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                        <el-button type="success" :icon="Plus" plain @click="openAddOrMod(null, true)">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div style="margin-top: 20px">
            <el-table :data="noticeList" style="width: 100%;height: 46.65rem;" stripe v-loading="loading" :cell-style="{ textAlign: 'center',fontSize: '1.1rem' }"
                      :row-style="{ height: '3.4rem' }" table-layout="fixed" border>
                <el-table-column label="标题" header-align="center">
                    <template #default="scope">{{ scope.row.title }}</template>
                </el-table-column>
                <el-table-column label="内容" header-align="center">
                    <template #default="scope">
                        <el-text truncated style="font-size: 1.2rem">{{ scope.row.content }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" header-align="center">
                    <template #default="scope">{{ scope.row.time }}</template>
                </el-table-column>
                <el-table-column label="发布者" header-align="center">
                    <template #default="scope">{{ scope.row.creator }}</template>
                </el-table-column>
                <el-table-column label="操作" header-align="center">
                    <template #default="scope">
                        <el-button type="primary" link @click="openDetails(scope.row.id)">
                            <el-icon><View /></el-icon>详情
                        </el-button>
                        <el-button type="primary" link @click="openAddOrMod(scope.row.id,false)">
                            <el-icon><EditPen /></el-icon>修改
                        </el-button>
                        <el-button type="primary" link @click="deleteNotice(scope.row.id)">
                            <el-icon><Delete /></el-icon>删除
                        </el-button>
                    </template>
                </el-table-column>
                <template #empty><el-empty v-if="noticeList.length === 0 && !loading" description="暂无数据" /></template>
            </el-table>
            <div style="display: flex; justify-content: center; align-items: center;margin-top: 21px;">
                <el-config-provider :locale="zhCn">
                    <el-pagination v-model:current-page="form.pageNo" layout="total, prev, pager, next, jumper" :total="form.total"
                                   :page-size="form.pageSize"  @current-change="handleCurrentChange"/>
                </el-config-provider>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" width="500" :title="title" :before-close="cancel" destroy-on-close center>
        <notice-add-or-mod @close="close" @cancel="cancel" :isAdd="isAdd" :id="noticeId" />
    </el-dialog>
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
</template>

<script setup>
import request from "@/request/request";
import {ref, reactive, onMounted} from "vue";
import { Refresh, Search, Plus, EditPen, Delete } from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import NoticeAddOrMod from "@/components/notice/NoticeAddOrMod.vue";
import NoticeDetails from "@/components/notice/NoticeDetails.vue";

document.title = "公告";
document.body.style.overflow = 'hidden';

const loading = ref(false)  // 加载

onMounted(() => {
    getNoticeList()
})

// 日期选择器配置
const disabledDate = (time) => {
    return time.getTime() > Date.now();
}

const form = reactive({
    time: '',
    title: '',
    pageNo: 1,
    pageSize: 13,
    total: 0
})

// 列表
const noticeList = reactive([])
async function getNoticeList() {
    loading.value = true;
    await request.get('/notice/list', {params: form}).then(res => {
        noticeList.splice(0, noticeList.length);
        noticeList.push(...res.data.list);
        form.total = parseInt(res.data.total);
    })
    loading.value = false;
}
function resetQuery() {
    form.time = '';
    form.title = '';
    form.pageNo = 1;
    form.pageSize = 13;
    getNoticeList()
}

// 分页
function handleCurrentChange(val) {
    form.pageNo = val;
    getNoticeList();
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

// 新增
const dialogVisible = ref(false)
const isAdd = ref(false)
const title = ref('修改公告')
const noticeId = ref('')
function openAddOrMod(id,is) {
    if (is) {
        isAdd.value = true;
        title.value = '新增公告';
        dialogVisible.value = true;
    } else {
        isAdd.value = false;
        title.value = '修改公告';
        noticeId.value = id;
        dialogVisible.value = true;
    }
}
function close() {
    dialogVisible.value = false;
    isAdd.value = false;
    noticeId.value = '';
    title.value = '修改公告';
    getNoticeList()
}
function cancel() {
    ElMessageBox.confirm('确认关闭窗口吗？').then(() => {
        dialogVisible.value = false;
        done()
    }).catch(() => {
        ElMessage.info("已关闭");
    });
}

// 删除
async function deleteNotice(id) {
    ElMessageBox.confirm('确认要删除该公告吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        await request.delete(`/notice/delete?id=${id}`).then(res => {
            ElMessage.success(res.data);
            getNoticeList()
        })
    }).catch(() => {
        ElMessage.info("已取消");
    });
}
</script>

<style scoped>
/* 去掉 el-divider 的上下边距 */
.el-divider {
    margin-top: 0 !important;
}
</style>