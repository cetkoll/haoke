<template>
  <div class="main">
    <div class="myTotal">
      <van-image width="90%" src="http://liufusong.top:8080/img/avatar.png" />
    </div>
    <van-grid column-num="3" icon-size="20px">
      <van-grid-item icon="star-o" text="我的收藏" to="/collection" />
      <van-grid-item icon="wap-home-o" text="我的出租" to="/rent" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="debit-pay" text="成为房主" />
      <van-grid-item icon="manager-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <div class="advertising">
      <van-image
        width="90%"
        src="http://liufusong.top:8080/img/profile/join.png"
      />
    </div>
    <div class="focus">
      <div class="myProfile">
        <van-image
          width="100%"
          src="http://liufusong.top:8080/img/profile/avatar.png"
        />
      </div>
      <div
        class="logout"
        v-if="$store.state.haokeUser && $store.state.haokeUser.token"
      >
        <p class="myName">好客_464232</p>
        <van-button type="primary" @click="myBack">退出</van-button>
        <p class="userData">编辑个人资料<van-icon name="play" /></p>
      </div>
      <div class="nologout" v-else>
        <p class="myName">游客</p>
        <van-button type="primary" @click="$router.push('/login')"
          >去登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getLogout } from '@/api/logout'
export default {
  created () { },
  data () {
    return {
      flag: false
    }
  },
  methods: {
    async myBack () {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '是否确定退出',
          confirmButtonColor: '#108ee9',
          width: 270
        })
        try {
          const res = await getLogout()
          this.$store.commit('setToken', {})
          this.$toast.success('退出成功')
          console.log(res)
        } catch (error) {
          console.log(error)
          this.$toast.success('退出失败')
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
  }
}
</script>

<style scoped lang="less">
.van-grid {
  margin-top: 13px;
  border: 0;
}
.main {
  position: relative;
}
.myTotal {
  text-align: center;
}
.advertising {
  text-align: center;
  margin-top: 5px;
}
.focus {
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 3px #ddd;
  width: 320px;
  height: 208px;
  background-color: #fff;
  .myProfile {
    position: absolute;
    left: 50%;
    top: -50%;
    transform: translate(-50%, 75%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #fff;
    border: 5px solid #f5f5f5;
    box-shadow: 0 2px 2px #bdbdbd;
  }
  .myName {
    width: 100%;
    font-size: 13px;
    color: #333;
    text-align: center;
    margin-top: 60px;
  }
  .logout {
    .van-button {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 56px;
      height: 20px;
      border-radius: 12px;
      color: #fff;
      padding: 2px 15px;
      background: #21b97a;
      font-size: 12px;
    }
  }
  .nologout {
    .van-button {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 36px;
      border-radius: 10px;
    }
  }
  .userData {
    margin-top: 60px;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
