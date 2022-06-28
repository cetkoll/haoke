<template>
  <div>
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
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
