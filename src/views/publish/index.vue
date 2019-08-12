<template>
  <div class="container">
    <!-- 基础布局 -->
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- 富文本的使用 -->
          <quill-editor v-model="articleForm.content" :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
            <!-- <img src="../../assets/images/default.png" alt=""> -->
            <!-- 将来这里放的是素材选择组件 -->
            <div v-if="articleForm.cover.type===1">
              <my-image v-model="articleForm.cover.images[0]"></my-image>
            </div>
            <div v-if="articleForm.cover.type===3">
              <my-image v-model="articleForm.cover.images[0]"></my-image>
              <my-image v-model="articleForm.cover.images[1]"></my-image>
              <my-image v-model="articleForm.cover.images[2]"></my-image>
            </div>

        </el-form-item>
        <el-form-item label="频道:">
          <!-- 插槽的使用 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 底部按钮 -->
        <el-form-item v-if="!articleId">
          <el-button type="primary" size="small" @click="submit(false)">发表</el-button>
          <el-button size="small" @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" size="small" @click="update(false)">修改</el-button>
          <el-button size="small" @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本的使用
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 组件配置项要在components里面注册一下
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本设置
      editorOption: {
        // 占位符
        placeholder: '富文本',
        modules: {
          // 配置工具栏,现阶段我写的是空
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']

          ]
        }
      },
      // 文章ID
      articleId: null
    }
  },
  watch: {
    // 不仅仅是data中的数据才能去监听,$route实例的也可以
    $route () {
      // 此役步骤的操作的主要目的是将在修改的时候,忽然不想修改向点击发布文章的按钮,重新发布的时候的小操作
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 判断有id是修改文章,获取当前数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    // 拿取文章数据,查看接口文档,的获取指定文章
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 定义方法名,一张图和三张图切换的时候不保留上次图片
    changeType () {
      // 重置图片数据
      this.articleForm.cover.images = []
    },
    // 定义submit方法
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '文章发表成功')
      // 去内容管理
      this.$router.push('/artical')
    },
    // 定义submit方法
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改文章存入成功' : '文章修改成功')
      // 去内容管理
      this.$router.push('/artical')
    }
  }
}
</script>

<style scoped lang="less"></style>
