<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :model="form" inline label-width="40px">
                    <el-form-item label="姓名" >
                        <el-input v-model="form.name" placeholder="请输入姓名" style="width: 220px;"/>
                    </el-form-item>
                    <el-form-item label="住宅">
                        <el-cascader :options="buildingOption" :props="myProps" v-model="option" clearable style="width: 220px;" />
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-config-provider :locale="zhCn">
                            <el-date-picker v-model="form.time" value-format="YYYY-MM-DD" type="date" placeholder="选择日期" :disabled-date="disabledDate" />
                        </el-config-provider>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择状态" style="width: 220px;">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-tooltip content="导出用水账单" effect="light">
                    <el-button type="success" :icon="Download" auto-insert-space plain @click="dialog = true">导出</el-button>
                </el-tooltip>
                <el-tooltip content="通知住户充值" effect="light">
                    <el-button type="success" :icon="Bell" :loading="loadingButton" @click="notifyRecharge">通知</el-button>
                </el-tooltip>
            </el-col>
        </el-row>
        <div style="margin-top: 1.5rem;width: 100%;margin-left: auto; margin-right: auto; text-align: center;" >
            <el-table :data="billList" style="width: 100%;height: 45.5rem;" stripe v-loading="loading" :cell-style="{ textAlign: 'center' }" table-layout="fixed" border>
                <el-table-column label="户主姓名" header-align="center">
                    <template #default="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="录入时间" header-align="center">
                    <template #default="scope">{{ scope.row.time }}</template>
                </el-table-column>
                <el-table-column label="上次读数" header-align="center" >
                    <template #default="scope">{{ scope.row.previousReading }}   方</template>
                </el-table-column>
                <el-table-column label="本次读数" header-align="center" >
                    <template #default="scope">{{ scope.row.reading }}   方</template>
                </el-table-column>
                <el-table-column label="本次用水量" header-align="center">
                    <template #default="scope">{{ scope.row.summation }}   方</template>
                </el-table-column>
                <el-table-column label="结算价格(方/元)" header-align="center">
                    <template #default="scope">{{ scope.row.price }}</template>
                </el-table-column>
                <el-table-column label="总费用" header-align="center">
                    <template #default="scope">{{ scope.row.cost }}   元</template>
                </el-table-column>
                <el-table-column label="账单状态" header-align="center">
                    <template #default="scope">
                        <el-tag v-if="scope.row.status==='待支付'" size="large">{{ scope.row.status }}</el-tag>
                        <el-tag v-else-if="scope.row.status==='已支付'" size="large" type="success">{{ scope.row.status }}</el-tag>
                        <el-tag v-else-if="scope.row.status==='已退款'" size="large" type="warning">{{ scope.row.status }}</el-tag>
                        <el-tag v-else-if="scope.row.status==='余额不足'" size="large" type="danger">{{ scope.row.status }}</el-tag>
                        <el-tag v-else size="large" type="danger">{{ scope.row.status }}</el-tag>
                    </template>
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
                <template #empty><el-empty v-if="billList.length === 0 && !loading" description="暂无数据"  /></template>
            </el-table>
            <div style="display: flex; justify-content: center; align-items: center;margin-top: 12px;">
                <el-config-provider :locale="zhCn">
                    <el-pagination v-model:current-page="form.pageNo" layout="total, prev, pager, next, jumper" :total="form.total"
                                        :page-size="form.pageSize"  @current-change="handleCurrentChange"/>
                </el-config-provider>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialog" title="导出账单" width="400" destroy-on-close center>
        <el-config-provider :locale="zhCn">
            <el-date-picker v-model="timeInfo" type="daterange" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                            date-format="YYYY-MM-DD" :disabled-date="disabledDate" start-placeholder="起始日期" end-placeholder="终点日期"/>
        </el-config-provider>
        <template #footer>
            <el-button @click="timeInfo = null;dialog = false">取 消</el-button>
            <el-button type="primary" @click="download">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import {reactive,ref,onMounted} from "vue";
import request from "@/request/request"
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {Search,Refresh,Plus,Download,Bell} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'

document.title = "用水账单";
document.body.style.overflow = 'hidden';

onMounted(async () => {
    await getOption();
    await getBillList();
});

// 日期禁用设置
const disabledDate = (time) => {
    return time.getTime() > Date.now();
};

// 搜索相关
const form = ref({
    time:'',
    buildingNum:null,  // 楼号
    floor:null,          // 楼层
    doorplate:null,      // 门牌
    status:'',
    name:'',
    pageNo:1,
    pageSize:14,
    total:0
})
async function handleQuery() {
    form.value.buildingNum = null;
    form.value.floor = null;
    form.value.doorplate = null;
    if (option.value != null) {
        form.value.buildingNum = option.value[0];
        form.value.floor = option.value[1];
        form.value.doorplate = option.value[2];
    }
    await getBillList();
}
// 重置
function resetQuery() {
    form.value.time = '';
    form.value.buildingNum = null;
    form.value.floor = null;
    form.value.doorplate = null;
    form.value.name = '';
    form.value.status = '';
    form.value.pageNo = 1;
    form.value.pageSize = 14;
    form.value.total = 0;
    option.value = null;
    getBillList();
}

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
// 状态选择器相关
const statusOptions = [
    {
        value: 1,
        label: '已支付',
    },
    {
        value: 2,
        label: '余额不足',
    },
]

// 加载
const loading = ref(true)

// 获取账单
const billList = reactive([])
async function getBillList() {
    loading.value = true;
    await request.get('/waterBill/list',{params: form.value}).then(res => {
        billList.splice(0, billList.length);
        billList.push(...res.data.list);
        form.value.total = parseInt(res.data.total);
    })
    loading.value = false;
}
// 换页
async function handleCurrentChange(val) {
    form.value.pageNo = val;
    await getBillList(); 
}
// 导出
const dialog = ref(false)
const timeInfo = ref()
async function download() {
    if (timeInfo.value == null) {
        ElMessage.error('请选择导出时间')
        return;
    }
    const exportForm = ref({
        startTime: timeInfo.value[0],
        endTime: timeInfo.value[1],
    })
    await request.get('/waterBill/export', {
        params: exportForm.value,
        responseType: 'blob', // 重要，确保返回的是文件流
        isDownload: true // 添加自定义标识符
    }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '用水账单.xlsx'); // 设置下载文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成后移除链接
        ElMessage.success('导出成功')
        dialog.value = false
    }).catch(err => {
        ElMessage.error('导出失败，请稍后再试');
    });
}
// 通知余额不足住户
const loadingButton = ref(false)
// 通知住户充值
async function notifyRecharge() {
    loadingButton.value = true
    await request.post("/waterBill/notifyRecharge").then(res => {
        ElMessage.success(res.data)
    })
    loadingButton.value = false
}
</script>

<style>
</style>