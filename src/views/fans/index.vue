<template>
  <div class="container">
      <el-card>
          <div slot="header">
              <my-bread>粉丝管理</my-bread>
          </div>
          <!-- tab组件 -->
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="粉丝列表" name="list">
                <div class="fans-list">
                    <div class="fans-item">
                         <el-avatar style="width: 80px;height:80px" :src="circleUrl"></el-avatar>
                         <p style="font-size:12px">用户名</p>
                         <el-button size="mini" plain type="primary">+关注</el-button>
                    </div>
                </div>
                <!-- 分页 -->
            </el-tab-pane>
            <el-tab-pane label="粉丝画像" name="photo">配置管理</el-tab-pane>
          </el-tabs>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      activeName: 'list'
    }
  }
}
</script>

<style scoped lang="less">
.fans-item{
    text-align: center;
    width: 120px;
    height: 180px;
    border: 1px solid #ddd;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    padding-top: 15px;
}
</style>
