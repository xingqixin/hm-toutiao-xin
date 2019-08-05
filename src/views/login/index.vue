<template>
    <div class="container">
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- 表单 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
            <el-form-item prop="mobile">
                <!-- 表单项 -->
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                <!-- 表单元素 -->
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:330px;margin-right:10px"></el-input>
                <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox :value="true">
                    我已阅读并同意用户协议和隐私条款
                    <!-- :value="true"表示这个复选框默认选中 -->
                </el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 申明校验函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号: 1开头,第二位3-9 9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式不正确'))
      callback()
    }
    return {
      // 表单对象数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          { required: true, message: '请输手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur'
          // 此处是给mobile定义了一个校验规则checkMobile的函数
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验,当前组件下所有表明ref属性的元素,valid是一个形参,为真就是校验成功,否则就是校验失败,默认会给错误的提示,注意: 要给表单绑定ref属性
      this.$refs.loginForm.validate(async valid => {
        // validate这是element UI的方法
        if (valid) {
        //   // 请求登录接口
        //   this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
        //     // console.log(res.data)
        //     // 存储用户信息
        //     store.setUser(res.data.data)
        //     // 成功额时候跳转去首页
        //     this.$router.push('/')
        //   })
        //     .catch(() => {
        //       // 错误提示element UI会有自带的错误的提示
        //       this.$message.error('手机号码或者验证码错误')
        //     })
          // then是请求成功的时候会调用,catch是在请求失败的时候调用,此时里面有一个错误对象,会拿到错误的内容

          // 解构赋值,第一个data是res.data,第二个data,表示res.data.data
          // async&await使用 ,怎么处理错误 try{}catch(e){}捕获异常,当我在执行某一段代码的时候,不能帮保证是够正确执行,可能出现报错的时候,则用catch包起来,容易处理异常
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
          } catch (e) {
            this.$message.error('手机号码验证错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
// scoped作用域的作用范围,仅仅在当前组建的作用域下生效,全局的样式在style.less下面写,
    .container {
        position: absolute;
        width:100%;
        height:100%;
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
        /* //背景图定位/背景图尺寸contain等比缩放完全在容器内显示,cover完全铺满容器 */
    }
    .my-card {
        width: 500px;
        height: 320px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform:translate(-50%,-60%);
    }
    img{
        display: block;
        width: 250px;
        margin: 0 auto;
    }
    /* index.less 来写全局样式 */
</style>
