<template>
  <div class="main">
    <van-nav-bar title="城市列表" left-arrow fixed @click-left="$router.back()" />
    <van-index-bar :sticky="false">
      <van-index-anchor index="1">当前城市</van-index-anchor>
      <van-cell :title="$store.state.nowCity" />
    </van-index-bar>
    <van-index-bar :sticky="false">
      <van-index-anchor index="1">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="(item, index) in hotCity"
        :key="index"
        @click="changeCity(item)"
      />
    </van-index-bar>
    <van-index-bar :sticky="false">
      <van-index-anchor
        :index="index"
        v-for="(item, index) in getallCity"
        :key="index"
      >
        {{ index }}
        <van-cell
          :title="item1.label"
          v-for="(item1, index1) in item"
          :key="index1"
          @click="$toast.fail('该城市暂无数据')"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getHotCity, allCity } from '@/api/home'
export default {
  created () {
    this.getHotCity()
    this.allCity()
  },
  data () {
    return {
      hotCity: [],
      getallCity: [],
      indexList: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
    }
  },
  methods: {
    async getHotCity () {
      try {
        const res = await getHotCity()
        this.hotCity = res.data.body
      } catch (error) {
        console.log(error)
      }
    },
    async allCity () {
      try {
        const res = await allCity()
        const cityName = {}
        this.indexList.forEach(item => {
          cityName[item] = []
          res.data.body.forEach(el => {
            const first = el.pinyin.substring(0, 1).toUpperCase()
            if (first === item) {
              cityName[item].push(el)
            }
          })
        })

        this.$nextTick(() => {
          this.getallCity = cityName
        })
      } catch (error) {
        console.log(error)
      }
    },
    changeCity (item) {
      this.$store.commit('changeNowCity', item.label)
      this.$store.commit('changeNowCityId', item.value)
      this.$router.back()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang = 'less'>
.van-cell__title {
  font-size: 16px;
}
.main {
  padding-top: 46px;
}
/deep/ .van-index-bar__index {
  font-size: 14px;
  font-weight: 400;
  color: #999;
  line-height: 21px;
}
</style>
