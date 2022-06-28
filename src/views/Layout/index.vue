<template>
  <div>
    <router-view class="main"></router-view>
    <van-tabbar
      route
      active-color="rgb(33, 185, 122)"
      inactive-color="rgb(136, 136, 136)"
    >
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/find" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/information" icon="newspaper-o"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.main {
  padding-bottom: 50px;
}
</style>
