<template>
  <div class="main">
    <van-swipe
      class="my-swipe"
      :autoplay="2000"
      indicator-color="white"
      height="212"
    >
      <van-swipe-item
        ><van-image
          width="100%"
          height="100%"
          src="http://liufusong.top:8080/img/swiper/1.png"
      /></van-swipe-item>
      <van-swipe-item
        ><van-image
          width="100%"
          height="100%"
          src="http://liufusong.top:8080/img/swiper/2.png"
      /></van-swipe-item>
      <van-swipe-item
        ><van-image
          width="100%"
          height="100%"
          src="http://liufusong.top:8080/img/swiper/3.png"
      /></van-swipe-item>
    </van-swipe>
    <div class="headers">
      <div class="searchHeader">
        <div class="address">
          <p>北京</p>
          <van-icon name="arrow-down" />
        </div>
        <van-icon name="search" />
        <p>请输入小区或地址</p>
      </div>
      <van-icon name="map-marked" />
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {

    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.main {
  position: relative;
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
  .van-icon-map-marked{
    margin-left: 10px;
    color: #fff;
  }
}
</style>
