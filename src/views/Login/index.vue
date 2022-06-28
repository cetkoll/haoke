<template>
  <div>
    <van-nav-bar
      title="账号登录"
      left-text
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登 录</van-button
        >
      </div>
    </van-form>
    <div class="login" @click="$router.push({ path: '/registe' })">
      <p>还没有账号 去注册~</p>
    </div>
  </div>
</template>

<script>
import { getLogin } from '@/api/login'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await getLogin(values)
        if (res.data.status === 200) {
          this.$toast.success('登录成功')
          this.$store.commit('setToken', res.data.body)
          this.$router.push({
            path: '/my'
          })
        } else {
          this.$toast.success('登录失败')
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.van-field {
  height: 75px;
  line-height: 75px;
  font-size: 17px;
}
.van-button {
  height: 50px;
  margin-top: 30px;
  font-size: 18px;
  border-radius: 2px;
  background-color: #21b97a;
}
.login {
  font-size: 14px;
  text-align: center;
  color: #666;
  margin-top: 25px;
}
</style>
