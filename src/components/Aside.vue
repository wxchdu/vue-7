<template xmlns="">
    <!-- @select="handleSelect" -->
    <el-menu :collapse-transition="false" :collapse="isCollapse" :default-openeds="['1', '3']" style="height:100%"
        background-color="rgb(48,65,86)" text-color="#fff" active-text-color="#ffd04b" router>

        <div style="height:60px;line-height:60px;text-align:center">
            <img src="../assets/logo.png" alt="" style="width:20px ; position:relative; top:5px; margin-right: 5px">
            <b style="color: white" v-show="logoTextShow">后台管理系统</b>
        </div>

        <el-menu-item index="/home">
            <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">主页</span>
            </template>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="/community">
                <template slot="title">
                    <i class="el-icon-s-claim"></i>
                    <span slot="title">社团管理</span>
                </template>

            </el-menu-item>
            <el-menu-item index="/student">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">学生管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/activity">
                <template slot="title">
                    <i class="el-icon-s-management"></i>
                    <span slot="title">活动管理</span>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "Aside",
    props: {
        isCollapse: Boolean,
        logoTextShow: Boolean
    },
    // methods: {
    //     handleSelect(index) {
    //         // console.log(index)
    //         // console.log(this.$router.options.routes)
    //     }
    // }
}
</script>

<style scoped>

</style>