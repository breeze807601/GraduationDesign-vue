<template>
    <div style="width: 265px;">
        <el-row>
            <el-col :span="12">
                <el-descriptions direction="vertical"  border>
                    <el-descriptions-item align="center" width="120px" :label="title">{{ tariff.price }}</el-descriptions-item>
                </el-descriptions>
            </el-col>
            <el-col :span="12" v-if="isAdmin">
                <div class="centered-col">
                    <el-popconfirm width="250" :icon="null" @confirm="handleConfirm" @cancel="handleCancel">
                        <template #reference>
                            <el-button @click="isOpen = true" plain><el-icon><Edit /></el-icon>修改</el-button>
                        </template>
                        <template #actions="{ confirm, cancel }">
                            <div style="text-align: center;margin-bottom: 10px;">修改价格</div>
                            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                                <el-input-number v-model="tariff.price" :min="0" :max="10" :step="0.1" >
                                    <template #suffix>
                                        <span>元</span>
                                    </template>
                                </el-input-number>
                                <div style="margin-top: 10px;margin-bottom: 10px;">
                                    <el-button @click="cancel">取消</el-button>
                                    <el-button type="primary" @click="confirm">确定</el-button>
                                </div>
                            </div>
                        </template>
                    </el-popconfirm>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import request from "@/request/request"
import { ElMessage } from "element-plus";
import {reactive,ref,onMounted} from "vue";
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isAdmin: Boolean,
    isWater:Boolean,
});

onMounted(async () => {
    await getTariff();
});

const tariff = reactive({
    id: null,
    name: null,
    price: null
})

const title = ref()

async function getTariff() {
    await request.get('/tariff',{
        params: {
            name: props.isWater ? 1 : 0
        }
    }).then(res => {
        tariff.id = res.data.id;
        tariff.name = res.data.name;
        tariff.price = res.data.price;
        title.value = props.isWater ? '当前水价(吨/元)' : '当前电价(度/元)'
    })
}

// 修改相关
async function handleConfirm() {
    await request.put('/tariff',tariff).then(res => {
        ElMessage.success(res.data)
    })
}
function handleCancel() {
    ElMessage.info('已取消')
}

</script>

<style>
.centered-col {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100%; /* 确保高度占满整个父容器 */
}
</style>