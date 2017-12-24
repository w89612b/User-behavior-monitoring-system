<template>
  <div class="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mian' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chunk">
      <div class="chunk-head">查询条件</div>
      <div class="chunk-body">
        <el-form :inline="true" :rules="rules" :model="pagedata" ref="pagedata">
          <el-form-item label="应用选择" prop="appKey">
            <el-select v-model="pagedata.appKey" placeholder="请选择" @change="getAnchors"  size="mini" clearable>
              <el-option
                v-for="item in appKeys"
                :key="item.id"
                :label="item.app_name"
                :value="item.app_key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监测点" >
            <el-select v-model="pagedata.anchorId" placeholder="请选择"  size="mini" clearable>
              <el-option
                v-for="item in anchorIds"
                :key="item.id"
                :label="item.anchor_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search('pagedata')" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="chunk">
      <div class="chunk-body">
        <el-table :data="tableData">
          <el-table-column prop="req_uri"  label="请求路径"></el-table-column>
          <el-table-column prop="ua_body"  label="UA"></el-table-column>
          <el-table-column prop="user" label="用户" ></el-table-column>
          <el-table-column prop="user_os"  label="系统"></el-table-column>
          <el-table-column prop="user_device"  label="设备信息"></el-table-column>
          <el-table-column prop="user_browser"  label="浏览器信息"></el-table-column>
          <el-table-column prop="anchor_id"  label="监测点"></el-table-column>
        </el-table>
      </div>
      <div class="chunk-buttom">
        <el-button type="primary" :disabled="pagedata.page===1" icon="el-icon-arrow-left" @click="prev" size="mini">上一页</el-button>
        <el-button type="primary" :disabled="pagedata.maxpage && pagedata.page == pagedata.maxpage" icon="el-icon-arrow-right" @click="next" size="mini">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  created () {
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
    getAnchors (val) {
      this.$http.post(this.getAPI['backstage'].anchor.all, {appKey: val}).then((res) => {
        if (res.data.code) {
          this.$data.anchorIds = res.data.data
        }
      })
    },
    search (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$data.pagedata.page = 1
          this.$data.pagedata.maxpage = null
          this.select()
        } else {
          return false
        }
      })
    },
    select () {
      this.$http.post(this.getAPI['backstage'].baseinfo.list, this.$data.pagedata).then((res) => {
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
      pagedata: {
        page: 1,
        row: 10,
        maxpage: null,
        appKey: '',
        anchorId: ''
      },
      rules: {
        appKey: [
          { required: true, message: '请选择应用', trigger: 'change' }
        ]
      },
      appKeys: [],
      anchorIds: []
    }
  },
  computed: mapGetters({
    getAPI: 'api/getAPI'
  })
}
</script>
