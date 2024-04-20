<template>
    <div>
        <div style="padding:10px 0">
            <el-input style="width:200px" placeholder="请输入活动类型" suffix-icon="el-icon-search" v-model="type">
            </el-input>
            <el-input style="width:200px" placeholder="请输入活动地点" suffix-icon="el-icon-s-data" v-model="location"
                class="ml-5">
            </el-input>
            <el-input style="width:200px" placeholder="请输入活动名称" suffix-icon="el-icon-date" v-model="name" class="ml-5">
            </el-input>
            <!-- </el-input> -->
            <el-button type="primary" style="margin-left: 10px" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
                icon-color="red" title="您确定批量删除这些数据吗？" @confirm="delBatch">

                <el-button type="danger" slot="reference" class="ml-5">批量删除<i class="el-icon-remove-outline"></i>
                </el-button>
            </el-popconfirm>
            <!-- <el-button type="primary" class="ml-5">导入<i class="el-icon-bottom"></i></el-button> -->
            <el-button type="primary" class="ml-5" @click="exp">导出<i class="el-icon-bottom"></i></el-button>
        </div>
        <!-- 表单最开头一行 -->
        <el-table :data="tableData" :header-cell-style="{ textAlign: 'center' }" border stripe
            header-cell-class-name="'headerBg'" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="社团编号" width="80">
            </el-table-column>
            <el-table-column prop="activityid" label="活动编号" width="80">
            </el-table-column>
            <el-table-column prop="name" label="活动名称" width="80">
            </el-table-column>
            <el-table-column prop="type" label="活动类型">
            </el-table-column>
            <el-table-column prop="description" label="活动描述和内容" width="150">
            </el-table-column>
            <el-table-column prop="time" label="时间">
            </el-table-column>
            <el-table-column prop="location" label="活动地点" width="80">
            </el-table-column>
            <el-table-column prop="population" label="参与人数" width="80">
            </el-table-column>

            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>

                    <el-popconfirm class="ml-5" confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
                        icon-color="red" title="您确定删除吗？" @confirm="del(scope.row.id)">
                        <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>


        <div style="padding:10px 0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!-- 表单内某一行点编辑出来的页面 -->
        <el-dialog title="社团信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form labei-width="80px" size="small">
                <el-form-item label="社团编号">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动编号">
                    <el-input v-model="form.activityid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动类型">
                    <el-input v-model="form.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动描述和内容">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-input v-model="form.time" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="form.location" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="参与人数">
                    <el-input v-model="form.population" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "User",
    data() {
        return {
            // tableData: [{
            //     communitynumber: '0001',
            //     activitynumber: '01',
            //     activityname: '迎新晚会',
            //     activitytype: '文娱活动',
            //     activitydescribe: '欢迎新生，展示美好',
            //     activitytime: '2022-10-31',
            //     site: '学活',
            //     peoplenumber: '200'
            // }, {
            //     communitynumber: '0001',
            //     activitynumber: '02',
            //     activityname: '校运会',
            //     activitytype: '体育活动',
            //     activitydescribe: '德智体全面发展',
            //     activitytime: '2022-11-03',
            //     site: '体育馆',
            //     peoplenumber: '400'
            // }, {
            //     communitynumber: '0001',
            //     activitynumber: '03',
            //     activityname: '图书整理',
            //     activitytype: '公益活动',
            //     activitydescribe: '井然有序，赏心悦目',
            //     activitytime: '2022-10-15',
            //     site: '图书馆',
            //     peoplenumber: '30'
            // }],
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 2,
            type: "",
            location: "",
            name: "",
            form: {},
            dialogFormVisible: false,
            multipleSelection: []
        }
    },
    created() {
        this.load()
    },
    methods: {
        save() {
            //把/user改成/community了
            this.request.post("/activity", this.form).then(res => {
                if (res.data) {
                    this.$message.success("保存成功")
                    this.dialogFormVisible = false
                    this.load()
                } else {
                    this.$message.error("保存失败")
                }
            })
        },
        handleAdd() {
            this.dialogFormVisible = true
            this.form = {}
        },
        handleEdit(row) {
            this.form = row
            this.dialogFormVisible = true
        },
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val
        },
        delBatch() {
            let ids = this.multipleSelection.map(v => v.id)
            // [{},{},{}]=[1,2,3]
            ///user/delBatch 改成了 /user/del/batch
            this.request.post("/activity/del/batch", ids).then(res => {
                if (res.data) {
                    this.$message.success("批量删除成功")
                    this.load()
                } else {
                    this.$message.error("批量删除失败")
                }
            })
        },
        del(id) {
            this.request.delete("/activity/" + id).then(res => {
                if (res.data) {
                    this.$message.success("删除成功")
                    this.load()
                } else {
                    this.$message.error("删除失败")
                }
            })
        },

        //load重新请求数据
        load() {
            this.request.get("/activity/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    type: this.type,
                    location: this.location,
                    name: this.name
                }
            }).then(res => {
                this.tableData = res.data.records
                this.total = res.data.total
            })

            // + this.pageNum + "&pageSize=" + this.pageSize + "&username" + this.username + "&email" + this.email + "&address" + this.address

            // fetch("http://localhost:9090/user/page?pageNum=" + this.pageNum + "&pageSize=2" + this.pageSize + "&username" + this.username + "&email" + this.email + "&address" + this.address).then(res => res.json()).then(res => {
            //   console.log(res)
            //   this.tableData = res.data
            //   this.total = res.total
            // })
        },
        reset() {
            this.type = ""
            this.location = ""
            this.name = ""
            this.load()
        },
        handleSizeChange(pageSize) {
            console.log(pageSize)
            this.pageSize = pageSize
            this.load()
        },
        handleCurrentChange(pageNum) {
            console.log(pageNum)
            this.pageNum = pageNum
            this.load()
        },
        exp() {
            window.open("http://localhost:9090/user/export")
        }
    }
}
</script>

<style scoped>
/* .headerBg {
    background-color: #eee !important;
} */
body {
    background-color: #eee !important;
}
</style>