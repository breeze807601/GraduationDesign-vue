<template>
    <div>
        <el-row>
            <el-col :span="24">    
                <el-form :model="form" inline>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="form.phone" placeholder="请输入电话" />
                    </el-form-item>
                    <el-form-item label="住宅">
                        <el-cascader :options="buildingOption" :props="myProps" v-model="option" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-button type="primary" :icon="Plus" @click="openEdit('-1','-1',true)" auto-insert-space plain>新增</el-button><!-- 传参-1证明是新增住户 -->
                <el-button type="warning" :icon="Download" auto-insert-space plain @click="exportUser">导出Excel</el-button>
            </el-col>
        </el-row>
    </div>
    <div style="margin-top: 20px;width: 90%;margin-left: auto; margin-right: auto; text-align: center;">
        <el-table :data="userList" style="width: 100%;height: 73.8vh;" stripe v-loading="loading" :cell-style="{ textAlign: 'center' }" table-layout="fixed">
            <el-table-column label="户主姓名" header-align="center">
                <template #default="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column width="80px" label="性别" header-align="center">
                <template #default="scope">{{ scope.row.sex }}</template>
            </el-table-column>
            <el-table-column label="电话" header-align="center">
                <template #default="scope">{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column width="220px" label="门牌" header-align="center">
                <template #default="scope">
                    <el-row style="width: 100%; display: flex; justify-content: center; align-items: center;">
                        <el-col :span="6">
                            <el-tag style="width: 100%;" size="large" type="primary">{{ scope.row.buildingNum }}</el-tag>
                        </el-col>
                        <el-col :span="7">
                            <el-tag size="large"  type="success">{{ scope.row.floor }}</el-tag>
                        </el-col>
                        <el-col :span="7">
                            <el-tag size="large" type="info">{{ scope.row.doorplate }}</el-tag>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="入住时间" header-align="center">
                <template #default="scope">{{ scope.row.time }}</template>
            </el-table-column>
            <el-table-column label="操作" header-align="center">
                <template #default="scope">
                    <el-button type="primary" link @click="openEdit(scope.row.id,scope.row.buildingId,false)">
                        <el-icon><EditPen /></el-icon>修改
                    </el-button>
                    <el-button type="primary" link @click="deleteUser(scope.row.id)">
                        <el-icon><Delete /></el-icon>删除用户
                    </el-button>
                    <el-button type="primary" link @click="resetPassword(scope.row.id)">
                        <el-icon><Refresh /></el-icon>重置密码 
                    </el-button>
                </template>
            </el-table-column>
            <template #empty><el-empty v-if="userList.length === 0 && !loading" description="暂无数据" /></template>
        </el-table>
        <div style="display: flex; justify-content: center; align-items: center;margin-top: 7px;">
            <el-config-provider :locale="zhCn">
                <el-pagination v-model:current-page="form.pageNo" layout="total, prev, pager, next, jumper" :total="form.total"
                                       :page-size="form.pageSize"  @current-change="handleCurrentChange"/>
            </el-config-provider>
        </div>
    </div>
    <el-dialog v-model="isEdit" :before-close="handleClose" :title="editTitle" width="400" destroy-on-close center>
        <user-edit @close="close" :user-id="userId" :building-id="buildingId"></user-edit>
    </el-dialog>
</template>

<script setup>
import {reactive,ref,onMounted} from "vue";
import UserEdit from "@/components/UserEdit.vue";
import request from "@/request/request"
import {Search,Refresh,Plus,EditPen,Delete,Download} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

onMounted(async () => {
    await getOption();
    await getUserList();
});

// 加载
const loading = ref(true)

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

// 搜索相关
const form = ref({
    name:'',
    phone:'',
    buildingNum:null,  // 楼号
    floor:null,          // 楼层
    doorplate:null,      // 门牌
    pageNo:1,
    pageSize:14,
    total:0
})
function handleQuery() {
    form.value.buildingNum = null;
    form.value.floor = null;
    form.value.doorplate = null;
    if (option.value != null) {
        form.value.buildingNum = option.value[0];
        form.value.floor = option.value[1];
        form.value.doorplate = option.value[2];
    }
    getUserList();
}

// 重置
function resetQuery() {  
    form.value.name = '';
    form.value.phone = '';
    form.value.buildingNum = null;
    form.value.floor = null;
    form.value.doorplate = null;
    form.value.pageNo = 1;
    form.value.pageSize = 14;
    form.value.total = 0;
    option.value = null;
    getUserList();
}

// 表格相关
const userList = reactive([])
async function getUserList() {
    loading.value = true;
    await request.get('/user/list',{params: form.value}).then(res => {
        userList.splice(0, userList.length);
        userList.push(...res.data.list);
        form.value.total = parseInt(res.data.total);
    })
    loading.value = false;
}
async function handleCurrentChange(val) {
    form.value.pageNo = val;
    await getUserList(); 
}

// add和mod相关
const editTitle = ref('修改住户')
const isAdd = ref(false)
const isEdit = ref(false)
const userId = ref('')
const buildingId = ref('')
function openEdit(id,bId,add) {
    isEdit.value = true;
    userId.value = id;
    buildingId.value = bId;
    isAdd.value = add;
    if (isAdd.value) {
        editTitle.value = '新增住户'
    } else {
        editTitle.value = '修改住户'
    }
}

// 关闭
async function close() {
    isEdit.value = false;
    isAdd.value = false;
    editTitle.value = '修改住户信息';
    await getUserList();
}
function handleClose() {
    ElMessageBox.confirm('确认关闭窗口吗？').then(() => {
        isEdit.value = false;
        done()
    }).catch(() => {
        ElMessage.info("已关闭");
    });
}

// 重置密码
async function resetPassword(id) {
    ElMessageBox.confirm('确认要重置该住户密码吗？','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
        await request.put(`/user/resetPassword?id=${id}`).then(res => {
            ElMessage.success(res.data);
        })
    }).catch(() => {
        ElMessage.info("已取消");
    });
}

// 删除用户
async function deleteUser(id) {
    ElMessageBox.confirm('确认要删除该住户吗？','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
        await request.delete(`/user/delete?id=${id}`).then(res => {
            ElMessage.success(res.data);
            getUserList()
        })
    }).catch(() => {
        ElMessage.info("已取消");
    });
}

// 导出
async function exportUser() {
    await request.get('/user/export', {
        responseType: 'blob', // 重要，确保返回的是文件流
        isDownload: true // 添加自定义标识符
    }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '住户信息表.xlsx'); // 设置下载文件名
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

</style>