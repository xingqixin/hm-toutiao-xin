<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <!-- v-model绑定的值要和后台的文件保持一致 -->
        <!-- @change="changeCollect"当change事件发生的时候,他会将事件改变直接反映给 -->
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" @click="openDialog()" style="float:right">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="foot" v-show="!reqParams.collect">
            <span @click="toggleCollect(item)" class="el-icon-star-off" :class="{selected:item.is_collected}"></span>
            <span @click="deletImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传内容的组件 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <!-- 后台需要的字段名称需要image -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span>上传组件</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 分页 v-if="total>reqParams.per_page"逻辑判断,当你的总的数量大于页码每页的总数量的时候,才有分页的意义 -->
    <el-pagination
      v-if="total>reqParams.per_page"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePager"
      style="text-align:center;margin-top:20px"
    ></el-pagination>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        // 默认值是全部
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0,
      // 控制对话框显示和隐藏
      dialogVisible: false,
      // 上传成功后的图片
      imageUrl: null,
      // 上传组件的头部信息 store需要导入此模块
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    // 获取数据列表
    this.getImages()
  },
  methods: {
    // 删除图片
    deletImage (id) {
      this.$confirm('老铁此操作将永久删除该素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击删除的时候,向后台发请求,表示删除当前id,当成功删除的时候,提示信息,表示 删除成功
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        // 更新列表
        this.getImages()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添夹收藏和取消收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 提示根据修改后的图片状态来进行提示
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前图片的状态 可以根据当前的选中状态来改变他自身可能添加的样式
      item.is_collected = data.collect
    },
    // 上传图片成功的函数
    handleSuccess (res) {
      // 1.获取图片地址显示img标签
      this.imageUrl = res.data.url
      // 2. 提示上传成功
      this.$message.success('上传成功')
      // 3. 过2s后关闭对话框,更新列表信息
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    openDialog () {
      // 打开前清空预览图
      this.imageUrl = null
      this.dialogVisible = true
    },
    // 全选和收藏的实现
    changeCollect (val) {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页功能的实现
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 调用接口
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 获取图片的总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.img_list {
  margin-top: 20px;
  .img_item {
    position: relative;
    width: 160px;
    height: 160px;
    border: 1px solid #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
