<template>
    <div class="container">
       <!-- 面包屑的理论是那个地方经常要改变,那个地方就留坑,就留插槽  -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- :to属性可以发生跳转 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot></slot>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'my-bread'
}
</script>

<style scoped lang="less">

</style>
