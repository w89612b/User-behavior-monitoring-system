<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mian' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监测点管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chunk">
      <div class="chunk-head">查询条件</div>
      <div class="chunk-body">
        <el-form :inline="true" :model="pagedata" ref="pagedata">
          <el-form-item label="应用选择">
            <el-select v-model="pagedata.appKey" placeholder="请选择" size="mini" clearable>
              <el-option
                v-for="item in appKeys"
                :key="item.id"
                :label="item.app_name"
                :value="item.app_key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search()" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk-head"><el-button type="primary" @click="dialogFormVisible=true" size="mini">增加</el-button></div>
      <div class="chunk-body">
        <el-table :data="tableData">
          <el-table-column prop="id"  label="id" width="50"></el-table-column>
          <el-table-column prop="anchor_name"  label="名称" width="200"></el-table-column>
          <el-table-column prop="anchor_dep"  label="说明" width="280"></el-table-column>
          <el-table-column prop="anchor_location" label="位置"></el-table-column>
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
    
    <el-dialog title="监测点管理" :visible.sync="dialogFormVisible" :before-close="beforeClose">
      <el-form :model="anchorform" :rules="rules" ref="anchorform">
        <el-form-item label="名称" prop="anchorName" :label-width="formLabelWidth">
          <el-input v-model="anchorform.anchorName" size="mini" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用选择" prop="appKey" :label-width="formLabelWidth">
          <el-select v-model="anchorform.appKey" placeholder="请选择" size="mini" clearable >
            <el-option
              v-for="item in appKeys"
              :key="item.id"
              :label="item.app_name"
              :value="item.app_key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="anchorform.anchorDep"  size="mini" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="anchorform.anchorLocation" size="mini" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('anchorform')" size="mini">取 消</el-button>
        <el-button type="primary" @click="formSubmit('anchorform')" size="mini">确 定</el-button>
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
    this.getAppKeys()
  },
  methods: {
    getAppKeys () {
      this.$http.post(this.getAPI['backstage'].app.all).then((res) => {
        if (res.data.code) {
          this.$data.appKeys = res.data.data
        }
      })
    },
    search () {
      this.$data.pagedata.page = 1
      this.$data.pagedata.maxpage = null
      this.select()
    },
    select () {
      this.$http.post(this.getAPI['backstage'].anchor.list, this.$data.pagedata).then((res) => {
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
      this.$http.delete(this.getAPI['backstage'].anchor.del, {params: { id: row.id }}).then((res) => {
        if (res.data.code) {
          this.$message.success(res.data.msg)
          this.select()
        } else {
          this.$message.success(res.data.msg)
        }
      })
    },
    edit (row) {
      this.$data.anchorform.anchorName = row.anchor_name
      this.$data.anchorform.anchorDep = row.anchor_dep
      this.$data.anchorform.anchorLocation = row.anchor_location
      this.$data.anchorform.appKey = row.app_key
      this.$data.dialogFormVisible = true
      this.$data.anchorformEdit = row.id
    },
    formSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.$data.anchorformEdit) {
            this.$http.post(this.getAPI['backstage'].anchor.add, this.$data.anchorform).then((res) => {
              if (res.data.code) {
                this.$message.success(res.data.msg)
                this.resetForm(formName)
                this.select()
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$http.put(this.getAPI['backstage'].anchor.put, this.$data.anchorform, {params: { id: this.$data.anchorformEdit }}).then((res) => {
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
          Baseinfo.anchorId = 3
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
      this.$data.anchorformEdit = false
      this.$data.anchorform.anchorDep = ''
      this.$data.anchorform.anchorLocation = ''
      this.$data.anchorform.anchorName = ''
      this.$data.anchorform.appKey = ''
    },
    beforeClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        this.resetForm('anchorform')
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
      anchorform: {
        anchorName: '',
        anchorDep: '',
        anchorLocation: '',
        appKey: ''
      },
      anchorformEdit: false,
      pagedata: {
        page: 1,
        row: 10,
        maxpage: null,
        appKey: ''
      },
      appKeys: [],
      dialogFormVisible: false,
      formLabelWidth: '90px',
      rules: {
        anchorName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        appKey: [
          { required: true, message: '请选择应用', trigger: 'change' }
        ]
      }
    }
  },
  computed: mapGetters({
    getAPI: 'api/getAPI'
  })
}
</script>
