<template>
    <!-- reqParams.channel_id这项数据是没有的,需要声明一下 用myValue自己定义的数据代替他-->
    <!-- :value="value"组件外部的值 -->
    <el-select clearable :value="value" @change="fn" placeholder="请选择">
           <!-- v-for表示遍历我们的channelOptions中的item.取出来我们item中的value和key标识 -->
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
  </el-select>
</template>

<script>
// watch: {
//   'reqParams.channel_id': function (newVal, oldVal) {
//     // console.log(newVal)
//     if (newVal === '') {
//       this.reqParams.channel_id = null
//     }
//   }
// },
// 注意,当你清空内容的时候,值为空字符,处理成null数据
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // myValue: null,
      channelOptions: []
    }
  },
  // 要获取频道下拉的数据,准备created钩子函数
  created () {
    // 获取频道下拉选项数据,拿取数据是一种行为,行为写在methods里面
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      // 字符是空字符的时候处理为null
      if (val === '') val = null
      // 把数据提交给父组件使用]
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="less">

</style>
