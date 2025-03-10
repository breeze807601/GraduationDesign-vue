<template>
    <div>
        <el-form :data="form" inline>
            <el-form-item label="用户名">
                <el-input v-model="form.username" placeholder="请输入用户名" style="width: 195px;" />
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="form.power" placeholder="请选择权限" style="width: 200px;">
                    <el-option v-for="item in powerOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone" placeholder="请输入手机号" style="width: 195px;" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" @click="getList()">搜索</el-button>
                <el-button :icon="Refresh" plain @click="resetQuery">重置</el-button>
                <el-tooltip :content="userInfo.power === 1 ? '新增管理员' : '权限不足'" placement="bottom" effect="light">
                    <el-button :disabled="userInfo.power === 0" type="success" :icon="Plus" plain @click="adminAddOrMod(true,null)">新增</el-button>
                </el-tooltip>
            </el-form-item>
        </el-form>
    </div>
    <div class="container" style="overflow: hidden;">
        <el-table :data="adminList" height="765" style="width: 100%;" stripe v-loading="loading" :cell-style="{ textAlign: 'center' }" table-layout="auto">
            <el-table-column label="用户名" header-align="center">
                <template #default="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <el-table-column label="联系方式" header-align="center">
                <template #default="scope">{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column label="权限" header-align="center">
                <template #default="scope">
                    <el-tag v-if="scope.row.power === 1" type="success" effect="dark" size="large">超级管理员</el-tag>
                    <el-tag v-if="scope.row.power === 0" type="primary" effect="dark" size="large">管理员</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" header-align="center">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 0" type="success" size="large">正常</el-tag>
                    <el-tag v-if="scope.row.status === 1" type="danger" size="large" >停用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" width="230px">
                <template #default="scope">
                    <div v-if="userInfo.power === 1">
                        <el-button type="primary" link @click="adminAddOrMod(false,scope.row.id)">
                            <el-icon><EditPen /></el-icon>修改
                        </el-button>
                        <el-tooltip content="重置密码" placement="bottom" effect="light">
                            <el-button type="primary" link @click="resetPw(scope.row.id)">
                                <el-icon><Refresh /></el-icon>重置
                            </el-button>
                        </el-tooltip>
                        <el-button type="primary" link @click="deleteAdmin(scope.row.id)">
                            <el-icon><Delete /></el-icon>删除
                        </el-button>
                    </div>
                    <div v-else>
                        <el-button :icon="CircleCloseFilled" disabled link >暂无权限</el-button>
                    </div>
                </template>
            </el-table-column>
            <template #empty><el-empty v-if="adminList.length === 0 && !loading" description="暂无数据" /></template>
        </el-table>
        <el-dialog v-model="isEdit" :before-close="handleClose" :title="dilaogTitle" width="400" destroy-on-close center>
            <el-form :model="adminInfo" :rules="rules" ref="ruleRef" label-position="left" label-width="55px" size="large" hide-required-asterisk>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="adminInfo.username" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="adminInfo.phone" />
                </el-form-item>
                <el-form-item label="权限" prop="sex" >
                    <el-select v-model="adminInfo.power" placeholder="Select" style="width: 150px">
                        <el-option v-for="item in powerOptions" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" v-if="!isAdd">
                    <el-select v-model="adminInfo.status" placeholder="Select" style="width: 150px">
                        <el-option v-for="status in statusOptions" :key="status.value" :label="status.label" :value="status.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <div style="width: 100%;text-align: center;justify-content: center;">
                        <el-button @click="handleClose" >取消</el-button>
                        <el-button type="primary" @click="checkForm">确定</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive,onMounted, ref } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import {Search,Refresh,Plus,Delete,CircleCloseFilled} from '@element-plus/icons-vue';
import request from "@/request/request"

onMounted(async () => {
    await getUserInfo();
    await getList();
});
// 使用者信息
const userInfo = reactive({
    id:'',
    username:'',
    phone:'',
    power: null
})
async function getUserInfo() {
    await request.get('/admin/info').then(res => {
        userInfo.username = res.data.username;
        userInfo.phone = res.data.phone;
        userInfo.id = res.data.id;
        userInfo.power = res.data.power
    })
}

const loading = ref(false)

const form = reactive({
    username: null,
    phone: null,
    power: null,
})
// 状态选择器相关
const powerOptions = [
  {
    value: 1,
    label: '超级管理员',
  },
  {
    value: 0,
    label: '管理员',
  },
]

const adminList = reactive([])
async function getList() {
    await request.get('/admin/list',{params: form}).then(res => {
        adminList.splice(0, adminList.length);
        adminList.push(...res.data);
    })
}

// 重置
function resetQuery() {
    form.phone = null;
    form.power = null;
    form.username = null;
    getList();
}

// 删除
async function deleteAdmin(id) {
    ElMessageBox.confirm('确认要删除该账户吗？','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
        await request.delete(`/admin/delete/${id}`).then(res => {
            ElMessage.success(res.data)
            getList();
        })
    }).catch(() => {
        ElMessage.info("已取消");
    });
}

// add or mod
const isEdit = ref(false)
const dilaogTitle = ref('添加管理')
const isAdd = ref(false)

const adminInfo = reactive({
    id: null,
    username: null,
    phone: null,
    power: null,
    status: null,
})
async function adminAddOrMod(is,id) {
    isAdd.value = is;
    if (isAdd.value) {
        dilaogTitle.value = '添加管理'
    } else {
        dilaogTitle.value = '修改管理'
        // 获取该管理员信息
        await request.get(`/admin/getAdminInfo/${id}`).then(res => {
            adminInfo.id = res.data.id;
            adminInfo.username = res.data.username;
            adminInfo.phone = res.data.phone;
            adminInfo.power = res.data.power;
            adminInfo.status = res.data.status;
        })
    }
    isEdit.value = true;
}
function handleClose() {
    ElMessageBox.confirm('确认关闭窗口吗？').then(() => {
        dilaogTitle.value = '添加管理'
        adminInfo.id = null;
        adminInfo.username = null;
        adminInfo.phone = null;
        adminInfo.power = null;
        adminInfo.status = null;
        isEdit.value = false;
        done()
    }).catch(() => {
        ElMessage.info("已关闭");
    });
}
// 状态
const statusOptions = [
    {
        value: 1,
        label: '停用',
    },
    {
        value: 0,
        label: '正常',
    },
]
// 校验
const ruleRef = ref(null)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  power: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  status: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
function checkForm() {
    ruleRef.value.validate(valid => {
        if (valid) {
            addOrMod();
        } else {
            ElMessage.error('登录信息有误！')
        }
    })
}
// 添加或修改请求
async function addOrMod() {
    if (isAdd.value) {
        await request.post('/admin/add',adminInfo).then(res => {
            ElMessage.success(res.data)
        })
    } else {
        await request.put('/admin/update',adminInfo).then(res => {
            ElMessage.success(res.data)
        })
    }
    dilaogTitle.value = '添加管理'
    adminInfo.id = null;
    adminInfo.username = null;
    adminInfo.phone = null;
    adminInfo.power = null;
    adminInfo.status = null;
    getList();
    isEdit.value = false;
}

// 重置密码
async function resetPw(id) {
    ElMessageBox.confirm('确认要重置该用户密码吗？','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
        await request.put(`/admin/resetPassword/${id}`).then(res => {
            ElMessage.success(res.data);
        })
    }).catch(() => {
        ElMessage.info("已取消");
    });
}
</script>

<style>

</style>