<template>
    <div>
        <el-row>
            <el-col :span="24">    
                <el-form :model="form" inline>
                    <el-form-item label="住宅">
                        <el-cascader :options="buildingOption" :props="myProps" v-model="option" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                        <el-button :icon="Refresh" @click="resetQuery" plain>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-button type="primary" :icon="Plus" plain>新增</el-button>
                <el-tooltip content="批量插入新的住宅" placement="bottom" effect="light">
                    <el-button type="warning" :icon="Upload" plain @click="dialogVisible = true">导入</el-button>
                </el-tooltip>
                <el-tooltip content="导出住宅列表" placement="bottom" effect="light">
                    <el-button type="success" :icon="Download" plain @click="exportBuilding">导出</el-button>
                </el-tooltip>
            </el-col>
        </el-row>
        <div class="container">
            <el-table :data="buildingList" height="780" style="width: 100%;" stripe v-loading="loading" :cell-style="{ textAlign: 'center' }" table-layout="fixed">
                <el-table-column label="楼号" header-align="center">
                    <template #default="scope">{{ scope.row.buildingNum }}</template>
                </el-table-column>
                <el-table-column label="楼层" header-align="center">
                    <template #default="scope">{{ scope.row.floor }}</template>
                </el-table-column>
                <el-table-column label="门牌" header-align="center">
                    <template #default="scope">{{ scope.row.doorplate }}</template>
                </el-table-column>
                <el-table-column label="操作" header-align="center">
                    <!-- <template #default="scope">
                        <el-button type="primary" link >
                            <el-icon><EditPen /></el-icon>修改
                        </el-button>
                    </template> -->
                </el-table-column>
                <template #empty><el-empty v-if="buildingList.length === 0 && !loading" description="暂无数据" /></template>
            </el-table>
        </div>
        <el-dialog v-model="dialogVisible" width="500" title="导入住宅表格" :before-close="handleClose" destroy-on-close center>
            <!-- is-water判断是否是水表记录上传 -->
            <my-upload @close="close" :is-building="true"></my-upload>
        </el-dialog>
    </div>
</template>

<script setup>
import {reactive,ref,onMounted} from "vue";
import request from "@/request/request"
import {Search,Refresh,Plus,Download,Upload,Management} from '@element-plus/icons-vue';
import MyUpload from "@/components/MyUpload.vue";
import { ElMessage, ElMessageBox } from 'element-plus'

onMounted(async () => {
    await getOption();
    await getList();
});

// 加载
const loading = ref(false)

// 搜索相关
const form = ref({
    buildingNum:null,  // 楼号
    floor:null,          // 楼层
    doorplate:null,      // 门牌
})

// 获取门牌选择框相关
const option = ref();
const buildingOption = ref([]);
const myProps = {
  checkStrictly: true,
}
async function getOption() {
    await request.get("/building/getBuildingOptions").then(res => {
        buildingOption.value = res.data
    })
}

// 楼房列表
const buildingList = reactive([])
async function getList() {
    await request.get("/building/list",{params: form.value}).then(res => {
        console.log(res.data);
        buildingList.splice(0, buildingList.length);
        buildingList.push(...res.data);
    })
}

// 搜索
async function handleQuery() {
    form.value.buildingNum = null;
    form.value.floor = null;
    form.value.doorplate = null;
    if (option.value != null) {
        form.value.buildingNum = option.value[0];
        form.value.floor = option.value[1];
        form.value.doorplate = option.value[2];
    }
    getList();
}
// 重置
function resetQuery() {
    form.value.buildingNum = null;
    form.value.floor = null;
    form.value.doorplate = null;
    option.value = null;
    getList()
}

// 导入
const dialogVisible = ref(false)
function handleClose() {
    ElMessageBox.confirm('确认关闭窗口吗？').then(() => {
        dialogVisible.value = false;
        done()
    }).catch(() => {
        ElMessage.info("已关闭");
    });
}
async function close() {  // 子组件关闭窗口方法
    dialogVisible.value = false;
    // 更新列表和门牌选择框
    resetQuery();
    getOption();
}

// 导出
async function exportBuilding() {
    await request.get('/building/export', {
        responseType: 'blob', // 重要，确保返回的是文件流
        isDownload: true // 添加自定义标识符
    }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '楼房表.xlsx'); // 设置下载文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成后移除链接
        ElMessage.success('导出成功')
    }).catch(err => {
        ElMessage.error('导出失败，请稍后再试');
    });
}
</script>

<style>
.container {
    display: flex; /* 使用flex布局 */
    justify-content: space-between; /* 表格之间有间隔 */
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>