<template>
  <div class="conatiner">
      com-b
      <button @click="fn()">发送数据给A组件</button>
  </div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-b',
  data () {
    return {
      msg: 'B组件的数据'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('b2a', this.msg)
    }
  }
}
</script>

<style>

</style>
