<template>
  <div class="common-layout">
        <el-container style="height: 100vh;">
            <el-aside width="200px" style="height: 100vh;border-right: 1px solid #ccc;background-color: #304156;" >
                <el-menu default-active="/userManagement" background-color="#304156" text-color="#fff" @select="handleSelect">
                    <div class="centered-item">
                        <span class="my-font" style="font-family:华文行楷">幸&nbsp;福&nbsp;小&nbsp;区</span>
                    </div>
                    <el-menu-item index="/userManagement">
                        <el-icon><User /></el-icon>
                        <span style="width: 100%;">住户管理</span>
                    </el-menu-item>
                    <el-sub-menu index="3">
                        <template #title>
                            <svg style="margin-right: 9px;" t="1739090523250" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11441" width="20" height="24"><path d="M802.577067 235.9296l27.101866-53.589333C917.845333 265.216 972.8 382.293333 972.8 512c0 251.357867-206.301867 455.099733-460.8 455.099733a467.968 467.968 0 0 1-99.9424-10.717866l41.642667-50.2784c19.0464 2.730667 38.5024 4.096 58.299733 4.096 222.685867 0 403.217067-178.2784 403.217067-398.199467 0-107.178667-42.9056-204.4928-112.64-276.0704zM328.704 157.218133C198.144 223.1296 108.782933 357.239467 108.782933 512c0 130.696533 63.761067 246.6816 162.235734 319.2832L256 890.538667C132.539733 808.8576 51.2 669.7984 51.2 512 51.2 313.685333 179.677867 144.930133 358.912 82.602667L328.704 157.218133zM454.382933 0h403.217067l-201.591467 398.2336h143.9744L281.6 1024l115.2-455.099733H223.982933L454.417067 0z" fill="#cdcdcd" p-id="11442"></path></svg>
                            电相关
                        </template>
                        <el-menu-item index="/electricityManage">
                            <svg style="margin-right: 5px;" t="1739090236952" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4525" width="24" height="24"><path d="M735.268 102.457L250.069 521.042l260.086 82.937-203.108 317.564 519.131-384.429-272.706-80.277" p-id="4526" fill="#cdcdcd"></path></svg>
                            电记录管理
                        </el-menu-item>
                        <el-menu-item index="/electricityBill">
                            <svg style="margin-right: 5px;" t="1739090367913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8982" width="24" height="24"><path d="M640 256v42.666667h-213.333333V234.666667c0-8.533333 0-12.8 4.266666-21.333334H298.666667v640h469.333333V213.333333h-132.266667c4.266667 8.533333 4.266667 12.8 4.266667 21.333334V256z m-170.666667 0h128v-21.333333c0-34.133333-29.866667-64-64-64S469.333333 200.533333 469.333333 234.666667V256z m-21.333333-85.333333c21.333333-25.6 51.2-42.666667 85.333333-42.666667s64 17.066667 85.333334 42.666667H810.666667v725.333333H256V170.666667h192z" fill="#cdcdcd" p-id="8983"></path></svg>
                            用电账单
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <svg style="margin-right: 9px;" t="1739520320390" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4887" id="mx_n_1739520320391" width="20" height="24"><path d="M502.087111 149.390222a2819.456 2819.456 0 0 0-114.944 152.064c-29.681778 42.325333-56.32 83.285333-79.132444 122.168889-54.215111 92.387556-84.124444 168.604444-84.124445 220.103111 0 173.824 137.088 314.396444 305.777778 314.396445 168.675556 0 305.777778-140.572444 305.777778-314.396445 0-51.484444-29.909333-127.715556-84.124445-220.103111-22.812444-38.883556-49.450667-79.843556-79.132444-122.168889a2819.456 2819.456 0 0 0-114.944-152.064 2847.345778 2847.345778 0 0 0-27.591111-33.607111c-8.604444 10.325333-17.834667 21.560889-27.562667 33.607111zM158.876444 643.726222c0-66.204444 33.408-151.338667 93.056-253.013333 23.765333-40.504889 51.342222-82.915556 81.976889-126.577778a2883.413333 2883.413333 0 0 1 117.617778-155.619555 2798.250667 2798.250667 0 0 1 49.692445-59.790223l3.982222-4.579555 24.462222-27.960889 24.462222 27.960889 3.982222 4.579555c3.143111 3.683556 6.812444 7.964444 10.922667 12.828445 11.704889 13.852444 24.746667 29.610667 38.769778 46.961778a2883.413333 2883.413333 0 0 1 117.617778 155.619555c30.634667 43.662222 58.197333 86.072889 81.976889 126.577778 59.648 101.674667 93.056 186.808889 93.056 253.013333 0 209.365333-165.831111 379.420444-370.787556 379.420445-204.970667 0-370.787556-170.055111-370.787556-379.420445z" fill="#cdcdcd" p-id="4888"></path><path d="M529.664 910.193778c-142.876444 0-258.688-116.224-258.688-259.598222 0-143.36 134.442667-70.769778 258.688 0 124.757333 71.068444 258.688-143.36 258.688 0 0 143.374222-115.825778 259.598222-258.702222 259.598222z" fill="#cdcdcd" p-id="4889"></path><path d="M724.920889 180.821333c0-23.651556 15.658667-51.754667 41.813333-84.110222a512.213333 512.213333 0 0 1 39.594667-43.434667l11.235555-10.766222 11.249778 10.766222 3.527111 3.456A512.199111 512.199111 0 0 1 868.408889 96.711111a315.690667 315.690667 0 0 1 23.438222 32.668445C903.608889 148.48 910.222222 165.518222 910.222222 180.821333c0 51.584-41.443556 93.468444-92.643555 93.468445s-92.657778-41.884444-92.657778-93.468445z m67.100444-63.672889c-21.589333 26.695111-34.588444 50.033778-34.588444 63.672889 0 33.706667 26.965333 60.956444 60.145778 60.956445 33.166222 0 60.131556-27.249778 60.131555-60.956445 0-7.950222-4.664889-19.982222-13.553778-34.432a284.174222 284.174222 0 0 0-21.020444-29.240889 480.213333 480.213333 0 0 0-25.400889-28.828444 392.647111 392.647111 0 0 0-25.713778 28.828444zM113.777778 329.059556c0-17.692444 11.064889-37.546667 29.582222-60.458667a353.422222 353.422222 0 0 1 27.377778-30.023111l11.235555-10.780445 11.249778 10.780445a353.422222 353.422222 0 0 1 27.363556 30.008889c6.300444 7.793778 11.804444 15.402667 16.327111 22.755555 8.462222 13.752889 13.269333 26.140444 13.269333 37.717334 0 37.930667-30.492444 68.750222-68.195555 68.750222-37.717333 0-68.209778-30.819556-68.209778-68.750222z m54.869333-40.021334c-13.937778 17.251556-22.357333 32.341333-22.357333 40.021334 0 20.053333 16.014222 36.252444 35.697778 36.252444 19.669333 0 35.697778-16.199111 35.697777-36.252444 0-4.224-2.887111-11.619556-8.462222-20.693334a188.202667 188.202667 0 0 0-13.909333-19.342222 312.462222 312.462222 0 0 0-13.340445-15.374222 312.462222 312.462222 0 0 0-13.326222 15.388444z" fill="#cdcdcd" p-id="4890"></path></svg>
                            <span>水相关</span>
                        </template>
                        <el-menu-item index="/waterManage">
                            <svg style="margin-right: 5px;" t="1739520506285" class="icon" viewBox="0 0 1048 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7678" id="mx_n_1739520506286" width="24" height="24"><path d="M660.604878 227.577756H284.846829a31.219512 31.219512 0 0 0-18.556878 6.119024c-139.513756 103.149268-238.267317 226.70361-249.156683 342.440586-24.97561 265.640585 176.92722 436.573659 454.206439 436.573658 277.304195 0 479.182049-170.908098 454.206439-436.573658-10.814439-115.187512-109.243317-240.265366-246.259512-342.390634a31.219512 31.219512 0 0 0-18.681756-6.168976zM295.211707 289.966829h354.953366l9.290927 7.192976c114.91278 89.862244 195.608976 196.058537 203.925854 284.796878 21.154341 224.805463-148.330146 368.290341-392.042147 368.290341-243.687024 0-413.171512-143.484878-392.042146-368.290341l0.749268-6.693463c11.66361-87.414634 91.285854-189.315122 205.074732-277.553952l10.090146-7.742439z" fill="#cdcdcd" p-id="7679"></path><path d="M875.220293 546.41639a31.219512 31.219512 0 0 1 3.171902 62.264195l-3.171902 0.17483-691.224976-0.024976 0.299707 4.89522c0.299707 4.395707 0.699317 8.941268 1.248781 13.661658l0.924097 7.168c3.996098 28.147512 12.188098 55.720585 25.425171 81.345561 33.966829 65.735805 96.780488 111.39122 198.556098 128.524488a31.219512 31.219512 0 1 1-10.389854 61.564878c-121.081756-20.380098-200.629073-78.173659-243.637073-161.442342a316.940488 316.940488 0 0 1-35.065756-155.623024l0.374634-8.192c0.199805-2.997073 0.374634-5.194927 0.549463-6.593561a31.219512 31.219512 0 0 1 27.872781-27.573073l3.146927-0.149854h721.92zM125.752195 83.56839c-13.336976-22.228293 4.570537-49.576585 29.546146-47.203902l2.922147 0.424585L647.093073 127.625366c13.736585 2.547512 23.976585 13.861463 25.350244 27.523122l0.174829 3.171902-0.024975 100.476878a31.219512 31.219512 0 0 1-62.289171 3.171903l-0.149854-3.196878V184.245073L214.965073 110.841756l78.62322 130.84722a31.219512 31.219512 0 0 1-7.867317 40.935024l-2.822244 1.898146a31.219512 31.219512 0 0 1-40.935025-7.867317l-1.898146-2.797268-114.313366-190.314146z" fill="#cdcdcd" p-id="7680"></path><path d="M667.648 79.422439c47.378732-44.981073 98.653659-70.331317 152.600976-63.338146l5.070048 0.774244 3.196878 0.349658c13.262049 1.798244 29.92078 6.493659 47.153952 15.909464l5.769366 3.321756c36.214634 21.878634 58.59278 58.043317 59.092292 106.995512l-0.074927 6.743414-0.024975 129.798244 88.238829 131.47161a31.219512 31.219512 0 0 1-5.794341 41.259707l-2.747318 2.048a31.219512 31.219512 0 0 1-41.259707-5.794341l-2.048-2.747317-93.508683-139.313951a31.219512 31.219512 0 0 1-5.095024-13.736586l-0.199805-3.671414V149.229268C878.916683 119.333463 868.401951 101.525854 849.170732 89.912195a84.617366 84.617366 0 0 0-28.472195-10.63961l-4.820293-0.699317c-32.468293-5.74439-68.857756 11.638634-105.222244 46.154927-11.688585 11.089171-22.428098 23.102439-31.893854 35.065756l-6.193951 8.117073c-2.322732 3.121951-3.996098 5.544585-5.070049 7.143025a31.219512 31.219512 0 0 1-52.174048-34.291512l2.89717-4.245854a395.114146 395.114146 0 0 1 49.451708-57.094244z" fill="#cdcdcd" p-id="7681"></path></svg>
                            水记录管理
                        </el-menu-item>
                        <el-menu-item index="/waterBill">
                            <svg style="margin-right: 5px;" t="1739090367913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8982" width="24" height="24"><path d="M640 256v42.666667h-213.333333V234.666667c0-8.533333 0-12.8 4.266666-21.333334H298.666667v640h469.333333V213.333333h-132.266667c4.266667 8.533333 4.266667 12.8 4.266667 21.333334V256z m-170.666667 0h128v-21.333333c0-34.133333-29.866667-64-64-64S469.333333 200.533333 469.333333 234.666667V256z m-21.333333-85.333333c21.333333-25.6 51.2-42.666667 85.333333-42.666667s64 17.066667 85.333334 42.666667H810.666667v725.333333H256V170.666667h192z" fill="#cdcdcd" p-id="8983"></path></svg>
                            用水账单
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="/statistics">
                        <svg  style="margin-right: 8px;" t="1740209850538" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2635" width="24" height="24"><path d="M691.2 928.2V543.1c0-32.7 26.5-59.3 59.2-59.3h118.5c32.7 0 59.3 26.5 59.3 59.2V928.2h-237z m192.6-385.1c0-8.2-6.6-14.8-14.8-14.8H750.5c-8.2 0-14.8 6.6-14.9 14.7v340.8h148.2V543.1zM395 157.8c-0.1-32.6 26.3-59.2 58.9-59.3h118.8c32.6 0 59.1 26.5 59.1 59.1v770.6H395V157.8z m44.4 725.9h148V157.9c0-8.1-6.5-14.7-14.7-14.8H454.1c-8.1 0.1-14.7 6.7-14.7 14.8v725.8zM98.6 394.9c0-32.7 26.5-59.2 59.2-59.3h118.5c32.7-0.1 59.3 26.4 59.3 59.1v533.5h-237V394.9z m44.5 488.8h148.2V394.9c0-8.2-6.7-14.8-14.8-14.8H158c-8.2 0-14.8 6.6-14.9 14.7v488.9z" p-id="2636" fill="#cdcdcd"></path></svg>
                        <span>统计</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="header-centered">
                    <span style="font-size: 16px;margin-right: 6px;">欢迎您使用本系统，{{  userInfo.username }}</span>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            
                            <el-icon><ArrowDownBold /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="isOpen = true">修改密码</el-dropdown-item>
                                <el-dropdown-item divided @click="logOut()">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog v-model="isOpen" :before-close="handleClose" title="修改密码" width="400" destroy-on-close center>
            <el-form :model="pwInfo" :rules="rules" scroll-to-error ref="ruleRef">
                <el-form-item prop="oldPw">
                    <el-input v-model="pwInfo.oldPw" placeholder="请输入原密码"  :prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item prop="newPw">
                    <el-input v-model="pwInfo.newPw" placeholder="请输入新密码" :prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item prop="confirmPw">
                    <el-input v-model="pwInfo.confirmPw" placeholder="请确认新密码" :prefix-icon="Lock" show-password />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button size="large" @click="cancel" round>取消</el-button>
                <el-button type="primary" size="large" @click="checkForm" round>确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import router from '@/router';
