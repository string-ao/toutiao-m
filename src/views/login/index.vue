<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    />
    <!-- /导航栏 -->
    <van-icon
      slot="left"
      name="cross"
      @click="$router.back()"
    />

    <!-- 登录表单 -->
    <!-- 当表单提交的时候，自动触发表单验证；如果验证通过则会触发commit事件，如果验证失败，则不会触发表单验证事件 -->
    <van-form
      @submit="onSubmit"
      ref="loginForm"
    >
      <van-field
        v-model="user.mobile"
        required
        label="手机号"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        name="mobile"
        type="number"
        maxlength="11"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-shouji"
        ></i>
      </van-field>
      <van-field
        v-model="user.code"
        label="验证码"
        type="number"
        name="验证码"
        placeholder="请输入验证码"
        required
        :rules="userFormRules.code"
        maxlength="6"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-yanzhengma"
        ></i>
        <template #button>
          <!-- 倒计时世间： -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000*60"
            format="ss s"
            @finish="isCountDownShow=falsh"
          />

          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block
          type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 提交表单
    async onSubmit () {
      // 1.展示登录中的loading
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认2000,0表示持续时间展示不关闭
      })
      // 2.请求登录
      try {
        const { data } = await login(this.user) // 发送登录请求，并携带user对象这个参数
        this.$store.commit('setUser', data.data) // 派发action，将用户的信息存储在仓库
        this.$totast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$totast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 发送验证码
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile') // 获取表单组件并校验手机号
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.respones.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$totast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
