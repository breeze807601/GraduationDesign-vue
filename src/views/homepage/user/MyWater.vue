<template>
    <div style="height: 100%;width: 100%;display: flex; justify-content: space-between; ">
        <el-card style="width: 40%;height: 52rem;margin-left: 5%" v-loading="loading">
            <el-scrollbar height="45rem">
                <el-timeline style="max-width: 600px" center >
                    <el-timeline-item v-for="item in billList" :timestamp="item.time" placement="top" hollow color="primary">
                        <el-card>
                            <div style="display: flex; justify-content: space-between; align-items: center;margin-bottom: 5px">
                                <el-tag v-if="item.status === '已支付'" type="success">{{ item.status }}</el-tag>
                                <el-tag v-else type="danger">{{ item.status }}</el-tag>
                                <el-button type="primary" link :icon="View" @click="details(item)">详情</el-button>
                            </div>
                            <el-descriptions direction="vertical" :column="5" border >
                                <el-descriptions-item label="上次读数">{{ item.previousReading }} 方</el-descriptions-item>
                                <el-descriptions-item label="本次读数">{{ item.reading }} 方</el-descriptions-item>
                                <el-descriptions-item label="用电量">{{ item.summation }} 方</el-descriptions-item>
                                <el-descriptions-item label="总费用">{{ item.cost }} 元</el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
            <template #footer>
                <div style="display: flex; justify-content: center; align-items: center;">
                    <el-config-provider :locale="zhCn">
                        <el-pagination v-model:current-page="form.pageNo" layout="total, prev, pager, next, jumper" :total="form.total"
                                       :page-size="form.pageSize"  @current-change="handleCurrentChange"/>
                    </el-config-provider>
                </div>
            </template>
        </el-card>
        <el-card style="width: 45%;height: 52rem;margin-right: 5%" v-loading="loading">
            <span style="font-size: 1.5rem;font-weight: bold;margin-bottom: 1rem">可用额度充值</span>
            <water-limit />
        </el-card>
    </div>
    <el-dialog v-model="dialog" title="详情" width="600">
        <el-descriptions direction="vertical" :column="4" border>
            <el-descriptions-item label="时间">{{ detailsInfo.time }}</el-descriptions-item>
            <el-descriptions-item label="上次读数">{{ detailsInfo.previousReading }} 方</el-descriptions-item>
            <el-descriptions-item label="本次读数">{{ detailsInfo.reading }} 方</el-descriptions-item>
            <el-descriptions-item label="用水量">{{ detailsInfo.summation }} 方</el-descriptions-item>
            <el-descriptions-item label="总费用">{{ detailsInfo.cost }} 元</el-descriptions-item>
            <el-descriptions-item label="当时价格">{{ detailsInfo.price }} 元/方</el-descriptions-item>
            <el-descriptions-item label="可用额度">{{ detailsInfo.availableLimit }} 方</el-descriptions-item>
            <el-descriptions-item label="状态">
                <el-tag v-if="detailsInfo.status === '已支付'" type="success">{{ detailsInfo.status }}</el-tag>
                <el-tag v-else type="danger">{{ detailsInfo.status }}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
        <template #footer>
            <el-button v-if="detailsInfo.status === '余额不足'" type="primary" @click="settlement">结算</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import request from "@/request/request";
import {onMounted, reactive, ref} from "vue";
import {View} from "@element-plus/icons-vue";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {ElMessage} from "element-plus";
import WaterLimit from "@/components/recharge/WaterLimit.vue";

document.title = "幸福小区系统-我的用水";
document.body.style.overflow = 'hidden';

onMounted(() => {
    getBillList();
})

const loading = ref(false);

// 搜索相关
const form = ref({
    pageNo:1,
    pageSize:10,
    total:0
})

// 获取账单
const billList = reactive([])
async function getBillList() {
    loading.value = true;
    await request.get('/waterBill/getUserBill',{params: form.value}).then(res => {
        billList.splice(0, billList.length);
        billList.push(...res.data.list);
        form.value.total = parseInt(res.data.total);
    })
    loading.value = false;
}

async function handleCurrentChange(val) {
    form.value.pageNo = val;
    await getBillList();
}

// 详情
const dialog = ref(false);
const detailsInfo = reactive({
    id: '',
    time: '',
    previousReading: '',
    reading: '',
    summation: '',
    cost: '',
    status: '',
    availableLimit: '',
    meterId: '',
    price: '',
})
function details(bill) {
    detailsInfo.id = bill.id;
    detailsInfo.time = bill.time;
    detailsInfo.previousReading = bill.previousReading;
    detailsInfo.reading = bill.reading;
    detailsInfo.summation = bill.summation;
    detailsInfo.cost = bill.cost;
    detailsInfo.status = bill.status;
    detailsInfo.availableLimit = bill.availableLimit;
    detailsInfo.meterId = bill.meterId;
    detailsInfo.price = bill.price;
    dialog.value = true;
}

async function settlement() {
    const data = reactive({
        id: detailsInfo.id,
        meterId: detailsInfo.meterId,
        status: detailsInfo.status,
        summation: detailsInfo.summation,
    })
    await request.post('/waterBill/settlement',data).then(res => {
        ElMessage.success(res.data);
        getBillList();
        dialog.value = false;
    })
}
</script>

<style scoped>

</style>