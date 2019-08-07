<template>
    <div class="container">
      <!-- 筛选条件 -->
  <el-card>
    <div slot="header">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- :to属性可以发生跳转 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
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
        <!-- 是一个下拉框 v-model="value"表示将来下拉的时候选中的某一项选中的数据 ,最终应该提交给后台 -->
        <el-select v-model="reqParams.channel_id" placeholder="请选择">
           <!-- v-for表示遍历我们的channelOptions中的item.取出来我们item中的value和key标识 -->
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
              end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
      <!-- 筛选结果  -->

    </div>
</template>

<script>
export default {
  // created () {
  //   // 发请求
  //   this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
  //     console.log(res.data)
  //   })
  // }
  data () {
    return {
      // 筛选项表单数据 提交给后台的参数
      reqParams: {
        // 默认选中全部
        status: null,
        channel_id: null
      },
      // 频道数据,下拉数据,此时设置的是假数据,以后需要渲染新的数据,因为上面获取的是value和label所以需要设置两个数据,同时key此时用我们的value来表示唯一标识
      channelOptions: [{ value: 1, label: 'js' }],
      // 日期数据
      dateArr: []
    }
  }
}
</script>

<style>

</style>
