<template>
  <div class="main">
    <div class="headers">
      <van-icon
        name="arrow-left"
        color="#fff"
        class="lefticon"
        @click="$router.push('/home')"
      />
      <div class="searchHeader">
        <div class="address" @click="$router.push('city')">
          <p>{{ $store.state.nowCity }}</p>
          <van-icon name="arrow-down" />
        </div>
        <van-icon name="search" background="#4fc08d" />
        <p>请输入小区或地址</p>
      </div>
      <van-icon name="map-marked" />
    </div>
    <div class="fixdheader">
      <div class="choose" :class="{ active: active === 0 }" @click="area">
        <p>区域</p>
        <van-icon name="arrow-down" />
      </div>
      <div class="choose" :class="{ active: active === 1 }" @click="way">
        <p>方式</p>
        <van-icon name="arrow-down" />
      </div>
      <div class="choose" :class="{ active: active === 2 }" @click="money">
        <p>租金</p>
        <van-icon name="arrow-down" />
      </div>
      <div class="choose" :class="{ active: active === 3 }" @click="choose">
        <p>筛选</p>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <van-popup v-model="areashow" duration="0.2" :style="{ height: '45%' }">
      <div class="fixdheader">
        <div class="choose" :class="{ active: active === 0 }" @click="area">
          <p>区域</p>
          <van-icon name="arrow-down" />
        </div>
        <div class="choose" :class="{ active: active === 1 }" @click="way">
          <p>方式</p>
          <van-icon name="arrow-down" />
        </div>
        <div class="choose" :class="{ active: active === 2 }" @click="money">
          <p>租金</p>
          <van-icon name="arrow-down" />
        </div>
        <div class="choose" :class="{ active: active === 3 }" @click="choose">
          <p>筛选</p>
          <van-icon name="arrow-down" />
        </div>
      </div>
      <div class="area" v-show="active === 0">区域页面1</div>
      <div class="area" v-show="active === 1">区域页面2</div>
      <div class="area" v-show="active === 2">区域页面3</div>
      <div class="area" v-show="active === 3">区域页面4</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      active: 0,
      areashow: false
    }
  },
  methods: {
    area () {
      this.active = 0
      this.areashow = true
    },
    way () {
      this.active = 1
      this.areashow = true
    },
    money () {
      this.active = 2
      this.areashow = true
    },
    choose () {
      this.active = 3
      this.areashow = true
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.main {
  height: 667px;
  background-color: pink;
}
.headers {
  background-color: #21b97a;
  display: flex;
  padding-left: 5px;
  align-items: center;
  width: 375px;
  box-sizing: border-box;
  height: 50px;
  .searchHeader {
    display: flex;
    align-items: center;
    border-radius: 3px;
    width: 272px;
    height: 35px;
    background-color: #fff;
    .address {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      height: 60%;
      border-right: 1px solid rgb(236, 235, 235);
      p {
        font-size: 14px;
        color: #333;
      }
      .van-icon-arrow-down {
        font-size: 12px;
      }
    }
    .van-icon-search {
      margin: 7px;
      margin-left: 10px;
      padding-top: 2px;
      font-size: 18px;
      color: #9c9fa1;
    }
    p {
      font-size: 13px;
      color: #9c9fa1;
    }
  }
  .van-icon-map-marked {
    margin-left: 10px;
    color: #fff;
  }
  .lefticon {
    font-size: 22px;
    margin-right: 20px;
    font-style: normal;
  }
}
.fixdheader {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 375px;
  height: 40px;
  .choose {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: #333;
    font-size: 17px;
    .van-icon {
      margin-left: 3px;
      font-size: 12px;
    }
  }
}
.active {
  color: #21b97a !important;
}
.van-popup {
  width: 100%;
  height: 50%;
  margin-top: -133px;
}
</style>
