<template>
  <div class="main">
    <van-swipe
      class="my-swipe"
      :autoplay="2000"
      indicator-color="white"
      height="212"
    >
      <van-swipe-item v-for="item in mySwiper" :key="item.id">
        <van-image
          width="100%"
          height="100%"
          :src="'http://liufusong.top:8080' + item.imgSrc"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="headers">
      <div class="searchHeader">
        <div class="address" @click="$router.push('city')">
          <p>{{ $store.state.nowCity }}</p>
          <van-icon name="arrow-down" />
        </div>
        <van-icon name="search" />
        <p>请输入小区或地址</p>
      </div>
      <van-icon name="map-marked" @click="$router.push('/map')" />
    </div>
    <div class="myPannel">
      <van-grid :border="false">
        <van-grid-item icon="wap-home-o" text="整租"></van-grid-item>
        <van-grid-item icon="friends-o" text="合租" />
        <van-grid-item icon="location-o" text="地图找房" />
        <van-grid-item
          icon="home-o"
          @click="$router.push('/goRent')"
          text="去出租"
        />
      </van-grid>
    </div>
    <div class="title">
      <h4>租房小组</h4>
      <p>更多</p>
    </div>
    <div class="mygroupPanel">
      <div class="myGroup" v-for="item in myHouseGroup" :key="item.id">
        <div class="groupPanel">
          <div class="imgs">
            <img :src="'http://liufusong.top:8080' + item.imgSrc" alt="" />
          </div>
          <div class="text">
            <div class="top">{{ item.title }}</div>
            <div class="bottom">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSwiper, houseGroup } from '@/api/home'
export default {
  name: 'home',
  created () {
    this.getSwiper()
    this.gethouseGroup()
  },
  data () {
    return {
      mySwiper: [],
      myHouseGroup: []

    }
  },
  methods: {
    async getSwiper () {
      try {
        const res = await getSwiper()
        this.mySwiper = res.data.body
      } catch (error) {
        console.log(error)
      }
    },
    async gethouseGroup () {
      try {
        const res = await houseGroup()
        this.myHouseGroup = res.data.body
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

<style scoped lang="less">
.main {
  position: relative;
  background-color: #f6f5f6;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.headers {
  display: flex;
  position: absolute;
  top: 22px;
  left: 20px;
  display: flex;
  align-items: center;
  .searchHeader {
    display: flex;
    align-items: center;
    border-radius: 3px;
    width: 310px;
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
      }
      .van-icon-arrow-down {
        font-size: 12px;
      }
    }
    .van-icon-search {
      margin: 5px;
      padding-top: 2px;
      font-size: 16px;
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
}
.myPannel {
  margin-top: 5px;
  /deep/ .van-grid-item__text {
    font-size: 14px;
    color: #333;
  }
  /deep/ .van-grid-item__icon {
    font-size: 30px;
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  h4 {
    font-size: 15px;
    color: #333;
  }
  p {
    font-size: 14px;
    color: #787d82;
  }
}
.mygroupPanel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  flex-flow: wrap;
  .myGroup {
    .groupPanel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 170px;
      height: 60px;
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 0 5px;
      box-sizing: border-box;
      background-color: #fff;
      .imgs {
        width: 50px;
        height: 50px;
        padding-left: 5px;
        img {
          height: 100%;
        }
      }
    }
  }
}
.text {
  padding-right: 15px;
  font-size: 14px;
  color: #333;
}
</style>
