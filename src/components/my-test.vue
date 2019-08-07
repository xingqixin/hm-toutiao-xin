<template v-slot:content="scope">
<div class='container'>
    <div class="header">header</div>
    <div class="content">
      <!-- 默认插槽 -->
      <slot></slot>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

<script>
export default {
  name: 'my-test'
}
</script>

<style lang="less">

</style>