import request from "@/request/request"
import { reactive,onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Lock } from '@element-plus/icons-vue';

onMounted(async () => {
    await getUserInfo();
});

function handleSelect(key, keyPath) {
    router.push(key)
}
// 使用者信息
const userInfo = reactive({
    id:'',
    username:'',
    phone:''
})

async function getUserInfo() {
    await request.get('/admin/info').then(res => {
        userInfo.username = res.data.username;
        userInfo.phone = res.data.phone;
        userInfo.id = res.data.id;
    })
}
// 修改密码
const isOpen = ref(false)

const pwInfo = reactive({
    id:'',
    oldPw:'',
    newPw:'',
    confirmPw:''
})
const ruleRef = ref(null)
const rules = {
    oldPw: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    newPw: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPw: [{ required: true, message: '请确认新密码', trigger: 'blur' }]
}
function cancel() {
    isOpen.value = false;
    pwInfo.id = '';
    pwInfo.oldPw = '';
    pwInfo.newPw = '';
    pwInfo.confirmPw = '';
    ElMessage.info('已取消')
}
function checkForm() {
    ruleRef.value.validate(valid => {
        if (valid) {
            if (pwInfo.newPw === pwInfo.confirmPw) {
                // 修改
                update();
            } else {
                ElMessage.error('两次密码不一致')
            }
        } else {
            ElMessage.error('登录信息有误！')
        }
    })
}
async function update() {
    pwInfo.id = userInfo.id;
    await request.put('/admin/updatePassword',pwInfo).then(res => {
        ElMessage.success(res.data)
        isOpen.value = false;
        pwInfo.id = '';
        pwInfo.oldPw = '';
        pwInfo.newPw = '';
        pwInfo.confirmPw = '';
    })
}
function handleClose() {
    pwInfo.oldPw = '';
    pwInfo.newPw = '';
    pwInfo.confirmPw = '';
}

// 登出
async function logOut() {
    await request.get('/admin/logout').then(res => {
        ElMessage.success(res.data)
        router.push('/')
    })
}
</script>

<style>
.el-menu-item {
    height: 60px; /* 设置高度 */
    line-height: 70px; /* 设置行高，使内容垂直居中 */
}
.header-centered {
    text-align: right;
    font-size: 12px;
    border-bottom: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.centered-item {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.my-font {
    font-family: 'Arial', sans-serif;
    font-size: 33px;
    color: #35e60e;
}
.button-group {
    display: block;
    margin: 0 auto;
}
</style>