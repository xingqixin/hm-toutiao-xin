<template>
    <div class="container">
      <!-- 筛选条件 -->
  <el-card>
    <div slot="header">
      <!-- 面包屑导航 -->
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right"> -->
        <!-- :to属性可以发生跳转 -->
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item>内容管理</el-breadcrumb-item> -->
      <!-- </el-breadcrumb> -->

      <!-- 此时封装了一个面包屑组件,先在下面引入再使用 -->
      <my-bread>内容管理</my-bread>
    </div>
    <!-- label-width="80px"给所有的文字说明设置宽度 ,size="small"表示小号表单 -->
    <el-form label-width="80px" size="small">
      <el-form-item label="状态:">
        <!-- 单选框组 选中哪一个单选框,他的:label后面的值就会绑定给v-model -->
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道:">
        <!-- 是一个下拉框 v-model="value"表示将来下拉的时候选中的某一项选中的数据 ,最终应该提交给后台
        clearable清除功能 -->
        <el-select clearable v-model="reqParams.channel_id" placeholder="请选择">
           <!-- v-for表示遍历我们的channelOptions中的item.取出来我们item中的value和key标识 -->
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
  </el-select>
      </el-form-item>
      <el-form-item label="日期:">
        <!-- type="daterange"表示日期范围的意思start-placeholder="开始日期"表示不选择某一天的时候的占位符 日期要提交给后台 v-model="value1"表示两个数据,所以是一个数组的形式,-->
          <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <!-- 绑定点击事件,search不带括号,默认传参 -->
        <el-button type="primary" @click="search">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
      <!-- 筛选结果  -->
  <el-card>
    <div slot="header">
      根据筛选条件共查询到{{total}}条结果
    </div>
    <!-- 表格组件  data动态绑定的是列表数据 prop="img"指定字段名 prop的作用是拿出某个字段下某个数据对应的值-->
      <el-table :data="articles">
          <el-table-column label="封面" prop="img">
            <!-- 因为要看到的是图片,所以需要插入额外的内容,而不是组件内部默认的内容 ,拿到组件内部img对应的数据,此时使用插槽-->
            <template slot-scope="scope">
               <el-image :src="scope.row.cover.images[0]" style="width:90px;height: 80px">
                  <div slot="error" class="image-slot">
                    <img src="../../assets/images/error.gif" style="width:90px;height: 80px" alt="">
                  </div>
                </el-image>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="状态">
            <!-- 作用域插槽的使用 -->
              <template slot-scope="scope">
                <!-- 根据值显示不同的样式 -->
                <el-tag v-if="scope.row.status===0" type="info" >草稿</el-tag>
                <el-tag v-if="scope.row.status===1">待审核</el-tag>
                <el-tag v-if="scope.row.status===2" type="success" >审核通过</el-tag>
                <el-tag v-if="scope.row.status===3" type="warning" >审核失败</el-tag>
                <el-tag v-if="scope.row.status===4" type="danger" >删除</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="pubdate"></el-table-column>
          <el-table-column label="操作" width="120px">
            <!-- 作用域插槽的使用,因为是两个自定义的按钮,在后续的操作中,需要用到当前的id -->
            <template slot-scope="scope">
              <el-button type="primary" plain icon="el-icon-edit" circle></el-button>
              <el-button type="danger" @click="del(scope.row.id)" plain icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
      </el-table>
    <!-- 分页组件:total="1000"指定总条数,默认10条每页,所以需要修改
     layout="prev, pager, next"表示 分页包含上一页按钮,页码按钮,和下一页按钮-->
      <!-- @current-change="changePager"页码改变事件 -->
      <!-- 更新过数据收,当前页码也必须选中对应的按钮 current-page-->
   <div style="text-align:center;margin-top:20px  ">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
        >
      </el-pagination>
   </div>
  </el-card>

    </div>
</template>

<script>
// 因为组件是很多地方都要用的,所以要将局部组件进行全局注册,
// import myBread from '@/components/my-bread'
export default {
  // created () {
  //   // 发请求
  //   this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
  //     console.log(res.data)
  //   })
  // }
  // components: {
  //   myBread
  // },
  data () {
    return {
      // 筛选项表单数据 提交给后台的参数
      // axios 提交的数据,值为null是不会携带参数的
      reqParams: {
        // 默认选中全部
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20

      },
      // 频道数据,下拉数据,此时设置的是假数据,以后需要渲染新的数据,因为上面获取的是value和label所以需要设置两个数据,同时key此时用我们的value来表示唯一标识
      channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  // computed计算属性,使用场景,当需要一个新数据,需要依赖data中的数据的视乎,需要使用计算属性,
  // watch想监听到某一个数据的变化,侦听器的使用场景,当需要监听某一个数据的改变或者说变化,或者说开销较大的操作,即耗时较大的时候,使用侦听器
  watch: {
    'reqParams.channel_id': function (newVal, oldVal) {
      // console.log(newVal)
      if (newVal === '') {
        this.reqParams.channel_id = null
      }
    }
  },
  created () {
    // 获取频道下拉选项数据,拿取数据是一种行为,行为写在methods里面
    this.getChannelOptions()
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 日期选择后的事件
    changeDate (dateArr) {
      // 要严谨一点,当用户清空数据的时候,有值的时候将代码放进去,妹纸的时候null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选事件
    search () {
    // 筛选项都是双向绑定的,拿着对应的数据发请求即可,狐疑,重新筛选后页码第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    // 分页事件对应函数
    changePager (newPage) {
      // 新的页面,是你当前的点击的页码,要想后台拿取数据
      // 修改获取数据的页码,想后发请求
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      // axios get传参 url?key=value&key1=value...太麻烦
      // axios get传参,对象的形式,{params:指定传参对象} 发请求的时候,会自动拼接在地址栏之后
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 给当前的文章列表赋值,articles
      this.articles = data.results
      // 总条数数据
      this.total = data.total_count
    }
  }
}
</script>

<style>
 .el-card {
   margin-bottom: 20px;
 }
</style>
