<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :model="form" inline>
                    <el-form-item label="日期">
                        <el-date-picker v-model="form.time" value-format="YYYY-MM-DD" type="month" placeholder="选择月份">
                            <template #default="cell">
                                <div class="el-date-table-cell" :class="{ current: cell.isCurrent }">
                                    <span class="el-date-table-cell__text">{{ cell.text + 1 }}月</span>
                                </div>
                            </template>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="住宅">
                        <el-cascader :options="buildingOption" :props="myProps" v-model="option" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                        <el-tooltip content="导出抄电表" placement="bottom" effect="light">
                            <el-button type="success" :icon="Download" auto-insert-space plain @click="download">导出</el-button>
                        </el-tooltip>
                        <el-tooltip content="导入抄电表" placement="bottom" effect="light">
                            <el-button type="success" :icon="Upload" auto-insert-space plain @click="dialogVisible = true">录入</el-button>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div style="display: flex; align-items: flex-start;">
            <tariff :isAdmin="true" :isWater="false"></tariff>
        </div>
        <div style="margin-top: 20px;width: 90%;margin-left: auto; margin-right: auto; text-align: center;">
            <el-table :data="meterList" style="width: 100%;height: 69vh;" stripe v-loading="loading" :cell-style="{ textAlign: 'center' }" table-layout="fixed" border>
                <el-table-column label="户主姓名" header-align="center">
                    <template #default="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="录入时间" header-align="center">
                    <template #default="scope">{{ scope.row.time }}</template>
                </el-table-column>
                <el-table-column label="上次读数" header-align="center">
                    <template #default="scope">{{ scope.row.previousReading }}   度</template>
                </el-table-column>
                <el-table-column label="本次读数" header-align="center">
                    <template #default="scope">{{ scope.row.reading }}   度</template>
                </el-table-column>
                <el-table-column label="本次用电量" header-align="center">
                    <template #default="scope">{{ scope.row.reading - scope.row.previousReading }}   度</template>
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
                <el-table-column label="操作" header-align="center">
                    <template #default="scope">
                        <el-popconfirm width="250" :icon="null" @confirm="handleConfirm(scope.row.id)" @cancel="handleCancel">
                            <template #reference>
                                <el-button type="primary" link @click="modReding(scope.row.reading)">
                                    <el-icon><EditPen /></el-icon>修改
                                </el-button>
                            </template>
                            <template #actions="{ confirm, cancel }">
                                <div style="text-align: center;margin-bottom: 10px;">修改本次读数</div>
                                <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                                    <el-input-number v-model="reading" :min="0" :max="500" :step="1" >
                                        <template #suffix>
                                            <span>度</span>
                                        </template>
                                    </el-input-number>
                                    <div style="margin-top: 10px;margin-bottom: 10px;">
                                        <el-button @click="cancel">取消</el-button>
                                        <el-button type="primary" @click="confirm">确定</el-button>
                                    </div>
                                </div>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <template #empty><el-empty v-if="meterList.length === 0 && !loading" description="暂无数据"  /></template>
            </el-table>
            <div style="display: flex; justify-content: center; align-items: center;margin-top: 12px;">
                <el-config-provider :locale="zhCn">
                    <el-pagination v-model:current-page="form.pageNo" layout="total, prev, pager, next, jumper" :total="form.total"
                                        :page-size="form.pageSize"  @current-change="handleCurrentChange"/>
                </el-config-provider>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" width="500" title="导入抄电表表格" :before-close="handleClose" destroy-on-close center>
            <!-- is-water判断是否是水表记录上传 -->
            <my-upload @close="close" :is-water="false"></my-upload>
        </el-dialog>
    </div>
</template>

<script setup>
import {reactive,ref,onMounted} from "vue";
import request from "@/request/request"
import {Search,Refresh,Plus,Download,Upload} from '@element-plus/icons-vue';
import Tariff from "@/components/Tariff.vue";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import MyUpload from "@/components/MyUpload.vue";

onMounted(async () => {
    await getOption();
    await getMeterList();
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
    time:'',
    buildingNum:null,  // 楼号
    floor:null,          // 楼层
    doorplate:null,      // 门牌
    pageNo:1,
    pageSize:13,
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
    getMeterList();
}
// 重置
function resetQuery() {
    form.value.time = '';
    form.value.buildingNum = null;
    form.value.floor = null;
    form.value.doorplate = null;
    form.value.pageNo = 1;
    form.value.pageSize = 13;
    form.value.total = 0;
    option.value = null;
    getMeterList()
}

// 用电记录列表
const meterList = reactive([])
async function getMeterList() {
    loading.value = true;
    await request.get('/electricityMeter/list',{params: form.value}).then(res => {
        meterList.splice(0, meterList.length);
        meterList.push(...res.data.list);
        form.value.total = parseInt(res.data.total);
    })
    loading.value = false;
}
async function handleCurrentChange(val) {
    form.value.pageNo = val;
    await getMeterList(); 
}

// 导出
async function download() {
    await request.get('/electricityMeter/export', {
        responseType: 'blob', // 重要，确保返回的是文件流
        isDownload: true // 添加自定义标识符
    }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '抄电表.xlsx'); // 设置下载文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成后移除链接
        ElMessage.success('导出成功')
    }).catch(err => {
        ElMessage.error('导出失败，请稍后再试');
    });
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
    resetQuery();
}

// 修改
const reading = ref()
function modReding(num) {
    reading.value = num;
}
async function handleConfirm(id) {
    await request.put('/electricityMeter/update',null,{
        params:{
            id: id,
            reading: reading.value
        }
    }).then(res => {
        ElMessage.success(res.data)
        getMeterList()
    })
}
function handleCancel() {
    ElMessage.info('已取消');
}
</script>

<style>

</style>