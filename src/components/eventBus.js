// 事件 总线.eventBus
// 职责: 仅仅负责事件的绑定的触发
// 不是在自己的模块内进项事件的绑定和触发,提供给其他组件进行绑定和触发
import Vue from 'vue'
export default new Vue()
