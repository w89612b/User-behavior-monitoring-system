<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mian' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应用管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chunk">
      <div class="chunk-head"><el-button type="primary" @click="dialogFormVisible=true" size="mini">增加</el-button></div>
      <div class="chunk-body">
        <el-table :data="tableData">
          <el-table-column prop="app_name"  label="应用名称" width="200"></el-table-column>
          <el-table-column prop="app_dep"  label="应用说明"></el-table-column>
          <el-table-column prop="app_key" label="key" width="280"></el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="chunk-buttom">
        <el-button type="primary" :disabled="pagedata.page===1" icon="el-icon-arrow-left" @click="prev" size="mini">上一页</el-button>
        <el-button type="primary" :disabled="pagedata.maxpage && pagedata.page == pagedata.maxpage" icon="el-icon-arrow-right" @click="next" size="mini">下一页</el-button>
      </div>
    </div>
    
    <el-dialog title="应用管理" :visible.sync="dialogFormVisible" :before-close="beforeClose">
      <el-form :model="appform" :rules="rules" ref="appform">
        <el-form-item label="应用名称" prop="appName" :label-width="formLabelWidth">
          <el-input v-model="appform.appName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用说明" prop="appDep" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="appform.appDep" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('appform')">取 消</el-button>
        <el-button type="primary" @click="appFormsubmit('appform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  created () {
    this.select()
    var Baseinfo = this.$store.getters['framework/getBaseinfo']
    Baseinfo.anchorId = 4
    this.$http.post(this.getAPI['backstage'].baseinfo.add, Baseinfo)
  },
  methods: {
    select () {
      this.$http.post(this.getAPI['backstage'].app.list, this.$data.pagedata).then((res) => {
        if (res.data.code) {
          var l = res.data.data.length
          if (l) {
            this.$data.tableData = res.data.data
            if (l < 10) {
              this.$data.pagedata.maxpage = this.$data.pagedata.page
            }
          } else {
            if (this.$data.pagedata.page > 1) {
              this.$data.pagedata.maxpage = --this.$data.pagedata.page
              this.select()
            } else {
              this.$data.pagedata.maxpage = this.$data.pagedata.page
              this.$data.tableData = []
            }
          }
        }
      })
    },
    del (row) {
      this.$http.delete(this.getAPI['backstage'].app.del, {params: { id: row.id }}).then((res) => {
        if (res.data.code) {
          this.$message.success(res.data.msg)
          this.select()
        } else {
          this.$message.success(res.data.msg)
        }
      })
    },
    edit (row) {
      this.$data.appform.appName = row.app_name
      this.$data.appform.appDep = row.app_dep
      this.$data.dialogFormVisible = true
      this.$data.appformEdit = row.id
    },
    appFormsubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.$data.appformEdit) {
            this.$http.post(this.getAPI['backstage'].app.add, this.$data.appform).then((res) => {
              if (res.data.code) {
                this.$message.success(res.data.msg)
                this.resetForm(formName)
                this.select()
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$http.put(this.getAPI['backstage'].app.put, this.$data.appform, {params: { id: this.$data.appformEdit }}).then((res) => {
              if (res.data.code) {
                this.$message.success(res.data.msg)
                this.resetForm(formName)
                this.select()
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
          var Baseinfo = this.$store.getters['framework/getBaseinfo']
          Baseinfo.anchorId = 2
          this.$http.post(this.getAPI['backstage'].baseinfo.add, Baseinfo)
        } else {
          this.$message.error('请填写相应信息！')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$data.dialogFormVisible = false
      this.$refs[formName].resetFields()
      this.$data.appform.appName = ''
      this.$data.appform.appDep = ''
      this.$data.appformEdit = false
    },
    beforeClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        this.resetForm('appform')
      })
      .catch(_ => {})
    },
    next () {
      this.$data.pagedata.page++
      this.select()
    },
    prev () {
      this.$data.pagedata.page--
      this.select()
    }
  },
  data () {
    return {
      tableData: [],
      appform: {
        appName: '',
        appDep: ''
      },
      appformEdit: false,
      pagedata: {
        page: 1,
        row: 10,
        maxpage: null
      },
      dialogFormVisible: false,
      formLabelWidth: '90px',
      rules: {
        appName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        appDep: [
          { required: true, message: '请选择应用说明', trigger: 'blur' },
          { min: 20, max: 100, message: '长度在 20 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters({
    getAPI: 'api/getAPI'
  })
}
</script>
