<template>
    <div style="line-height: 60px; display: flex">
        <div style="flex: 1">

            <span :class="collapseBtnClass" style="cursor: pointer; 
            font-size: 18px" @click="collapse"></span>

            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px;">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown style="width: 101px; cursor: pointer; margin-left: 5px">
            <div style="display: inline-block">
                <!-- :src="user.avatarUrl" 把头像弄活 -->
                <img src="../assets/touxiang.jpeg" alt=""
                    style="width: 40px; border-radius:50%; position:relative; top: 10px; right: 10px">
                <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width:100px; text-align: center">
                <el-dropdown-item style="front-size:14px; padding: 5px 0">
                    <router-link to="/person" style=" color: #606266 ;text-decoration: none ">
                        管理员信息
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item style="front-size:14px; padding: 5px 0">
                    <span style="text-decoration: none" @click="gofront">进入前端页面</span>
                </el-dropdown-item>
                <el-dropdown-item style="front-size:14px; padding: 5px 0">
                    <span style="text-decoration: none" @click="logout">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

</template>

<script>
export default {
    name: "Header",
    props: {
        collapseBtnClass: String,
        collapse: Function
    },
    computed: {
        currentPathName() {
            return this.$store.state.currentPathName;  //需要监听的数据
        }
    },
    data() {
        return {
            user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
    },
    // watch: {   //监听路由变化
    //     '$route': function () {
    //         this.currentPathName = localStorage.getItem("currentPathName")
    //     }
    // }
    methods: {
        // collapse() {
        //     this.$emit("asideCollapse")
        // },
        logout() {
            this.$router.push("/login")
            // localStorage.removeItem("user")
            this.$message.success("退出成功")
        },
        gofront() {
            this.$router.push("/front")
            // localStorage.removeItem("user")
            this.$message.success("进入前端页面")
        }
    }
}
</script>

<style scoped>

</style>