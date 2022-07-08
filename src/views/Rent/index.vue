<template>
  <div>
    <van-nav-bar
      title="房屋管理"
      left-text
      left-arrow
      @click-left="$router.push('/my')"
    />
    <van-empty
    v-if="list.length === 0"
      image-size="150"
      class="custom-image"
      image="http://liufusong.top:8080/img/not-found.png"
    />
    <p class="myReleaseHouse"  v-if="list.length === 0">
      您还没有房源，去<span class="releaseHouse"> 发布房源 </span>吧~
    </p>
    <houseList v-else :list="list"></houseList>
  </div>
</template>

<script>
import { getMy } from '@/api/my'
import houseList from '@/components/houseList'
export default {
  created () {
    this.getMyHouse()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async getMyHouse () {
      try {
        const res = await getMy()
        console.log(res)
        this.list = res.data.body
        console.log(this.list)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { houseList }
}
</script>

<style scoped lang ="less">
.custom-image {
  margin-top: 50px;
  height: 20px;
}
.myReleaseHouse {
  font-size: 14px;
  padding-top: 30px;
  text-align: center;
  .releaseHouse {
    color: #21b97a;
  }
}
</style>
