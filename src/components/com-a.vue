<template>
  <div class="container">
      com-a{{msg}}
  </div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    // 事件要提前绑定才能触发
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style>

</style>
