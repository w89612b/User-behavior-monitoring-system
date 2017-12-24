<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mian' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>uri管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chunk">
      <div class="chunk-head"><el-button type="primary" @click="dialogFormVisible=true" size="mini">增加</el-button> <span style="color:red">使用URI请加上'/common/'+自定义路径 例如： /common/abc/aa</span></div>
      <div class="chunk-body">
        <el-table :data="tableData">
          <el-table-column prop="uri"  label="访问路径" width="400"></el-table-column>
          <el-table-column prop="uri_name"  label="中文名称" width="280"></el-table-column>
          <el-table-column prop="uri_body" label="响应体"></el-table-column>
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
    
    <el-dialog title="uri管理" :visible.sync="dialogFormVisible" :before-close="beforeClose">
      <el-form :model="uriform" :rules="rules" ref="uriform">
        <el-form-item label="访问路径" prop="uri" :label-width="formLabelWidth">
          <el-input v-model="uriform.uri" auto-complete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" :label-width="formLabelWidth">
          <el-input v-model="uriform.uriName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="响应数据" prop="uriBody" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="uriform.uriBody" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('uriform')">取 消</el-button>
        <el-button type="primary" @click="uriformSubmit('uriform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'uri',
  created () {
    this.select()
  },
  methods: {
    select () {
      this.$http.post(this.getAPI['backstage'].uri.list, this.$data.pagedata).then((res) => {
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
            }
          }
        }
      })
    },
    del (row) {
      this.$http.post(this.getAPI['backstage'].uri.del, row, {params: { id: row.id }}).then((res) => {
        if (res.data.code) {
          this.$message.success(res.data.msg)
          this.select()
        } else {
          this.$message.success(res.data.msg)
        }
      })
    },
    edit (row) {
      this.$data.uriform.uri = row.uri
      this.$data.uriform.uriName = row.uri_name
      this.$data.uriform.uriBody = row.uri_body
      this.$data.dialogFormVisible = true
      this.$data.uriformEdit = row.id
      this.$data.isDisabled = true
    },
    uriformSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.$data.uriformEdit) {
            this.$http.post(this.getAPI['backstage'].uri.add, this.$data.uriform).then((res) => {
              if (res.data.code) {
                this.$message.success(res.data.msg)
                this.resetForm(formName)
                this.select()
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$http.put(this.getAPI['backstage'].uri.put, this.$data.uriform, {params: { id: this.$data.uriformEdit }}).then((res) => {
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
          Baseinfo.anchorId = 5
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
      this.$data.uriformEdit = this.$data.isDisabled = false
      this.$data.uriform.uri = ''
      this.$data.uriform.uriName = ''
      this.$data.uriform.uriBody = ''
    },
    beforeClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        this.resetForm('uriform')
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
      uriform: {
        uri: '',
        uriName: '',
        uriBody: ''
      },
      uriformEdit: false,
      isDisabled: false,
      pagedata: {
        page: 1,
        row: 10,
        maxpage: null
      },
      dialogFormVisible: false,
      formLabelWidth: '90px',
      rules: {
        uri: [
          { required: true, message: '请输入请求链接', trigger: 'blur' }
        ],
        uriBody: [
          { required: true, message: '请输入链接说明', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters({
    getAPI: 'api/getAPI'
  })
}
</script>
