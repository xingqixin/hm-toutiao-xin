<template>
  <div class="container">
      <el-card>
          <div slot="header">
              <my-bread>评论管理</my-bread>
          </div>
          <el-table :data="comments">
              <el-table-column lable="标题" prop='title'></el-table-column>
              <el-table-column lable="总评论数" prop='total_comment_count'></el-table-column>
              <el-table-column lable="粉丝评论数" prop='fans_comment_count'></el-table-column>
              <el-table-column lable="状态">
                  <!-- 作用域插槽 -->
                  <template slot-scope="scope">
                      {{scope.row.comment_status?'正常': '关闭'}}
                  </template>
              </el-table-column>
              <el-table-column lable="操作">
                  <template slot-scope="scope">
                      <el-button  v-if="!scope.row.comment_status"  size="small" type="success">打开评论</el-button>
                      <el-button v-else size="small" type="danger">关闭评论</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <!-- 分页,可以从其他地方直接拿过来 -->
          <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                style="margin-top: 15px">
          </el-pagination>
      </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      reqparams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      comments: [],
      total: 0
    }
  },
  // 初始化成功的时候,在methods里面拿取
  created () {
    // 设置的获取数据的方法
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqparams })
      this.comments = data.results
      this.total = data.count
    }
  }
}
</script>

<style>
</style>
