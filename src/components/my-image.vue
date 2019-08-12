<template>
    <div class='my-image'>
        <!-- // 图片按钮 -->
       <div class="img-btn">
           <img :src="value||defaultImage" @click="openDialog()" alt="">
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
                            <div class="img-item" :class="{selected:selectedImageUrl===item.url}" @click="selectedImage(item.url)" v-for="item in images" :key="item.id">
                                <img :src="item.url" alt="">
                            </div>
                        </div>
                    </el-radio-group>
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
                </el-tab-pane>

                <el-tab-pane label="上传图片" name="upload">
                    <!-- 上传图片组件 -->
                    <el-upload
                        class="avatar-uploader"
                        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                        :show-file-list="false"
                        :on-success="handleSuccess"
                        :headers="uploadHeaders"
                        name="image"
                    >
                        <!-- 后台需要的字段名称需要image -->
                        <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-tab-pane>

            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmImage()">确 定</el-button>
            </span>
       </el-dialog>
    </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  // 接收父组件的数据
  props: ['value'],
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
      total: 0,
      // 选中的图片地址
      selectedImageUrl: null,
      // 上传头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传的图片地址
      uploadImageUrl: null,
      // 封面图地址
      // vue-cil 3.0 基于webpsc 打包所有的资源,如果src绑定的数据,是不会去打包背后资源的.src指定的资源,js文件import导入的资源,是可以打包的,
      // 此时的地址,因为是动态绑定,不能打包,所以是有js import 的方法实现数据的绑定.
      // value: defaultImage
      defaultImage
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      // 让图片按钮能够显示你选中或者上传的图片地址,当你当前点击的是素材库的时候,选中的是选中的图片,当不是的时候,说明你当前点击的是上传图片,选中的是即将上传的图片
      if (this.activeName === 'image') {
        this.value = this.selectedImageUrl
        // 将自己选中的图片提交给父组件
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
      // 关闭对话框,当你下一次在打开的时候,还是默认选中我们的默认图片而不是上次选中的图片,所以在openDialog()函数中进行进入清空
    },
    // 成功上传图片
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
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
      // 清空选中的或者上传的图片地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
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
.my-image{
    display: inline-block;
    margin-right: 20px;
}
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
        position: relative;
        // 选中时的样式
        &.selected{
            &::after{
            // .img-item.selected::after{}
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.2) url(../assets/images/selected.png ) no-repeat center / 50px 50px ;
            }
        }
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
