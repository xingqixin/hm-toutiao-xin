<template>
    <div class='my-image'>
        <!-- // 图片按钮 -->
       <div class="img-btn">
           <img src="../assets/images/default.png" @click="openDialog" alt="">
       </div>
       <!-- 对话框 -->
       <el-dialog
            title="选择封面"
            :visible.sync="dialogVisible"
            width="700">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="素材库" name="image">
                    <!-- 单选框 -->
                    <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="mini">
                        <el-radio-button :label="false">全部</el-radio-button>
                        <el-radio-button :label="true">收藏</el-radio-button>
                        <!-- 列表 -->
                        <div class="img-list">
                            <div class="img-item" v-for="item in images" :key="item.id">
                                <img :src="item.url" alt="">
                            </div>
                        </div>
                    </el-radio-group>
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>
                <!-- 分页 -->
                <el-pagination
                    v-if="total>reqParams.per_page"
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="changePager"
                    style="text-align:center;margin-top:20px"
                    >
                </el-pagination>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
       </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框是否显示
      dialogVisible: false,
      // 控制 tab选项卡到底激活谁
      activeName: 'image',
      // 获取素材数据请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 列表数据
      images: [],
      // 总条数
      total: 0

    }
  },
  methods: {
    // 分页函数  newPage是一个形参,代表的是当前你想跳转的那个页面的页码current-page,
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换全部和收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      // 当用户打开对话框的时候,拿取数据
      this.getImages()
    },
    // 向后台发送了axios请求
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }

}
</script>

<style scoped lang='less'>
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px solid #ddd;
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
   }
}
.dialog-footer {
    text-align: center;
    display: block;

}
.img-list {
    margin-top: 10px;
    .img-item {
        width: 160px;
        height: 120px;
        border: 1px dashed #ddd;
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 10px;
        img {
            width: 100%;
            height: 100%;
            display: block;
            // img里面的图片的平铺方式
            object-fit: contain;
        }

    }
}

</style>
