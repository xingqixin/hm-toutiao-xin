<template>
    <div class="container">artical</div>
</template>

<script>
export default {
  created () {
    // 发请求
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style>

</style>
