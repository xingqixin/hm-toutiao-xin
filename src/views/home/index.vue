<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo" :class="{minlogo:isCollapse}"></div>
      <!-- 动态获取当前的地址,因为刷新页面后会丢失我们的active,所以应该获取当前地址栏的路径,设置为default
      $route是用来拿取数据的,$router一般是方法-->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/artical">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-s-tools"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- command是element自带的属性 当给下拉菜单绑定了一个该属性的时候, -->
        <el-dropdown class="my-dropdown" @command="changeMenu">
          <span class="el-dropdown-link">
            <!-- 动态绑定用户照片 -->
            <img :src="photo" alt />
            <!-- 用户名称使用插值表达式 -->
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item> -->
            <!-- 添加点击事件后,要在methods中添加两个方法 -->
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
            <!-- <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由的出口 -->
        <router-view>Welcome</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      isCollapse: false,
      // 获取数据前,定义数据
      name: '',
      photo: ''
    }
  },
  created () {
    // 更新名称,eventBus中的绑定
    eventBus.$on('updateName', (name) => {
      this.name = name
    })
    // 本地获取信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏的展开和收起,默认展开false
      this.isCollapse = !this.isCollapse
    },
    setting () {
      // 点击跳转的时候,没有跳转,是因为函数没有执行,点击事件,是原生的事件,click是原生事件,是原生的dom支持的事件,但现在的el-dropdown-item都不是原生的dom,组件的背后是原生的dom,解决思路绑定在组件解析后的原生dom上,在click后面添加native
      // 表现为@click.native
      // this.$router.push({ name: 'setting' })
      this.$router.push('/setting')
    },
    logout () {
      // 想要退出的时候,需要在store里面设置清除信息的设置
      store.clearUser()
      this.$router.push({ name: 'login' })
    },
    // 绑定事件的时候不加括号的原因是为了接受默认参数,加上括号就不能接受组件内部的默认参数,此时在点击的时候,会将当期点击的那个的command绑定的后面的方法传进去,会默认执行该方法
    changeMenu (menuType) {
      this[menuType]()
    }
  }
}
</script>

<style scoped lang='less'>
/* //标签的名称就是解析后标签的类名 */
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: blod;
      }
      img {
        height: 30px;
        width: 30px;
        vertical-align: middle;
      }
    }
  }
}
.logo {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
    140px auto;
}
.minlogo {
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 36px auto;
}
.el-menu {
  border-right: none;
}
</style>
