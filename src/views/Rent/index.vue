<template>
  <div>
    <van-nav-bar
      title="房屋管理"
      left-text
      left-arrow
      @click-left="$router.push('/my')"
    />
    <van-empty
      image-size="150"
      class="custom-image"
      image="http://liufusong.top:8080/img/not-found.png"
    />
    <p class="myReleaseHouse">
      您还没有房源，去<span class="releaseHouse"> 发布房源 </span>吧~
    </p>
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

<style scoped lang ="less">
.custom-image {
  margin-top: 50px;
  height: 20px;
}
.myReleaseHouse {
  padding-top: 30px;
  text-align: center;
  .releaseHouse {
    color: #21b97a;
  }
}
</style>
